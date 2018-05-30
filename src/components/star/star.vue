<template>
  <span class="star grade">
     <span class="rate"><span class="rate_in" :style="'width:'+starNum"></span></span>
  </span>
</template>

<script>
export default {
  props: {
    score: {
      type: Number
    }
  },
  computed: {
    starNum() {
      return  (this.score/100*20*100)+'%';
    }/*,
    1/100*20/100
    }*/
  }
}
</script>
<style>
.grade{}
.grade span{display:inline-block;width:72px;height:12px;background:url(../../assets/images/min_ic.png) no-repeat 0px -12px;background-size:70px auto;}
.grade .rate{}
.grade .rate_in{background-position:0px 0px;}
/*top*/
</style>

