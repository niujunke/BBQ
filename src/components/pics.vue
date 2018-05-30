<template>
  <div class="pcs">
      <!--  <ul class="pc_list">
            <li >
              <div class="bq_pc"><img :src="URL+'/'+item" ></div>
                <see-box>
                    <see-item v-for="(item,index) in photos" :key="index" :img="URL+'/'+item"></see-item>
                </see-box>
            </li>
       </ul> -->
        <div class="pc_list">
              <see-box >
                <see-item class="bq_pc" v-for="(item,index) in photos" :key="index" :img="URL+'/'+item"></see-item>
              </see-box>
        </div>
              
      
  </div>
</template>
<script>

import {mapGetters}from 'vuex'
 export default{
  computed:mapGetters(['photos']),
 	beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('setHeadTitle', '烧烤相册');
        vm.$store.commit('showRank', true);
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    }
 }
    
</script>
<style>
.pc_list{padding:26px;display:flex;}
.pc_list .bq_pc {width:47%;margin-bottom:6%;}
.pc_list .bq_pc:nth-child(odd){margin-right:2%;float:left;}
.pc_list .bq_pc:nth-child(2n){float:right}
.bq_pc img{width:100%;height:160px;}

</style>
