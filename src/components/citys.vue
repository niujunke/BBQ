<template>
  <div class="mor_city">
      <div class="citys p10">
          <h2>当前定位城市</h2>
          <div class="bar-ligt">
               <a @click="togCity(head.cityName)">{{head.cityName}}</a>
          </div>
           <h2>服务城市</h2>
          <div class="bar-ligt">
               <a v-for="item in citys" @click="togCity(item)">{{item}}</a>
          </div>    
      </div>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      next()
    },
    computed:mapGetters(['head']),
    data(){
      return{
        citys:[]
      }
    },
    created() {
     this.$http.get(this.URL+'/app/openCitys').then((res)=>{
         console.log(res)
         this.citys=res.data.object
     })
   },
   methods:{
     togCity(item){
         localStorage.city=item;
         this.$store.commit('setCity', item);
         this.$store.dispatch('getHotShops');
         this.$router.push({path:'/index'})
     }
   }
 }
</script>
<style>
.mor_city .citys h2{color:#999;margin:10px 0 5px;font-size:14px;font-weight:normal}
.mor_city .citys a{margin:5px 3px;display:inline-block;width:30.11%;border:1px solid #ddd;background:#fff;color:#444;border-radius:3px;min-height:42px;line-height:42px;text-align:center;}

</style>
