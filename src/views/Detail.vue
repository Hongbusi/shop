<template>
  <div class="detail">
    <!-- 返回按钮 -->
    <button class="detail-back" @click="$router.back()">
      <Icon type="ios-arrow-round-back" />
      <span>返回</span>
    </button>
    <!-- 商品详情 -->
    <div class="detail-shop clear">
      <!-- 左边图片 -->
      <div class="left">
        <div class="img-box">
          <img :src="shopDetail.img_url" />
          <div v-show="isImg" class="big-img-box" :style="backgroundStyle"></div>
          <div
            class="img-move-box"
            @mouseenter="imgMouseenter"
            @mousemove="imgMousemove"
            @mouseleave="imgMouseleave"
          ></div>
          <div
            class="img-mark"
            @mousemove.stop
            :style="'left:'+ markX + 'px; top:' + markY + 'px;'"
            v-show="isImg"
          ></div>
        </div>

        <div class="img-btn clear">
          <img
            v-for="(item, index) in shopDetail.imgs"
            :key="index"
            :src="item"
            :class="imgActive == index ? 'img-active' : ''"
            @click="clickImg(index, $event)"
          />
        </div>
      </div>
      <!-- 右边价格 -->
      <div class="left info-box">
        <h2>{{shopDetail.title}}</h2>
        <!--  -->
        <p class="com">{{shopDetail.supplier}}</p>
        <p class="price">￥{{shopDetail.price}}</p>
        <!-- 星评 -->
        <div>
          <Rate show-text allow-half :value="3.7">
            <span style="color: #f5a623">{{ 3.7 }}</span>
          </Rate>
        </div>
        <!-- 加入购物车 -->
        <button class="add-cart" @click="addCart">添加到购物车</button>
      </div>
    </div>
    <!-- 相似商品 -->
    <div class="reresemblance-shop">
      <h2 class="rerese-title">相似商品推荐</h2>
      <div class="clear">
        <Shop v-for="(item, index) in resemblanceList" :key="index" :shop="item" :width="180"></Shop>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import Shop from "../components/Shop";
import { mapState } from "vuex";
export default {
  components: {
    Shop
  },
  data() {
    return {
      // 商品数据
      shopDetail: [],
      // 是否在请求中
      flag: false,
      // 相似商品列表
      resemblanceList: [],
      // 当前小图片
      imgActive: 0,
      // 是否显示mark和bigImg
      isImg: false,
      markX: 0,
      markY: 0,
      positionX: 0,
      positionY: 0
    };
  },
  methods: {
    ...mapMutations(["setIsLoading"]),
    // 请求商品detail数据
    getShopDetail() {
      if (this.flag) return;
      this.flag = true;
      this.setIsLoading(true);
      axios
        .get("http://vebcoder.cn:9527/api/detail", {
          params: {
            goodId: this.$route.params.Id
          }
        })
        .then(res => {
          let reg = /(http.*?jpg)/g;
          let temp = [];
          let str = res.data[0].imgs;
          let result = reg.exec(str);
          while (result != null) {
            temp.push(result[0]);
            result = reg.exec(str);
          }
          res.data[0].imgs = temp;
          this.shopDetail = res.data[0];
          this.getResemblanceShop(res.data[0].type_one, res.data[0].type_two);
        });
    },
    // 请求相似商品
    getResemblanceShop(type_one, type_two) {
      axios
        .get("http://vebcoder.cn:9527/api/goodList", {
          params: {
            type_one,
            type_two
          }
        })
        .then(res => {
          res.data.forEach((item, index) => {
            if (item.Id == this.$route.params.Id) {
              res.data.splice(index, 1);
            }
          });
          if (res.data.length <= 10) {
            this.resemblanceList = res.data;
          } else {
            this.resemblanceList = res.data.slice(0, 10);
          }
          this.flag = false;
          this.setIsLoading(false);
        });
    },
    // 点击切换小图片
    clickImg(index, e) {
      this.imgActive = index;
      this.shopDetail.img_url = e.target.src;
    },
    // 鼠标移入事件
    imgMouseenter() {
      this.isImg = true;
    },
    // 鼠标移动事件X
    imgMousemove(ev) {
      let X = ev.offsetX - 130;
      let Y = ev.offsetY - 130;
      // 判断边界临界值
      X = X <= 0 ? 0 : X;
      Y = Y <= 0 ? 0 : Y;
      X = X >= 140 ? 140 : X;
      Y = Y >= 140 ? 140 : Y;
      this.markX = X;
      this.markY = Y;
      this.positionX = -X * 2;
      this.positionY = -Y * 2;
    },
    // 鼠标移出事件
    imgMouseleave() {
      this.isImg = false;
    },
    // 添加购物车
    addCart() {
      if (!this.token) {
        this.$Message.warning({
          background: true,
          content: "你还没有登录，即将跳转到登录页面！"
        });
        setTimeout(() => {
          this.$router.push("/login");
        }, 1000);
      } else {
        axios
          .get("http://vebcoder.cn:9527/api/add", {
            params: {
              token: this.token,
              goodId: this.$route.params.Id
            }
          })
          .then(res => {
            switch (res.data.code) {
              case 0:
                this.$Message.warning({
                  background: true,
                  content: "登录无效"
                });
                break;
              case 1:
                this.$Message.success({
                  background: true,
                  content: "添加成功"
                });
                break;
              case 2:
                this.$Message.error({
                  background: true,
                  content: "添加失败"
                });
                break;
              default:
                break;
            }
          });
      }
    }
  },
  created() {
    this.getShopDetail();
  },
  watch: {
    $route(to, from) {
      this.getShopDetail();
    }
  },
  computed: {
    ...mapState(["token"]),
    backgroundStyle() {
      return {
        backgroundImage: "url(" + this.shopDetail.img_url + ")",
        backgroundPositionY: this.positionY + "px",
        backgroundPositionX: this.positionX + "px"
      };
    }
  }
};
</script>

<style scoped>
.detail {
  width: 1000px;
  margin: 0 auto;
}

.detail-back {
  margin-top: 10px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  outline: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  color: #606266;
}

.detail-back:hover {
  color: purple;
  border-color: #d9b3d9;
  background-color: #f2e6f2;
}

.info-box {
  margin: 100px 0 0 180px;
}

.img-box {
  width: 400px;
  position: relative;
  cursor: crosshair;
}

.img-move-box {
  width: 400px;
  height: 400px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
}

.img-box img {
  width: 100%;
  border-radius: 10px;
}

.big-img-box {
  position: absolute;
  top: 0;
  left: 400px;
  width: 400px;
  height: 400px;
  overflow: hidden;
  z-index: 1000000;
  border-radius: 10px;
  background-size: 200%;
}

.img-mark {
  width: 260px;
  height: 260px;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.img-btn img {
  width: 80px;
  float: left;
  border: 2px solid #fff;
}

.add-cart {
  color: #fff;
  background-color: #f56c6c;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  outline: none;
  border: none;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}

.add-cart:hover {
  background: rgb(241, 136, 136);
}

.com {
  margin: 20px 0;
  color: #666;
}

.price {
  margin: 20px 0;
  color: red;
}

.reresemblance-shop {
  margin-top: 20px;
}

.img-btn img.img-active {
  border-color: #666;
}

.rerese-title {
  color: #666;
  padding-bottom: 10px;
  border-bottom: 1px solid #dedede;
}
</style>