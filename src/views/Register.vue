<template>
  <div class="register root">
    <form class="register-container">
      <div class="input">
        <Input
          @on-focus="inputFocus('username')"
          size="large"
          prefix="md-person"
          v-model="username"
          type="text"
          placeholder="用户名"
          clearable
        />
      </div>
      <span class="err" v-if="usernameErr">只能包含数字、字母、下划线、汉字6-12位</span>
      <div class="input">
        <Input
          @on-focus="inputFocus('password')"
          size="large"
          prefix="md-key"
          v-model="password"
          type="password"
          password
          placeholder="密码"
        />
      </div>
      <span class="err" v-if="passwordErr">只能包含数字、字母、下划线6-12位</span>
      <div class="btn">
        <Button type="success" size="large" long @click="clickLogin">注册</Button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      // 用户名
      username: "",
      // 密码
      password: "",
      usernameErr: false,
      passwordErr: false
    };
  },
  methods: {
    // 输入框聚焦时隐藏提示
    inputFocus(value) {
      switch (value) {
        case "username":
          this.usernameErr = false;
          break;
        case "password":
          this.passwordErr = false;
          break;
        default:
          break;
      }
    },
    // 点击登录
    clickLogin() {
      let usernameReg = /^[\u4E00-\u9FA5A-Za-z0-9_]{6,12}$/;
      if (!this.username || !this.username.match(usernameReg)) {
        this.usernameErr = true;
        return;
      }
      let passwordReg = /^[A-Za-z0-9_]{6,12}$/;
      if (!this.password || !this.password.match(passwordReg)) {
        this.passwordErr = true;
        return;
      }
      // 发送请求
      axios
        .get("http://vebcoder.cn:9527/api/register", {
          params: {
            userName: this.username,
            password: this.password
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$Message.warning({
              background: true,
              content: "用户名被占用",
              duration: 3
            });
            this.username = "";
            this.password = "";
            return;
          }
          if (res.data.code == 1) {
            this.$Message.success({
              background: true,
              content: "注册成功,赶快去登录吧",
              duration: 3
            });
            setTimeout(() => {
              this.$router.push({
                name: "Login"
              });
            }, 500);
          }
        });
    }
  }
};
</script>
<style scoped>
.register-container {
  width: 400px;
  margin: 0 auto;
  margin-top: 80px;
}

.input {
  margin-top: 20px;
}

.btn {
  margin-top: 30px;
}

.err {
  font-size: 12px;
  color: red;
}
</style>