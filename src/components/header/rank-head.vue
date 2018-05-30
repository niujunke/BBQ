<template> 
   <div class="rank-head container" :style="style">
    <a class="rank-head-back" @click="routerBack" v-if="ishow" :class="css"></a>
    {{title}}
    <div :class="{'head_text':isPay,'head-ic':!isPay}"  v-if="!ishow">
        <!-- <img src="../../assets/images/sh.png" v-if="!isPay">   -->
        <router-link to="/order"  v-if="isPay">完成</router-link>
    </div>
     <div :class="{'head_text':isShare,'head-ic':!isShare}"  v-if="!ishow">
        <!-- <img src="../../assets/images/sh.png" v-if="!isPay">   -->
        <router-link to="/my_share"  v-if="isShare">我的拼单</router-link>
    </div>
    <div class="search" v-if="seachShow">
        <div class="head-sh">
            <div class="mint-searchbar-inner"><input type="search" placeholder="输入目的地" v-model="keyword" class="mint-searchbar-core"></div>
            <div class="head-ic"  @click="search"><img src="../../assets/images/sh.png"></div>
        </div>
    </div>
  </div>
</template>

<script type="es6">
import {mapActions} from 'vuex'
  export default {
    props: ['title', 'to', 'style','ishow','isPay','seachShow','css','isShare'],
    name: 'rank-head',
     data(){
      return {
        keyword: ''
      }
    },
    methods: {
      routerBack()
      {
        this.$router.go(-1);
      },
      search()
      {
         this.$store.dispatch('getShops', this.keyword);
      }
    }
  }
</script>
<style>
.search{display:flex;align-items:center;height:100%;}
.search .head-sh{width:80%;font-size:14px;}
.search .head-sh .mint-searchbar-inner{background:none;opacity:1;}
.search .head-sh .mint-searchbar-inner .mint-searchbar-core{background:none;color:#fff;}
.search .head-sh .mint-searchbar-inner input::-webkit-input-placeholder{color:rgba(255,255,255,0.5);}
.search .head-sh .head-ic{margin-top:-28px;}
.rank-head .show{display:none;}
</style>
