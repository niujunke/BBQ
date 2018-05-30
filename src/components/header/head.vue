<template>
   <div class="header">
    <rank-head v-if="head.toggle" :title="head.title" :style="head.style" :ishow="head.rank" :isPay="head.isOk" :seachShow="head.isSch" :css="head.show" :isShare="head.isShare"></rank-head>
    <head-top v-else :cityName="head.cityName"></head-top>
  </div>
</template>

<script>
import rankHead from './rank-head'
import headTop from './head-top'
import { mapGetters } from 'vuex'
export default {
  computed:mapGetters(['head']),
  components:{
    rankHead,headTop
  }
}
</script>
