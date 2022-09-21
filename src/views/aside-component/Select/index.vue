<template>
  <el-select v-model="$value">
    <el-option v-for="(e, i) in $list" :key="i"></el-option>
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Object],
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    $value() {
      return this.value;
    },
    $list() {
      return this.list;
    },
  },
};
</script>

<style lang="less" scoped></style>
