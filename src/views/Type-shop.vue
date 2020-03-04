<template>
  <div class="type-shop root">
    <!-- 左边分类列表 -->
    <ul class="left-list">
      <li v-for="(item, index) in shopList" :key="index" :class="activeNum == index ? 'active' : ''">{{item.title}}</li>
    </ul>
    <!-- 商品展示 -->
    <div class="shop-list">
      <div v-for="(item, index) in shopList" :key="index">
        <h2 class="title">{{item.title}}</h2>
        <div class="shop-list clear">
          <Shop v-for="(shop, ind) in item.shopList" :key="ind" :shop="shop"></Shop>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import axios from "axios";
import Shop from "../components/Shop";

export default {
  components: {
    Shop
  },
  data() {
    return {
      // 是否在请求中
      flag: false,
      shopList: [],
      activeNum: 0
    };
  },
  methods: {
    ...mapMutations(["setIsLoading"]),
    // 发起请求获取数据
    getShopList() {
      this.type_two = [];
      let type_one = this.$route.params.type_one;
      if (this.flag) return;
      this.flag = true;
      this.setIsLoading(true);
      axios
        .get("http://vebcoder.cn:9527/api/goodList", {
          params: {
            type_one
          }
        })
        .then(res => {
          this.typeTwo(res.data);
          this.flag = false;
          this.setIsLoading(false);
        });
    },
    // 处理数据
    typeTwo(arr) {
      let temp = "";
      let newArr = [];
      let obj = {};
      for (let i = 0; i < arr.length; i++) {
        if (temp != arr[i].type_two) {
          obj = {
            title: arr[i].type_two,
            shopList: []
          };
          newArr.push(obj);
          temp = arr[i].type_two;
        }
        newArr[newArr.length - 1].shopList.push(arr[i]);
      }
      this.shopList = newArr;
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
.left-list {
  position: fixed;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 100px;
  background: #fff;
  padding: 10px;
  border: 1px solid #773f77;
  border-radius: 5px;
}

.left-list li {
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}

.left-list li:hover {
  color: purple;
  font-weight: bolder;
  filter: drop-shadow(0 0 10px purple);
}

.left-list li.active {
  color: purple;
  font-weight: bolder;
  filter: drop-shadow(0 0 10px purple);
}

.title {
  text-align: center;
}
</style>