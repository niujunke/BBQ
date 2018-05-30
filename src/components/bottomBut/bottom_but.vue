<template> 
    <div class="bottom_but">
      <div class="flex"  v-if="!state">
         <span></span>
         <span>待支付：<em class="red">¥{{pice}}</em></span>
         <a @click="toConfirmPay" class="last_btn">提交订单</a>
       </div> 
       <div class="flex"  v-if="state=='已付款'">
         <span></span>
         <router-link :to="'/detail/'+toOrder.storeId" class="green cartcontrol"><div class="cart-add car_ic"></div><span>我要加单</span></router-link>
         <a class="last_btn" @click="distribution(toOrder.orderId)">立即配送</a>
       </div>
       <div class="flex"  v-if="state=='待付款'">
         <span></span>
         <span>待支付：<em class="red">¥{{pice}}</em></span>
         <a @click="toPay" class="last_btn">立即支付</a>
       </div> 
        <div class="flex"  v-if="state=='已提货'||state=='配送完成'||state=='烤具已收回'">
      <!--    <span class="green" @click="returnTableware">退还烤具</span> -->
         <span></span>
         <span class="green cartcontrol"><div class="cart-add car_ic"></div><span>再来一单</span></span>
         <router-link :to="'/comment/?id='+toOrder.storeId" class="last_btn">去评价</router-link>
       </div> 
         <div class="flex"  v-if="state=='已评价'">
         <span></span>
         <span></span>
         <span class="green cartcontrol"><div class="cart-add car_ic"></div><span>再来一单</span></span>  
       </div> 
   </div>
</template>

<script>
import {MessageBox,Toast} from 'mint-ui';

export default {
  props: {
    toOrder:Object,
    pice:Number,
    msg:String,
    state:String,
    value:String
  },
  data()
  {
     return{
         nowTime:null,
         payTime:null
     }
  },
  methods:{
  	 toConfirmPay()
  	 {
         if(this.toOrder.addrId||this.value=='自提')
         {
             let type=this.$route.query.type!='undefined'?this.$route.query.type:0;
             this.$http({
                 method:'post',
                 url:this.URL+'/app/cartToOrder',
                 params:{userId:localStorage.clientId,storeId:this.toOrder.storeId,addrId:this.value=='自提'?this.toOrder.shipAddressId:this.toOrder.addrId,couponId:'',cartSession:this.toOrder.cartSession,msg:this.msg,transportType:this.value=='送货'?1:0,date:this.$route.query.date,token:localStorage.token,type:type}
                 }).then(res=> {
                   if(res.data.object)
                   {
                        MessageBox('提示', res.data.msg);
                        if(this.$route.query.type=='1')
                        {
                           this.$router.push({path:'/AA?id='+res.data.object.orderId}) 
                        }
                        else if(this.$route.query.type=='2')
                        {
                           //this.$router.push({path:'/AA?id='+res.data.object.orderId}) 
                        }
                        else
                        {

                           this.$router.push({path:'/confirmPay?storeId='+this.$route.query.id}) 
                           var obj={}
                           obj=res.data.object
                           this.$store.commit('setPays', obj);
                        }    
                        
                   }
                   else
                   {
                        MessageBox('提示', res.data.msg);
                   }
                  
                 });
          }
          else
          {
             Toast('请填写地址信息');
          }
          console.log(this.value)  
  	 },
      toPay()
      {
         var date = new Date(this.toOrder.bookTime)
         var nowDate=new Date()
             this.payTime=date.getTime()
             this.nowTime=nowDate.getTime()
             console.log(this.nowTime)
             if(this.nowTime>=this.payTime)
             {
               
                 MessageBox.confirm('抱歉！需提前24小时预订\n 是否重新选购？').then( promise => {
                    this.$router.push({path:'/detail/'+this.toOrder.storeId}) 
                });            
             }
             else
             {
                  var obj={
                  orderId:this.toOrder.orderId,
                  storeLogo:this.toOrder.storeLogo,
                  storeName:this.toOrder.storeName,
                  totalPrice:this.pice
                 }
                console.log(obj)
               this.$store.commit('setPays', obj);
               this.$router.push({path:'/confirmPay?storeId='+this.toOrder.storeId})    
             }
      },
    distribution(id)
    {
         console.log(id)      
         this.$http({
             method:'post',
             url:this.URL+'/app/ship',
             params:{userId:localStorage.clientId,orderId:id}
             }).then(res=> {
                if(res.data.code==0)
                 {
                   MessageBox('提交成功', '配送人员正在前往配送~');
                 }
                 else
                 {
                   MessageBox('提示', res.data.msg);
                 }
                 console.log(res)
             });
    }
          
  }
}
</script>
<style>
.bottom_but{text-align:right;height:60px;line-height:60px;background:#fff;position:fixed;bottom:0;left:0;width:100%;box-shadow:0 -1px 0 #eee}
.bottom_but a.last_btn{background:#21c883;color:#fff !important;}
.order_state .cartcontrol{line-height: normal;border-left:1px solid #21c883;}
.order_state .car_ic{margin:12px auto 0;display:block;}
</style>
