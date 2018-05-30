<template>
   <div class="logo-container">
    <div class="head-logo">
      <router-link to="/citys">{{cityName?cityName:'定位中...'}}<i class="dw"></i></router-link>
    </div>
    <div class="head-sh">
          <div class="mint-searchbar-inner" @click="goSeach()">
                <i class="mintui mintui-search"></i>
                <input type="search" placeholder="输入目的地" class="mint-searchbar-core" >
          </div>
    </div>

  </div>
</template>

<script>
export default {
      props: ['cityName'],
      methods:{
        goSeach(){
            this.$router.push({path:'/search'})
        }
      }
}
</script>
<style>
.head-sh{height: 31px;width: 64%;margin:0 auto;line-height: 31px;}
.head-sh a{display:inline-block;}
.head-sh .mint-searchbar-inner{opacity:0.6;border-radius:16px;height:30px;align-items:center;padding-left:20px;align-items: center;}
.head-sh .mint-searchbar-inner .mintui-search{padding-right:4px;font-size:14px;line-height:30px;padding-top:4px;}


</style>
