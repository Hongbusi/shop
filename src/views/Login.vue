<template>
  <div class="login root">
    <form class="login-container">
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
        <Button type="success" size="large" long @click="clickLogin">登录</Button>
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
    ...mapMutations(["setToKen"]),
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
        .get("http://vebcoder.cn:9527/api/login", {
          params: {
            userName: this.username,
            password: this.password
          }
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$Message.error({
              background: true,
              content: "用户名或密码错误",
              duration: 3
            });
            this.username = "";
            this.password = "";
            return;
          }
          if (res.data.code == 1) {
            this.$Message.success({
              background: true,
              content: "登录成功,欢迎" + this.username,
              duration: 3
            });
            setTimeout(() => {
              this.setToKen(res.data.token);
              localStorage.setItem("token", res.data.token);
              this.$router.push({
                name: "Home"
              });
            }, 500);
          }
        });
    }
  }
};
</script>
<style scoped>
.login-container {
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