<template>
  <div class="components">
    <h5>可选组件列表</h5>
    <draggable
      v-model="compList"
      :animation="300"
      :sort="false"
      :group="groupCom"
      @clone="cloneEvent"
      :clone="cloneJson"
    >
      <transition-group class="item-list">
        <div
          v-for="com in compList"
          :key="com.id"
          class="item"
          :draggable="true"
          @dragstart="dragstart(com)"
          @dragend="dragend($event, com)"
        >
          {{ com.name }}
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { uuid } from "@/utils";

export default {
  components: { draggable },
  data: function () {
    return {
      compList: [
        { id: 1, name: "div", json: "", type: "div" },
        { id: 2, name: "button", json: "", type: "button" },
        { id: 3, name: "input", json: "", type: "input" },
        { id: 4, name: "select", json: "", type: "select" },
        { id: 5, name: "switch", json: "", type: "switch" },
        { id: 6, name: "radio", json: "", type: "radio" },
        { id: 7, name: "checkbox", json: "", type: "checkbox" },
        { id: 8, name: "timePicker", json: "", type: "timePicker" },
        { id: 9, name: "dataPicker", json: "", type: "dataPicker" },
        { id: 10, name: "rate", json: "", type: "rate" },
        { id: 11, name: "card", json: "", type: "card" },
        { id: 12, name: "carousel", json: "", type: "carousel" },
      ],
      groupCom: {
        name: "itxst",
        pull: "clone", //B组拖拽时克隆到A组
        put: false,
      },
    };
  },
  methods: {
    dragstart: function () {},
    dragend: function (e, com) {
      this.$emit("update:dragItem", { ...com, id: uuid() });
    },
    /**
     *对于克隆这个事件这是一个坑, @clone 返回的是克隆的这个元素包含所有dom和事件
     *而@param { :clone } 则是克隆的这个选中数组里面的子数据可以通过加工后return出
     */
    cloneEvent: function () {},
    cloneJson: function (original) {
      return { ...original, id: uuid() };
    },
  },
};
</script>

<style lang="less" scoped>
.components {
  display: flex;
  flex-direction: column;
  padding: 10px;
  .item-list {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      background: #1989fa;
      margin-top: 10px;
      height: 32px;
      width: 120px;
      color: #fff;
      max-width: 120px;
    }
  }
}
</style>
