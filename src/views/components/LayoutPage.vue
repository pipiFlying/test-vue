<template>
  <div class="layout-page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "LayoutPage",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
.layout-page {
  width: 100%;
  height: 100%;
  border-top: 1px solid #aaa;
}
</style>
