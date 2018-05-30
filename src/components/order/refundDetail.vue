<template>
  <div class="refund">
       <div class="goodsInfo">
            <div class="info_list"><span class="gray">退款方式</span></div>
            <div class="info_list" ><span >原路返回</span><span class="green">（现金将于1-7个工作日内退还到原支付方）</span></div>
            <div class="divider"></div>
            <div class="info_list"><span class="gray">退还现金</span></div>
            <div class="info_list flex-sb"><span>现金</span><span>￥{{cost.totalPrice}}</span></div>
            <div class="info_list flex-sb" ><span>损耗费</span><span>-￥{{cost.lose_fee}}</span></div>
            <div class="info_list green" >￥{{cost.totalPrice-cost.lose_fee}}</div>
            <div class="divider"></div>
            <div class="info_list"><span class="gray">退改签须知</span></div>
            <div class="info_list">
                  <p>
                    开烤前一天18点前，可免费改签</br>
                    开烤前一天18点后改签，需支付食材损耗费20元</br>
                    开烤前60分钟以内无法改签</br>
                    实际支付金额小于损耗费的无法改签</br>
                    开烤前一天18点前，可免费退款</br>
                    开烤前一天18点后退款，需支付食材损耗费20元</br>
                    开烤前60分钟以内无法退款</br>
                    实际支付金额小于损耗费的无法退款
                 </p>
            </div>
            <div class="divider"></div>
            <div class="caution"><i></i>提交退款申请后不可取消</div>
            <div class="btn">
              <mt-button type="default" size="large" @click="applyCost()">申请退款</mt-button>
            </div> 
       </div>
      
  </div>
</template>

<script>
import { Button,MessageBox } from 'mint-ui';
export default {
 beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '退款申请');
        vm.getCost()
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
         cost:{}
      }
    },
    methods:{
      getCost()
      {
         this.$http({
           method:'post',
           url:this.URL+'/app/refund',
           params:{userId:localStorage.clientId,orderId:this.$route.query.orderId}
           }).then(res=> {
              if(res.data.code==0)
              {
                this.cost=res.data.object
              }
              else
              {
                 MessageBox.alert(res.data.msg).then(action => {
                      this.$router.go(-1)
                  });
              }
             
           });
      },
      applyCost()
      {
        this.$http({
           method:'post',
           url:this.URL+'/app/refundSubmit',
           params:{userId:localStorage.clientId,orderId:this.$route.query.orderId,lose_fee:this.cost.lose_fee}
           }).then(res=> {
             if(res.data.code==0)
             {
              
                MessageBox({
                  title: '提交成功',
                  message: '退款申请已提交，请耐心等待'
                }).then(action => {
                   this.$router.push({path:'/order/refund'})
                });
             }
           });
      }
    }
}
</script>
<style>
.refund .info_list.green{text-align:right}
.refund .info_list p{line-height:24px;color:#828282;padding:10px 0;font-size:12px; }
.refund .caution{text-align:center;font-size:12px;padding-bottom:0;}
.refund .btn{margin:0;}
.refund .btn .mint-button{font-size:14px;}
</style>
