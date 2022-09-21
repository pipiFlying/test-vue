<template>
  <div class="my">
    <h1>This is my page</h1>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: "MyView",
  data() {
    return {
      message: "",
    };
  },
  created() {
    console.log(this.$route);
    const regx = /^\/my(?:\/(?=$))?$/i;
    if (regx.test(this.$route.path)) {
      this.message = "页面重定向即将跳转...";
      setTimeout(() => {
        this.$router.replace({ path: "/" });
      }, 2000);
    }
  },
};
</script>

<style lang="less" scoped></style>
