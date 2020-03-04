<template>
  <div class="search">
    <!-- 输入框 -->
    <div class="input">
      <input type="text" v-model="keywords" placeholder="请输入想要的商品" />
    </div>
    <!-- 点击搜索 -->
    <button class="btn" @click="searchClick">
      <Icon type="ios-search" />
      <span>搜索</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      keywords: ""
    };
  },
  methods: {
    // 点击搜索
    searchClick() {
      if (!this.keywords.trim()) {
        this.$Message.warning({
          background: true,
          content: "搜索内容不能为空"
        });
        return;
      }
      this.$router.push("/search/" + this.keywords);
    }
  }
};
</script>

<style scoped>
.search {
  width: 600px;
}

.input {
  width: 400px;
  display: inline-block;
  font-size: 14px;
}

.input input {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #dcdfe6;
  border-right: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  color: #606266;
  padding: 0 15px;
  font-size: inherit;
}

.input input:focus {
  border-color: purple;
  border-right: none;
  outline: none;
}

.btn {
  display: inline-block;
  padding: 8.5px 20px;
  font-size: 14px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  cursor: pointer;
  background: #fff;
  position: relative;
  top: -1px;
  outline: none;
}

.btn:hover {
  color: purple;
  border-color: #d9b3d9;
  background-color: #f2e6f2;
}

.btn span {
  margin-left: 5px;
}
</style>
