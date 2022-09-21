<template>
  <div class="widgets">
    <draggable
      v-model="comjson.componentList"
      :animation="300"
      :sort="true"
      :group="groupCom"
    >
      <transition-group :style="style">
        <div v-for="(com, index) in comjson.componentList" :key="com.id">
          <component :key="index" :is="typeToComponent[com.type]"></component>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import typeToComponent from "./template";

export default {
  components: { draggable },
  props: {
    dragItem: {
      type: Object,
      default: () => {},
    },
  },
  mounted: function () {},
  data: function () {
    return {
      typeToComponent,
      comjson: {
        label: "新增组件",
        icon: "icon-zujian",
        componentList: [],
      },
      groupCom: {
        name: "itxst",
        pull: true, //可以拖出
        put: true, //可以拖入
      },
      // 此样式保证元素可以拖入
      style: "min-height:120px;display: block;",
    };
  },
  watch: {
    comjson: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.widgets {
  height: 100%;
}
</style>
