<template>
  <div class="refund">
       <div class="goodsInfo">
            <div class="info_list pr"><span class="gray">退款金额</span><span><em class="red">{{schedule.totalPrice-schedule.lose_fee}}</em>元（已扣除食材损耗费{{schedule.lose_fee}}元）</span></div>
            <div class="info_list pr"><span class="gray">退回帐户</span><span>微信支付</span></div>
            <div class="info_list pr"><span class="gray">到账时间</span><span>预计最晚三个工作日到账</span></div>
            <div class="divider"></div>
            <div class="info_list"><span class="gray">退款流程</span></div>
             <ul class="order_status" >
             <li v-for="item in schedule.appRefundLogs">
               <i></i>
               <span>{{item.logInfo}}</span>
               <span class="gray">{{item.createTime|time}}</span>
             </li>
                
        </ul>
       </div>
      
  </div>
</template>

<script>
import { Button } from 'mint-ui';
export default {
 beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '退款详情');
        vm.getSchedule()
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data()
    {
       return{
          schedule:{}
       }
    },
    methods:{
      getSchedule()
      {
         this.$http({
           method:'post',
           url:this.URL+'/app/refundInfo',
           params:{orderId:this.$route.query.orderId}
           }).then(res=> {
               console.log(res)
              this.schedule=res.data.object
           });
      }
    }
}
</script>
<style>
.refund .pr span{padding-right:30px;}
</style>
