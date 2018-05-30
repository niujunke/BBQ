<template>
  <div class="noPayment collect">
       <ul>
          <li v-for="(item,index) in stores">
              <div class="flex-auto">
                   <div class="order_pc"><img :src="URL+'/'+item.logoUrl"></div>
                   <div class="order_info">
                      <div class="name flex-sb"><h3>{{item.store_name}}</h3><span class="empty" @click="setDelete(item.id,index)"><i></i>删除收藏</span></div>
                      <p class="gray ellipsis">{{item.store_info}}</p>
                      <p class="price flex-sb"><star :size="36" ></star><span class="state"><button class="green">预订</button></span></p>

                   </div>
              </div>
          </li>
       </ul>
  </div>
</template>

<script>
import {Cell,Button,Toast } from 'mint-ui';
import star from './star/star'
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '我的收藏');
        vm. getStores()
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
   components: {
    star: star
  },
  data(){
    return{
      stores:[]
    }
  },
   methods:{
     getStores()
     {
        this.$http.post(this.URL+'/app/storesFavorite/'+localStorage.clientId+'?token='+localStorage.token).then((res)=>{
        console.log(res)
         this.stores=res.data.object
        })
     },
     setDelete(id,index)
     { 
       console.log(index)
        this.$http.post(this.URL+'/app/storesFavoriteDelete/'+id+'').then((res)=>{
         Toast('删除成功')
         this.stores.splice( this.stores.indexOf(index),1);
        })
     }
   }
}
</script>
<style>
.user_info .user_pc{width:35px;height:35px;}
.user_info .user_pc img{border-radius:50%;}
.empty i{ width:16px; height:24px; background:url('../assets/images/car.png') no-repeat -26px  -23px ; background-size: 40px auto}
.collect .grade .rate{margin-left:0;}
</style>
