<template>
  <div class="container">
      <div class="choose" @click="changeIf">编辑</div>
      <div class="clear" @click="clearAll">清空</div>
      <div class="collect"> 
          <div class="collect-item" v-for="item of list" :key="item.id">
            <div class="chooseto" v-if="choose" @click="delItem(item.id)">
              <img class="del" src="/static/images/del.png" />
            </div>
            <div class="collect-item-name">{{item.title}}</div>
            <img class="collect-item-img" :src="item.image"/>
          </div>
      </div>
  </div>
</template>

<script>
import store from "../../store.js";
export default {
  data() {
    return {
      list: [],
      choose: false
    };
  },
  methods: {
    changeIf() {
      this.choose = !this.choose;
    },
    clearAll() {
      this.list = [];
      let arr = [];
      store.commit("delItem", arr);
    },
    delItem(id) {
      let indexDel;
      let _list = this.list;
      _list.forEach((item, index) => {
        if (item.id == id) {
          indexDel = index;
        }
      });
      _list.splice(indexDel, 1);
      this.list = _list;
      store.commit("delItem", _list);
    }
  },
  created() {
    this.list = store.state.favorites;
  }
};
</script>

<style>
.collect {
  margin-top: 60rpx;
  text-align: center;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10rpx 30rpx;
}
.choose {
  padding: 0 10rpx;
  height: 48rpx;
  font-size: 24rpx;
  border-radius: 16rpx;
  line-height: 48rpx;
  position: fixed;
  top: 6rpx;
  right: 130rpx;
  background: #cfcfcf;
  text-align: center;
}
.chooseto {
  position: absolute;
  width: 48rpx;
  height: 48rpx;
  border-radius: 50%;
  bottom: 0;
  right: 0;
}
.chooseto .del {
  width: 48rpx;
  height: 48rpx;
}
.clear {
  padding: 0 10rpx;
  height: 48rpx;
  font-size: 24rpx;
  border-radius: 16rpx;
  line-height: 48rpx;
  position: fixed;
  top: 6rpx;
  right: 50rpx;
  background: #cfcfcf;
  text-align: center;
}
.collect .collect-item {
  width: 160rpx;
  margin-bottom: 5rpx;
  border: 2rpx solid #ccc;
  background: #fbfbfb;
  cursor: pointer;
  position: relative;
}
.collect .collect-item .collect-item-name {
  font-size: 24rpx;
  line-height: 40rpx;
  height: 40rpx;
  overflow: hidden;
  background: #7f0;
}
.collect .collect-item .collect-item-img {
  display: block;
  width: 100%;
  height: 180rpx;
}
</style>