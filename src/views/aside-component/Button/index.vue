<template>
  <el-button :type="$type" @click="$event">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  props: {
    $type: {
      type: String,
      default: "primary",
    },
    $event: {
      type: String,
    },
    $content: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped></style>
