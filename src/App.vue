<template>
  <div id="app" :class="[isSticky && 'padding-top']">
    <!-- 导航栏 -->
    <div :class="[isSticky && 'fixed', 'nav-container']">
      <div class="root">
        <!-- logo、search -->
        <div class="logo-search clear">
          <!-- logo -->
          <img class="logo left" src="./assets/logo.png" />
          <!-- first-search -->
          <div class="first-search right">
            <Search></Search>
          </div>
        </div>
        <!-- nav、search -->
        <div class="nav-search clear" ref="navTop">
          <!-- nav -->
          <nav class="nav left">
            <router-link to="/">首页</router-link>
            <template v-if="token">
              <router-link :to="{name: 'Cart'}">购物车</router-link>
              <router-link :to="{name: 'Exit'}">退出登录</router-link>
            </template>
            <template v-else>
              <router-link to="/login">登录</router-link>
              <router-link to="/register">注册</router-link>
            </template>
          </nav>
          <!-- second-search -->
          <Search v-show="isSticky" class="second-search right"></Search>
        </div>
      </div>
    </div>

    <!-- 商品分类 -->
    <div class="shopping-type root" v-show="isTypeOne">
      <router-link v-for="(item, index) in typeList" :key="index" :to="'/list/' + item">{{item}}</router-link>
    </div>

    <router-view />

    <!-- loading -->
    <div class="loading" v-show="isLoading"></div>
    <!-- 返回顶部 -->
    <BackTop :height="300" :bottom="150" :right="150">
      <div class="top">返回顶部</div>
    </BackTop>
  </div>
</template>

<script>
import Search from "./components/Search";
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      // 是否启动粘性定位
      isSticky: false,
      // 延时器变量
      timer: null,
      // 是否现实一级分类
      isTypeOne: true,
      // 一级分类列表
      typeList: []
    };
  },
  components: {
    Search
  },
  methods: {
    ...mapMutations(["setIsLoading", "setToKen", "setIsHome"]),
    handleScroll() {
      // 当前滚动的值
      var newScrollTop = document.documentElement.scrollTop;
      // 导航栏距离顶部的距离
      let navSearchTop = this.$refs.navTop.offsetTop;
      if (newScrollTop >= navSearchTop && !this.isSticky) {
        this.isSticky = true;
      }
      if (newScrollTop < navSearchTop && this.isSticky) {
        this.isSticky = false;
      }
    },
    // 设置加载效果
    loading() {
      this.setIsLoading(true);
      clearTimeout(this.timer);
      this.timer = null;
      this.timer = setTimeout(() => {
        this.setIsLoading(false);
      }, 1000);
    }
  },
  computed: {
    ...mapState(["isLoading", "token"])
  },
  created() {
    // 读取本地token
    let toKen = localStorage.getItem("token");
    this.setToKen(toKen);
    // 调用加载效果
    this.loading();
    // 获取一级分类
    axios.get("http://vebcoder.cn:9527/api/getTypeone").then(res => {
      this.typeList = res.data;
    });
  },
  mounted() {
    // 给window添加scroll事件监听
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    $route: function(newPath, oldPath) {
      this.loading();
      if (newPath.name == "Exit") {
        this.setToKen("");
        localStorage.setItem("token", "");
        this.$router.push({
          name: "Home"
        });
        this.$Message.success({
          background: true,
          content: "退出成功",
          duration: 3
        });
      }
      if (newPath.name == "Login" || newPath.name == "Register") {
        this.isTypeOne = false;
      } else {
        this.isTypeOne = true;
      }
      if (newPath.name == "Home") {
        this.setIsHome(true);
      } else {
        this.setIsHome(false);
      }
    }
  }
};
</script>

<style scoped>
.nav-container {
  background-color: #fff;
  padding-top: 20px;
  box-shadow: 0 2px 6px #999;
  margin-bottom: 10px;
  width: 100%;
  z-index: 999;
}

.logo {
  width: 188px;
}

.first-search {
  width: 600px;
  margin-top: 20px;
}

.nav-search {
  height: 57px;
  width: 100%;
  background: #fff;
}

.nav {
  padding: 15px 0;
}

.nav a {
  margin: 0 20px;
  font-weight: bold;
  padding: 0 10px;
  padding-bottom: 4px;
  border-bottom: 2px solid #fff;
  transition: all 0.3s;
  color: black;
  font-size: 16px;
}

.nav a:hover {
  color: purple;
  border-bottom-color: purple;
}

.nav .router-link-exact-active {
  color: purple !important;
  border-bottom-color: purple !important;
}

.second-search {
  margin-top: 10px;
}

.fixed {
  position: fixed;
  top: -94px;
}

.loading {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0.95;
  background: #eee url("./assets/loading.gif") 50% no-repeat;
  background-size: auto;
  background-size: 400px auto;
  z-index: 999;
}

.top {
  background-color: purple;
  border-radius: 5px;
  padding: 10px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  width: 60px;
}

.shopping-type {
  background: #fff;
  padding: 10px;
  line-height: 30px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 1200px;
}

.shopping-type a {
  display: block;
  padding: 0 40px;
  border-radius: 20px;
  transition: all 0.3s;
  color: #666;
  font-size: 16px;
}

.shopping-type a:hover {
  color: #fff;
  background-color: purple;
}

.shopping-type .router-link-exact-active {
  color: #fff;
  background-color: purple;
}

.padding-top {
  padding-top: 155px;
}
</style>
