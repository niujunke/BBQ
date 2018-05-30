<template>
  <div class="order order_state">
       <div class="tab flex">
          <router-link :to="{path:'/order/'+this.$route.params.id+'/orderState'}" replace>
             订单状态
          </router-link>
          <router-link  :to="{path:'/order/'+this.$route.params.id+'/orderContent'}" replace>
              订单详情
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
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', vm.$route.query.name);
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    }
 }
</script>
<style>
body{}
.order{height:100%;}
.tab{border-bottom:1px solid #bfbfbf;}
.tab a{padding:10px 0;color:#414141;}
.order_state .tab a.cur{color:#21c883;border-bottom:2px solid #21c883;padding-bottom:12px;}

</style>
