<template>
  <div class="container">
    <img class="background" :src="detail.pic&&detail.pic" mode="aspectFill">
    <div class="add" @click="handleFavorite" v-if="detail.title">加入收藏夹</div>
    <div class="content">
      <div class="lead">导读：{{detail.title}}</div>
      <div class="lead">作者：{{detail.author}}</div>
      <div class="look">{{detail.desc}}</div>
      <div class="look">{{detail.desc}}</div>
    </div>
  </div>
</template>

<script>
import loadNovels from "../../utils/loadNovels.js";
import store from "../../store.js";
export default {
  data() {
    return {
      title: "loading...",
      detail: {}
    };
  },
  methods: {
    handleFavorite() {
      let favorite = {
        title: this.detail.title,
        image: this.detail.pic,
        id: this.detail.id
      };

      let isOld = false;
      let favorites = store.state.favorites;
      favorites.forEach(item => {
        if (item.id == favorite.id) {
          isOld = true;
        }
      });
      if (isOld) {
        return;
      } else {
        favorites.push(favorite);
        store.commit("addItem", favorites);
      }
    }
  },
  created() {},
  beforeMount() {
    let _name = this.$root.$mp.query.keyword;
    // console.log(_name);
    let _this = this;
    if (!_name) {
      return;
    }

    loadNovels({ url: "/novelInfoApi", data: { name: _name } }).then(res => {
      let _list = res.data.data.aladdin;
      if (_list) {
        let obj = {};
        obj.author = _list.author;
        obj.title = _list.title;
        obj.pic = _list.cover;
        obj.desc = _list.desc;
        obj.id = _list.bid;
        _this.detail = obj;
        _this.title = _list.title;
      }
      mpvue.setNavigationBarTitle({
        title: this.title ? this.title : "loading..."
      });
    });
  }
};
</script>

<style>
.add {
  width: 160rpx;
  height: 48rpx;
  font-size: 24rpx;
  border-radius: 16rpx;
  line-height: 48rpx;
  position: fixed;
  top: 40rpx;
  right: 20rpx;
  background: #9f0;
  text-align: center;
}
</style>
