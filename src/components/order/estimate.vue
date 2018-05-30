<template>
   <div class="estimate">
       <ul>
          <li v-for="item in evaluates">
            <div class="flex-auto">
                 <div class="order_pc"><router-link :to="item.id+'/orderState/?name='+item.appStore.store_name"><img :src="URL+'/'+item.appStore.logoUrl"></router-link></div>
                 <div class="order_info">
                    <router-link :to="item.id+'/orderState/?name='+item.appStore.store_name">
                      <div class="name flex-sb"><h3>{{item.appStore.store_name}}</h3><span class="green">待评价</span></div>
                      <p class="time">预订烧烤时间：{{item.bookTime}}</p>
                    </router-link>
                    <p class="price flex-sb"><span>总价：{{item.totalPrice}}元</span><span class="state"><button class="green"><router-link :to="'/comment/?id='+item.appStore.id" class="green">去评价</router-link></button><button class="green" @click="returnTableware(item.id)" v-if="item.repayTableware">退还烤具</button></span></p>
                 </div>
            </div>
          </li>
       </ul>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
 beforeRouteEnter (to, from, next) {
    next(vm => {
      vm. getEvaluate()
    
    });
  },
  data () {
    return {
      evaluates:[]
    }
  },
  methods:{
    getEvaluate()
    {
       if(localStorage.clientId)
       {
          this.$http.post(this.URL+'/app/ordersWaitEvaluate/'+localStorage.clientId+'?token='+localStorage.token).then((res)=>{
           console.log(res)
           this.evaluates=res.data.object
         })
       }
    },
     returnTableware(id)
      {
          this.$http({
             method:'post',
             url:this.URL+'/app/repay',
             params:{userId:localStorage.clientId,orderId:id}
             }).then(res=> {
                 if(res.data.code==0)
                 {
                    MessageBox('提交成功', '稍后会有工作人员收取烤具，烤具退还完成后押金自动退还原账户。');
                 }
                 console.log(res)
             });
      }
  }
}
</script>
<style>

</style>
