<template>
  <div class="fix">
    <h1>角色管理</h1>
    <el-checkbox-group v-model="authRoles" @change="checkRoles">
      <el-checkbox v-for="e in rolesAll" :label="e" :key="e">
        {{ e }}
      </el-checkbox>
    </el-checkbox-group>
    <el-button class="submit" type="primary" @click="submit">保存</el-button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { restRouter } from "@/router";

export default {
  name: "FixView",
  data() {
    return {
      authRoles: [],
      rolesAll: ["main", "editor"],
    };
  },
  computed: {
    ...mapGetters(["roles"]),
  },
  watch: {
    roles: {
      immediate: true,
      deep: true,
      handler(val) {
        val && (this.authRoles = val);
      },
    },
  },
  methods: {
    checkRoles(e) {
      this.authRoles = [...e];
    },
    submit() {
      this.$store.commit("setRoles", this.authRoles);
      // 重置路由
      restRouter();
    },
  },
};
</script>

<style lang="less" scoped>
.fix {
  .submit {
    position: absolute;
    right: 50px;
    margin-top: 20px;
  }
}
</style>
