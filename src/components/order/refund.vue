<template>
  <div class="refund">
       <ul>
            <li v-for="item in refund">
              <div class="flex-auto">
                   <div class="order_pc"><router-link :to="'/refundState?orderId='+item.id"><img :src="URL+'/'+item.appStore.logoUrl"></router-link></div>
                   <div class="order_info">
                      <router-link :to="'/refundState?orderId='+item.id">
                        <div class="name flex-sb"><h3>{{item.appStore.store_name}}</h3><span class="green">{{item.orderStatus}}</span></div>
                        <p class="time">预订烧烤时间：{{item.bookTime}}</p>
                      </router-link>
                       <p class="price flex-sb" ><span>总价：{{item.totalPrice}}元</span><span class="state"><button class="green"><router-link :to="'/refundState?orderId='+item.id" class="green">退单进度</router-link></button></span></p>

                   </div>
              </div>
          </li>
       </ul>
  </div>
</template>

<script>
export default {
 beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getRefund()
    
    });
  },
  data () {
    return {
      refund:[]
    }
  },
  methods:{
    getRefund()
    {
      if(localStorage.clientId)
      {
        this.$http.post(this.URL+'/app/refundOrders/?userId='+localStorage.clientId+'&token='+localStorage.token).then((res)=>{
         console.log(res)
         this.refund=res.data.object
        })
      } 
    }
  }
}
</script>
<style>

</style>
