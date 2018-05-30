<template>
  <div class="noPayment">
       <ul>
          <li v-for="item in noPays">
              <div class="flex-auto">
                   <div class="order_pc"><router-link :to="item.id+'/orderState/?name='+item.appStore.store_name"><img :src="URL+'/'+item.appStore.logoUrl"></router-link></div>
                   <div class="order_info">
                      <router-link :to="item.id+'/orderState/?name='+item.appStore.store_name">
                        <div class="name flex-sb"><h3>{{item.appStore.store_name}}</h3><span class="green">待付款</span></div>
                        <p class="time">预订烧烤时间：{{item.bookTime}}</p>
                      </router-link>
                      <p class="price flex-sb"><span>总价：{{item.totalPrice}}元</span><span class="state"><button class="green" @click="goRoure(item.appStore.id,item.id,item.appStore.logoUrl,item.appStore.store_name,item.totalPrice,item.bookTime)">立即付款</button></span></p>

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
      vm. getNopay()
    
    });
  },
  data () {
    return {
      noPays:[],
      nowTime:null,
      payTime:null
    }
  },
  methods:{
    getNopay()
    {
       if(localStorage.clientId)
       {
          this.$http.post(this.URL+'/app/ordersSubmit/'+localStorage.clientId+'?token='+localStorage.token).then((res)=>{
           console.log(res)
           this.noPays=res.data.object
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
    }
  }
}
</script>

