<template>
  <LayoutPage>
    <div class="low-code">
      <div class="aside left">
        <AsideComponents :dragItem.sync="dragItem" />
      </div>
      <div class="container" :draggable="true">
        <widgets :dragItem="dragItem"></widgets>
      </div>
      <div class="aside right"></div>
    </div>
  </LayoutPage>
</template>

<script>
import LayoutPage from "./components/LayoutPage.vue";
import AsideComponents from "./aside-component/comlist.vue";
import widgets from "./widgets";

export default {
  components: { LayoutPage, AsideComponents, widgets },
  data() {
    return {
      arr: [
        { id: 1, name: "列表1" },
        { id: 2, name: "列表2" },
        { id: 3, name: "列表3" },
        { id: 4, name: "列表4" },
        { id: 5, name: "列表5" },
      ],
      dragItem: {},
    };
  },
  methods: {
    onStart: function (e) {
      console.log(e, "e");
    },
  },
};
</script>

<style lang="less" scoped>
.low-code {
  display: flex;
  height: calc(100vh - 61px);
  width: 100%;
  .aside {
    flex: 1;
  }
  .left {
    border-right: 1px solid #aaa;
  }
  .container {
    flex: 3;
    .item {
      // border: 1px solid #aaa;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
