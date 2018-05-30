<template>
  <div class="order">
       <div class="order_tit">我的订单</div>
       <div class="tab flex">
          <router-link to="/order/noPayment" >
            <div class="icon i1"><!-- <mt-badge size="small" type="error">1</mt-badge> --></div>
             待付款
          </router-link>
          <router-link  to="/order/Payment" >
            <div class="icon i2"><!-- <mt-badge size="small" type="error">2</mt-badge> --></div>
              已付款
          </router-link> 
          <router-link to="/order/estimate" >
              <div class="icon i3"><!-- <mt-badge size="small" type="error">5</mt-badge> --></div>
              待评价
           </router-link>
          <router-link to="/order/refund"  >
             <div class="icon i4"><!-- <mt-badge size="small" type="error">5</mt-badge> --></div>
             退款
          </router-link>
     </div>
     <div class="order_list">
      <keep-alive>
        <router-view></router-view>
       </keep-alive>
     </div>
     
  </div>
</template>

<script>
import { Badge } from 'mint-ui'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('setHeadTitle', '订单');
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('setHeadTitle', '');
      next()
    }
 }
</script>
<style>
body{}
.order{height:100%;padding-bottom:58px;}
.order_tit{line-height:34px;border-bottom:1px solid #bfbfbf;padding:0 15px;}
.tab{border-bottom:1px solid #bfbfbf;}
.tab a{padding:10px 0;color:#414141;}
.tab a .icon{width:24px;height: 24px;margin:0 auto 5px;background:url('../assets/images/tab.png') no-repeat;background-size:50px auto;position:relative;}
.tab a .icon.i2{background-position:0 -25px;}
.tab a .icon.i3{background-position:0 -49px;}
.tab a .icon.i4{background-position:0 -74px;}
.tab a.cur{color:#21c883;}
.tab a.cur .icon.i1{background-position:-25px 0;}
.tab a.cur .icon.i2{background-position:-25px -25px;}
.tab a.cur .icon.i3{background-position:-25px -49px;}
.tab a.cur .icon.i4{background-position:-25px -74px;}
.mint-badge.is-size-small{position:absolute;top:-8px;right:-12px;}
</style>
