<template>
  <div class="home root">
    <!-- 轮播图 -->
    <Carousel autoplay loop dots="none" class="carousel-container">
      <CarouselItem>
        <div class="demo-carousel">
          <img src="../assets/a.jpg" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img src="../assets/b.jpg" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img src="../assets/c.jpg" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img src="../assets/d.jpg" />
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          <img src="../assets/e.jpg" />
        </div>
      </CarouselItem>
    </Carousel>
    <!-- 商品列表 -->
    <div class="shop-list clear">
      <Shop v-for="(item, index) in shopList" :key="index" :shop="item"></Shop>
    </div>
  </div>
</template>

<script>
import Shop from "../components/Shop";
import axios from "axios";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Home",
  components: {
    Shop
  },
  data() {
    return {
      // 请求页数
      page: 0,
      // 商品数据
      shopList: [],
      // 是否在请求中
      flag: false
    };
  },
  methods: {
    ...mapMutations(["setIsLoading"]),
    handleScroll() {
      let maxScroll = document.documentElement.scrollHeight;
      let newScroll = document.documentElement.scrollTop;
      if (
        newScroll >= maxScroll - document.documentElement.clientHeight - 50 &&
        this.isHome
      ) {
        this.getShopList();
      }
    },
    // 请求数据
    getShopList() {
      if (this.flag) return;
      this.flag = true;
      this.setIsLoading(true);
      this.page++;
      axios
        .get("http://vebcoder.cn:9527/api/goodList", {
          params: {
            page: this.page
          }
        })
        .then(res => {
          if (this.page == 1) {
            this.shopList = res.data;
          } else {
            this.shopList = this.shopList.concat(res.data);
          }
          this.flag = false;
          this.setIsLoading(false);
        });
    }
  },
  created() {
    this.getShopList();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll, true);
  },
  computed: {
    ...mapState(["isHome"])
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
</style>
