<template>
  <LayoutPage>
    <div class="login">
      <h1>登录页</h1>
      <el-form ref="form" class="form" :model="formData" :rules="rules">
        <el-form-item prop="account">
          <el-input
            v-model="formData.account"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="smsCode">
          <el-input
            v-model="formData.smsCode"
            placeholder="请输入短信验证码"
          ></el-input>
        </el-form-item>
        <el-form-item label="选择登录角色" prop="roles">
          <el-checkbox-group v-model="formData.roles" @change="checkRoles">
            <el-checkbox v-for="e in rolesAll" :label="e" :key="e">
              {{ e }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button class="submit" type="primary" @click="submit">
          登录
        </el-button>
      </el-form>
    </div>
  </LayoutPage>
</template>

<script>
const initForm = {
  account: "",
  smsCode: "",
  roles: [],
};
import LayoutPage from "./components/LayoutPage.vue";

export default {
  name: "MyView",
  components: { LayoutPage },
  data() {
    return {
      formData: { ...initForm },
      message: "",
      rolesAll: ["main", "editor"],
      rules: {
        account: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        smsCode: [
          { required: true, message: "请输入短信验证码", trigger: "blur" },
        ],
        roles: [
          {
            type: "array",
            required: true,
            message: "请选择登录角色",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    // console.log(this.pageInfo, "pageInfo");
    // console.log(this.setPageInfo, "setPageInfo");
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        valid && this.getUser();
      });
    },
    getUser() {
      const user = Object.assign({
        name: "wenmingyue",
        roles: this.roles,
        account: this.formData.account,
        token: "OAUTH2SESSION=MjI1YWRkZGItNGY5OC00MTVjLTgyZWEtMjA1YzFhMjg3MDdi",
      });
      this.$store.dispatch("login", user);
      // 后面需要catch函数接收异常，否者会抛错
      this.$router.push({ path: "/" }).catch(() => {});
    },
    checkRoles(e) {
      this.roles = e;
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .form {
    width: 400px;
    .submit {
      width: 100%;
    }
  }
}
</style>
