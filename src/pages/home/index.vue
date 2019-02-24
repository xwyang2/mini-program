<template>
  <div class="container">
    <div class="slide">
      <swiper
        class='swp'
        :indicator-dots="true"
        :autoplay="true"
        :interval="3000"
        :duration="100"
        :circular="true"
      >
        <swiper-item
          v-for="item of list"
          :key="item.id"
        >
          <navigator :url="'../detail/main?id='+item.id">
            <image
              class='nav-img'
              :src="item.pic"
              mode="aspectFill"
            />
          </navigator>
        </swiper-item>
      </swiper>
    </div>
    <div class="recommend">
      <navigator
        v-for="item of list"
        :key="item.id"
        :url="'../detail/main?id='+item.id"
      >
        <div class="item">
          <div class="item-name">{{item.title}}</div>
          <img
            class="item-img"
            :src="item.pic"
          />
          <div class="item-author">作者：{{item.author}}</div>
          <div class="item-info">分类：{{item.info}}</div>
        </div>
      </navigator>
    </div>
  </div>
</template>

<script>
import loadNovels from "../../utils/loadNovels.js";

export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    loadNovels({
      url: "/novelApi"
    }).then(res => {
      let result = res.data.data;
      let _this = this;
      let _list = [];
      result.forEach(item => {
        let obj = {};
        obj.title = item.bookname;
        obj.pic = item.book_cover;
        obj.author = item.author_name;
        obj.info = item.class_name;
        obj.id = item.bid;
        _list.push(obj);
      });
      this.list = _list;
    });
  }
};
</script>

<style>
.slide .swp {
  padding: 0rpx 30rpx;
  height: 300rpx;
}

.slide .nav-img {
  height: 300rpx;
  width: 100%;
}
.recommend {
  text-align: center;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10rpx 30rpx;
}
.recommend .item {
  width: 340rpx;
  margin-bottom: 5rpx;
  border: 2rpx solid #ccc;
  background: #fbfbfb;
  cursor: pointer;
}
.recommend .item .item-name {
  font-size: 24rpx;
  line-height: 40rpx;
  height: 40rpx;
  overflow: hidden;
  background: #7f0;
}
.recommend .item .item-img {
  display: block;
  width: 100%;
  height: 300rpx;
}
.recommend .item .item-author,
.recommend .item .item-info {
  text-align: left;
  text-indent: 20rpx;
  font-size: 24rpx;
  line-height: 40rpx;
  height: 40rpx;
  color: blue;
  background: #f1f1f1;
}
</style>
