<template>
  <div class="search-shop root">
    <!-- 商品列表 -->
    <div class="shop-list clear" v-if="shopList.length > 0">
      <Shop v-for="(item, index) in shopList" :key="index" :shop="item"></Shop>
    </div>
    <div class="no-shop" v-else>
      没有您要搜索的内容
      <span class="back" @click="$router.back()">返回</span>
    </div>
  </div>
</template>

<script>
import Shop from "../components/Shop";
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "Search-shop",
  components: {
    Shop
  },
  data() {
    return {
      // 商品数据
      shopList: [],
      // 是否在请求中
      flag: false
    };
  },
  methods: {
    ...mapMutations(["setIsLoading"]),
    // 请求数据
    getShopList() {
      if (this.flag) return;
      this.flag = true;
      this.setIsLoading(true);
      axios
        .get("http://vebcoder.cn:9527/api/search", {
          params: {
            word: this.$route.params.word
          }
        })
        .then(res => {
          this.shopList = res.data;
          this.flag = false;
          this.setIsLoading(false);
        });
    }
  },
  watch: {
    $route(to, from) {
      this.getShopList();
    }
  },
  created() {
    this.getShopList();
  }
};
</script>

<style scoped>
.carousel-container,
.demo-carousel,
.demo-carousel img {
  border-radius: 20px;
  overflow: hidden;
}

.no-shop {
  line-height: 500px;
  text-align: center;
  font-size: 25px;
}

.back {
  background-color: skyblue;
  display: inline-block;
  width: 70px;
  line-height: 30px;
  cursor: pointer;
}
</style>
