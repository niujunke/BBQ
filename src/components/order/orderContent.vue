<template>
  <div class="payDetail pd_bot order_content">
       <div class="goodsInfo">
            <div class="info_list flex-sb"><span>订单号：{{orders.order_id}}</span><router-link :to="'/postponed?date='+orders.bookTime+'&orderId='+this.$route.params.id" class="green" v-show="orders.orderStatus=='已付款'">申请改期</router-link></div>
            <div class="info_list flex-sb" v-show="orders.orderStatus!='待付款'"><span class="gray">总价：￥{{orders.appStoreCart.total_price}}（含押金）</span><a @click="refund(orders.bookTime)" class="red"  v-show="orders.orderStatus=='已付款'">申请退单</a></div>
            <div class="ewm p10" v-show="orders.orderStatus!='待付款'">
              <img :src="URL+'/'+orders.qrcode">
              <p> {{orders.verifyCode}}</p>
              <div class="green"><span><i></i>随时退款</span><span><i></i>过期自动退款</span></div>
            </div>
            <div class="info_list pr"><span>预定时间</span><span>{{orders.bookTime}}</span></div>
            <div class="info_list pr"><span>下单手机</span><span>{{orders.phone}}</span></div>
            <div class="info_list pr"><span>配送方式</span><span class="green">{{orders.transportType==1?'送货':'自提'}}</span></div>
            <div class="info_list pr clearfix"><span class="fl">{{orders.transportType==1?'配送地址':'自提地址'}}</span><span class="fl">{{orders.appAddress.trueName?orders.appAddress.trueName:''}}{{orders.appAddress.mobile}}</br>{{orders.appAddress.appArea.parentAreaName+orders.appAddress.appArea.areaName+orders.appAddress.area_info}}</span></div>
            <div class="divider"></div>
            <div class="info_list flex-sb"><span>支付方式</span><span>在线支付</span></div>
            <div class="info_list flex-sb" ><span>优惠红包</span><span class="gray">暂无优惠</span></div>
       </div>
       <div class="divider"></div>
       <consumer-list  :cars="orders.appStoreCart" :tablewares="orders.tablewares" ></consumer-list>
       <div class="divider"></div>
        <div class="remark" ><span class="gray">备注：{{orders.msg}}</span></div>
       <bottom-but  :toOrder="toPay" :pice="orders.appStoreCart.total_price" :state="orders.orderStatus"></bottom-but>
  </div>
</template>

<script>
import bottomBut from '.././bottomBut/bottom_but'
import consumerList from '.././consumerLists/consumerLists'
export default {
   components:{
      bottomBut,
      consumerList
    },
     beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getOrder()
      });
    },
  data () {
    return {
      orders:{},
      toPay:{
            storeId:null,
            storeLogo:'',
            storeName:'',
            orderId:null,
            bookTime:null

         }
    }
  },
  methods:{
    getOrder()
    {
       this.$http.post(this.URL+'/app/order/'+this.$route.params.id).then((res)=>{
         console.log(res)
         this.orders=res.data.object
         this.toPay.storeId=this.orders.appStoreCart.appStore.id
         this.toPay.storeLogo=this.orders.appStoreCart.appStore.logoUrl
         this.toPay.storeName=this.orders.appStoreCart.appStore.store_name
         this.toPay.orderId=this.orders.id
         this.toPay.bookTime=this.orders.bookTime
       })
    },
    refund(time)
    {
      //:to="`/refundDetail?orderId=${this.$route.params.id}`"
      console.log(time)
      this.$router.push({path:`/refundDetail?orderId=${this.$route.params.id}`})
    }
  }

}
</script>
<style>
.order_content .goodsInfo  .ewm img{margin-bottom:5px;}
.order_content .goodsInfo  .ewm span{font-size:12px;}
.order_content .goodsInfo .green{text-align:center;font-size:14px;}
.order_content .goodsInfo .green i{width:16px;height:18px;background:url('../../assets/images/icons.png') no-repeat -15px -20px;background-size:70px auto;}
.order_content .goodsInfo .green span{padding:0 10px;}
.order_content .goodsInfo .pr span{padding-right:30px;}
.order_content .flex-sb{align-items:center;}
.order_content .flex-sb a.green{border:1px solid #21c883;height:20px;line-height:20px;border-radius:5px;font-size:12px;padding:0 5px;}
.order_content .flex-sb a.red{border:1px solid #ff0000;height:20px;line-height:20px;border-radius:5px;font-size:12px;padding:0 5px;}
.order_state .remark{padding-top:10px;padding-bottom:0}
.fl{float:left;}
.clearfix:after{ clear: both; content: "\200B"; display: block; height: 0;}
.order_content .goodsInfo .pr.clearfix span:nth-child(2){line-height:24px;padding:5px 0}
</style>
