<template>
  <div class="shop">
    <div class="shop-item left" :style="'width:' + width + 'px;'" @click="clickShop">
      <img v-lazy="shop.img_list_url" />
      <h3>{{shop.title}}</h3>
      <p class="clear">
        <span class="price">￥{{shop.price}}</span>
        <span v-html="shop.mack" class="mack right"></span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shop: {
      type: Object,
      default: {}
    },
    width: {
      type: Number,
      default: 220
    }
  },
  methods: {
    clickShop() {
      this.$router.push("/detail/" + this.shop.Id);
    }
  }
};
</script>

<style scoped>
.shop-item {
  margin: 5px;
  padding: 5px;
  transition: all 0.5s;
  border-radius: 8px;
  background-color: #fff;
}

.shop-item img {
  width: 100%;
  display: block;
  height: 220px;
}

.shop-item h3 {
  color: #424242;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
}

.shop-item p {
  line-height: 30px;
  margin: 10px 0;
  color: #000;
  font-size: 16px;
}

.price {
  color: #ff4500;
  font-weight: bolder;
  line-height: 30px;
}
</style>