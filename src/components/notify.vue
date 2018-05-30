<template>
    <div class="notify">
       <div class="ban"><img src="../assets/images/xz.jpg"></div>
       <div class="notify_cont">
           <h3 class="red"><i></i>野外烧烤的注意事项</h3>
           <div class="text">
                 <p>1.防火：选择烧烤场地时要远离易燃物，靠近水源，并 用水桶容器备水，放在烤炉旁，以防万一。</p>
                 <p>2.防烫伤：在户外烧烤时，烤炉固定条件差，所以不要在烧烤区打闹嬉戏。烤炉本身温度很高，千万不要触摸。</p>
                 <p>3.保护环境卫生，垃圾离开时清理带走。</p>
           </div>
       </div>
        <div class="notify_cont">
           <h3 class="red"><i class="i2"></i>烧烤秘籍</h3>
           <div class="text">
                 <p>1.按照说明书组装烧烤炉,烧烤炉要放平,风门在上风口。</p>
                 <p>2.将木炭堆成堆加助燃剂,碳自身燃烧后再均匀摊开,事先准备只电吹风,炭火不好引燃时能派上用场。</p>
                 <p>3.在烧烤食物前,先将烤架上刷一层油,以免食物粘在架上。随时用铁刷刷掉烤架上的残渣,保持烤架清洁,才不会影响到食物的风味。</p>
                 <p>4.烧烤时注意人不要站在下风口,一来烟大,二来飞出的火星很容易烫伤人。</p>
           </div>
       </div>
    </div>
</template>

<script>
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '烤场须知');
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
.notify_cont{border-bottom:1px solid #a0a0a0;}
.notify_cont h3{padding-bottom:16px;font-size:18px;}
.notify_cont h3 i{display: inline-block;width:19px;height:22px;background:url('../assets/images/min_ic.png') no-repeat -27px -49px;background-size:66px auto;vertical-align:middle;margin-right:5px;}
.notify_cont h3 i.i2{background-position:-46px -49px; }
.notify_cont{padding:15px 20px;line-height:20px;}
.notify_cont p{padding-bottom:5px;}
.notify .notify_cont:last-child{border:none;}
</style>
