<template>
  <div class="container">
    <div class="search">
      <input
        class="search-input"
        placeholder="请输入关键字"
        focus
        @change="handleSearch"
      >
      <!-- <input class='search-input' placeholder="请输入关键字" focus v-model="keywords" />
      <span class='search-btn' @click="this.handleSearch">搜索</span>-->
    </div>
    <div class="search-show">
      <navigator
        v-for="(item,index) of list"
        :key="index"
        :url="'../item/main?keyword=' + item"
      >
        <div class="search-item">{{item}}</div>
      </navigator>
    </div>
  </div>
</template>
  
<script>
import loadNovels from "../../utils/loadNovels.js";
export default {
  data() {
    return {
      keywords: "",
      list: []
    };
  },
  methods: {
    loadList() {
      let _name = this.keywords;
      loadNovels({ url: "/novelSearchApi", data: { name: _name } }).then(
        res => {
          this.list = res.data.data;
          // console.log(this.list);
        }
      );
    },
    handleSearch(e) {
      if (!e.target.value) return;
      this.keywords = e.target.value;
      this.loadList();
    }
  },

  created() {
    // loadNovels({url:"/novelSearchApi",data:{name:"天龙八部"}}).then(
    //   res =>{
    //     console.log(res)
    //   }
    // )
  }
};
</script>

<style>
.search {
  margin: 0 50rpx;
  display: flex;
  border: 2rpx solid red;
}
.search .search-input {
  padding: 0 24rpx;
  flex: 1;
  height: 60rpx;
  color: #999;
  font-size: 30rpx;
  line-height: 60rpx;
}
.search .search-btn {
  display: block;
  width: 80rpx;
  height: 60rpx;
  font-size: 30rpx;
  line-height: 60rpx;
  text-align: center;
  background: #ccc;
}
.search-show {
  margin: 10rpx 50rpx;
}
.search-show .search-item {
  height: 60rpx;
  font-size: 30rpx;
  line-height: 60rpx;
  text-align: center;
  background: #fbfbfb;
  border-radius: 16rpx;
  color: red;
  margin-bottom: 10rpx;
}
</style>
