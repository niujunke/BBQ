<template>
  <div class="noPayment all">
       <div class="tit">最近订单</div>
       <div class="log_status" v-if="!userState">
          <div class="status_box">
              <p class="gray">登录后可查看订单</p>
              <router-link to="/login" class="mint-button--default">登录</router-link>
          </div>
       </div>
       <ul>
          <li v-for="item in allPays">    
              <div class="flex-auto">
                   <div class="order_pc"> <router-link :to="item.orderStatus=='退款中'||item.orderStatus=='退款成功'?'/refundState?orderId='+item.id:item.id+'/orderState/?name='+item.appStore.store_name"><img :src="URL+'/'+item.appStore.logoUrl"></router-link></div>
                   <div class="order_info">
                       <router-link :to="item.orderStatus=='退款中'||item.orderStatus=='退款成功'?'/refundState?orderId='+item.id:item.id+'/orderState/?name='+item.appStore.store_name">
                          <div class="name flex-sb"><h3>{{item.appStore.store_name}}</h3><span class="green">{{item.orderStatus=='已付款'?'待配送':item.orderStatus}}</span></div>
                          <p class="time">预订烧烤时间：{{item.bookTime}}</p>
                       </router-link>
                      <p class="price flex-sb" v-if="item.orderStatus=='退款中'||item.orderStatus=='退款成功'"><span>总价：{{item.totalPrice}}元</span><span class="state"><button class="green"><router-link :to="'/refundState?orderId='+item.id" class="green">退单进度</router-link></button></span></p>
                      <p class="price flex-sb" v-if="item.orderStatus=='待付款'"><span>总价：{{item.totalPrice}}元</span><span class="state"><button class="green" @click="goRoure(item.appStore.id,item.id,item.appStore.logoUrl,item.appStore.store_name,item.totalPrice,item.bookTime)">立即付款</button></span></p>
                       <p class="price flex-sb" v-if="item.orderStatus=='已付款'"><span>总价：{{item.totalPrice}}元</span><span class="state"><button class="green"> <router-link :to="'/detail/'+item.appStore.id" class="green">我要加单</router-link></button><button class="green"  @click="distribution(item.id)">立即配送</button></span></p>
                        <p class="price flex-sb" v-if="item.orderStatus=='烤具已收回'"><span>总价：{{item.totalPrice}}元</span></p>
                   </div>
              </div>
           
          </li>
       </ul>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui';
export default {
 beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getAllpay()
    
    });
  },
  data () {
    return {
      allPays:[],
      userState:false,
      nowTime:null,
      payTime:null
    }
  },
  methods:{
    getAllpay()
    {
      if(localStorage.clientId)
      {
        this.userState=true
        this.$http.post(this.URL+'/app/orders/'+localStorage.clientId+'?token='+localStorage.token).then((res)=>{
         console.log(res)
         this.allPays=res.data.object
        })
      } 
    },
    goRoure(id,orderId,storeLogo,storeName,totalPrice,time)
    {
       var date = new Date(time)
       var nowDate=new Date()
           this.payTime=date.getTime()
           this.nowTime=nowDate.getTime()
           console.log(this.nowTime)
           if(this.nowTime>=this.payTime)
           {
             
               MessageBox.confirm('抱歉！需提前24小时预订\n 是否重新选购？').then( promise => {
                  this.$router.push({path:'/detail/'+id}) 
              });            
           }
           else
           {
                var obj={
                    orderId:orderId,
                    storeLogo:storeLogo,
                    storeName:storeName,
                    totalPrice:totalPrice
               }
              this.$store.commit('setPays', obj);
              this.$router.push({path:'/confirmPay?storeId='+id}) 
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
.all .tit{padding:8px 14px;color:#333;border-bottom:1px solid #bfbfbf;}
.log_status{display: flex;align-items: center;justify-content: center;line-height:40px;text-align:center;position:fixed;width:100%;top:50px;left:0;bottom:0;background:#e5e5e5;}
.log_status p{font-size:12px;}
.log_status .mint-button--default{background:#05c981;color:#fff;padding:0 30px;}
</style>
