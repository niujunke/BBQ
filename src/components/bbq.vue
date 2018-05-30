<template>
  <div class="bbq p60">
       <ul class="bq_list">
            <li v-for="item in shops">
                <router-link :to="'/detail/'+item.id+'?type='+type" >
                   <div class="bq_pc"> <img :src="URL+'/'+item.logoUrl"></div>
                   <div class="bbq-name">
	                     <div class="flex-sb">
	                      <div class="bq-name ellipsis">{{item.store_name}}</div>
	                      <div class="location">{{item.distance}}km</div>      
	                     </div>
	                     <div class="flex-sb">
                              <star :score="item.storePoint.store_evaluate1?item.storePoint.store_evaluate1:''"></star>
                              <em>已售{{item.saleNum}}</em>
	                     </div>
                   </div>
                </router-link>
            </li>
       </ul>
  </div>
</template>
<script>
import star from './star/star'
import {Indicator} from 'mint-ui'
  //通过路由的before钩子解除router-view缓存限制
 export default{
   components: {
    star: star
  },
  data () {
    return {
      shops:[],
      type:this.$route.query.type
    }
  },
 	beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('setHeadTitle', '烧烤');
        vm.type=vm.$route.query.type
        vm.getShoop(localStorage.lat,localStorage.lng,localStorage.city)
      });
    },
    beforeRouteLeave(to, from, next){

      this.$store.commit('setHeadTitle', '');
      next()
    },
    created()
    {
     
      Indicator.open({
                        text: '加载中...',
                        spinnerType: 'snake'
                      });
      this.getShoop(localStorage.lat,localStorage.lng,localStorage.city)
    },
    methods:{
       getShoop(lat,lng,city)
      {        
        this.$http({
             method:'post',
             url:this.URL+'/app/stores',
             params:{lat:lat,lng:lng,name:city}
             }).then(res=> {
               Indicator.close();
               this.shops=res.data.object
                console.log(res)
             });
      }
    }
 }
    
</script>
<style>
.bq_list{overflow:hidden;padding:0 2px;}
.bq_list li{width:50%;float:left;margin-top:6px;}
.bq_list li a{display:block;color:#5f646e;width:96%;margin:0 auto;}
.bbq-name{padding:5px 4px 0;}
.bbq-name .flex-sb{margin-bottom:4px;}
.bq_list .bbq-name .rate{margin:0;}
.bbq-name em,.bbq-name .location{font-size:12px}
.bbq-name .bq-name{width:70%;}
.bq_list .bq_pc{height:32vw;overflow: hidden;}
</style>
