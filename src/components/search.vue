<template>
 <div class="search_list">
     <div class="mor_city"  v-show="shop.length==0">
          <div class="citys p10 cont">
              <h2>热门搜索</h2>
              <div class="bar-ligt">
                   <a v-for="item in hotSch" @click="search(item)">{{item}}</a>
              </div> 
          </div>
    </div>
     <ul class="bq_list" v-show="shop.length!=0">
            <li v-for="item in shop">
                <router-link :to="'/detail/'+item.id+'?type='+type">
                   <div class="bq_pc"> <img src="../assets/l1.jpg"><!-- <img :src="URL+'/'+item.logoUrl">--></div>
                   <div class="bbq-name">
                       <div class="flex-sb">
                        <div class="bq-name ellipsis">{{item.store_name}}</div>
                        <div class="location">{{item.distance}}km</div>      
                       </div>
                       <div class="flex-sb">
                              <star :score="item.storePoint.store_evaluate1"></star>
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
import { mapGetters } from 'vuex'
 export default{
    //通过路由的before钩子解除router-view缓存限制
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('showSearch', true);

      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('showSearch', false);
      this.shop.splice(0,1);
       console.log(this.shop.length)
      next()
    },
     computed:mapGetters(['shop']),
    data()
    {
      return{
         hotSch:[]
      }
    },
     created()
    {
      
       this.getHot()
    },
   components: {
    star: star
   },
   methods:{
      getHot()
      {
          this.$http.get(this.URL+'/app/hotSearch').then(res=> {
            var str=res.data.object
            this.hotSch=str.split(",")
            
          }) 
      },
      search(key)
      {
         console.log(key)
         this.$store.dispatch('getShops', key);
      } 
   }
 }
</script>
<style>
.search_list .mor_city .citys a{padding:0px 10px;background:none;color:#666;width:auto;min-height:28px;line-height:28px;}
</style>
