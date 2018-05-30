<template>
  <div class="Payment">
       <ul>
          <li v-for="item in paids">
            <div class="flex-auto">
                 <div class="order_pc"><router-link :to="item.id+'/orderState/?name='+item.appStore.store_name"><img :src="URL+'/'+item.appStore.logoUrl"></router-link></div>
                 <div class="order_info">
                    <router-link :to="item.id+'/orderState/?name='+item.appStore.store_name">
                      <div class="name flex-sb"><h3>{{item.appStore.store_name}}</h3><span class="green">待配送</span></div>
                      <p class="time">预订烧烤时间：{{item.bookTime}}</p>
                    </router-link>
                    <p class="price flex-sb"><span>总价：{{item.totalPrice}}元</span><span class="state"><button class="green"> <router-link :to="'/detail/'+item.appStore.id" class="green">我要加单</router-link></button><button class="green" @click="distribution(item.id)" v-if="item.canShip">立即配送</button></span></p>
                 </div>
            </div>
          </li>
  <!--          <li>
             <a href="#@">
                <div class="flex-auto">
                     <div class="order_pc"><img src="../../assets/l2.jpg"></div>
                     <div class="order_info">
                        <div class="name flex-sb"><h3>牛王滩风景区烧烤</h3><span class="green">待收货</span></div>
                        <p class="time">预订烧烤时间：2017-3-11  11:30</p>
                        <p class="price flex-sb"><span>总价：110元</span><span class="state"><button class="green">我要加单</button><button class="green">确认收货</button></span></p>

                     </div>
                </div>
             </a>
          </li>
           <li>
             <a href="#@">
                <div class="flex-auto">
                     <div class="order_pc"><img src="../../assets/l3.jpg"></div>
                     <div class="order_info">
                        <div class="name flex-sb"><h3>牛王滩风景区烧烤</h3><span class="red">拼单中</span></div>
                        <p class="time">预订烧烤时间：2017-3-11  11:30</p>
                        <p class="price flex-sb"><span>总价：110元</span><span class="state green">共6人拼单，已拼4人剩余2人</span></p>

                     </div>
                </div>
             </a>
          </li> -->
       </ul>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
 beforeRouteEnter (to, from, next) {
    next(vm => {
      vm. getPaid()
    
    });
  },
  data () {
    return {
      paids:[]
    }
  },
  methods:{
    getPaid()
    {
       if(localStorage.clientId)
       {
          this.$http.post(this.URL+'/app/ordersWaitShipping/'+localStorage.clientId+'?token='+localStorage.token).then((res)=>{
           console.log(res)
           this.paids=res.data.object
         })
       } 
    },
    distribution(id)
    {
         this.$http({
             method:'post',
             url:this.URL+'/app/ship',
             params:{userId:localStorage.clientId,orderId:id}
             }).then(res=> {
                 if(res.data.code==0)
                 {
                   MessageBox('提交成功', '配送人员正在前往配送~');
                 }
                 console.log(res)
             });
    }
  }
}
</script>
<style>

</style>
