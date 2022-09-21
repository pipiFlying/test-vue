<template>
  <el-input v-model="$value"></el-input>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Object],
    },
  },
  computed: {
    $value() {
      return this.value;
    },
  },
};
</script>

<style lang="less" scoped></style>
