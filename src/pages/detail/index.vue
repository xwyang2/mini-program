<template>
  <div class="container">
    <img class="background" :src=" msg.pic&&msg.pic" mode="aspectFill"/>
    <div class="content"> 
         <div class="lead">导读：</div>
         <div class="look">{{msg.introduction}}</div>
         <div class="look">{{msg.info}}</div>
    </div>
  </div>
</template>

<script>

import loadNovels from '../../utils/loadNovels.js'
export default {
  data () {
    return {
      msg:{title:"loading..."},
      id:0,

    }
  },
  created () {
    
  },
  beforeMount:function(){
    let id=this.$root.$mp.query.id
    if (!id) {
      return;
    }
    let _this=this;
    loadNovels({url: '/novelApi',
      }).then(
      res =>{
        // console.log(res)
        // console.log(typeof res)
        let result=res.data.data;
        // console.log(result)
        let obj={};
        result.forEach(element => {
          if (element.bid==id) {
            obj.title=element.bookname;
            obj.introduction=element.introduction;
            obj.info=element.book_info;
            obj.pic=element.book_cover;
            _this.msg=obj;
          }  
        });
        mpvue.setNavigationBarTitle({ title: this.msg.title });
      }
    )
  },
}
</script>

<style>

</style>
