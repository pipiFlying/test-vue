<template>
  <div class="home">
    <div class="over-top" :class="{ 'forbid-style': disabled }">
      <button
        :class="{ 'forbid-event': disabled }"
        v-color="'red'"
        @click="add"
      >
        按钮BUTTON
      </button>
    </div>

    <div class="over-top" :class="{ 'forbid-style': disabled }">
      <div :class="{ 'forbid-event': disabled }" v-color="'red'" @click="add">
        按钮DIV
      </div>
    </div>
    <button @click="disabled = !disabled">
      {{ disabled ? "解除" : "禁用" }}
    </button>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      disabled: true,
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    let obj = { name: "HomeView" };
    const newObj = this.$commonMethods.clone(obj);
    console.log(newObj, "newObj");
  },
  methods: {
    add() {},
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .over-top {
    width: 200px;
    height: 32px;
    padding: 10px;
  }
  .forbid-style {
    cursor: not-allowed; // 外层元素设置禁用样式
  }
  .forbid-event {
    pointer-events: none; // 内层元素设置禁用事件
  }
}
</style>
