<template>
    <div class="share_order">
       <div class="cont">
            <div class="ban"> <img src="../assets/images/pin.png"> </div>
            <div class="p_btn flex">
                 <router-link :to="'/bbq?type=1'"><img src="../assets/images/p_btn.png"> </router-link>
                 <!-- <router-link :to="'/bbq?type=2'"><img src="../assets/images/p1_btn.png"> </router-link> -->
            </div>
            <div class="p_text">
                <div class="p_tit"><img src="../assets/images/p_t.png"></div> 
                <h3><i></i>AA拼单</h3>
                <p>
                    <strong>AA拼单在日常生活中应用的比较多，下面我来举个栗子：</strong></br>
                    <span>8个人小伙伴拼单烧烤，费用总计300元</span>
                    <span>则每人拼单37.5元即可（300÷8=37.5）</span>
                </p>
                <!--  <h3><i></i>吃大户</h3>
                <p>
                    <strong> 吃大户是新的拼单玩法，简单来说就是拼单 的金额为随机金额。有人拼0.2元， 有人可能拼50元。一定要玩得起才能玩儿～</strong></br>
                    <strong>下面我来举个栗子：</strong></br>
                    <span>5个人小伙伴拼单烧烤,总共150元，</span>
                    <span>小猪拼单：0.2元</span>
                    <span>小明拼单：59元</span>
                    <span>玉儿拼单：9元</span>
                    <span>飞飞拼单：31.8元</span>
                    <span>小凡拼单：50元</span>
                    <strong>（0.2+59+9+31.8+50=150元）</strong>
                </p> -->
            </div>
       </div>
    </div>
</template>

<script>

 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '一起火拼');
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
      watch:{
     $route(to,from)
     {
        console.log(to.path)
        if(to.path=='/shareOrder')
        {
            this.$store.commit('showHead', true);
        }
      
     }
  }
   
 }
</script>
<style>
.share_order{position:fixed;background:#f54840;top:51px;left:0;width:100%;bottom:0;}
.p_btn {padding:0 40px;margin:10px 0 40px; }
.p_btn a{padding:0 34%;}
.p_text{background:#fad43e;border:2px solid #000;border-radius:22px;padding:30px 20px 0 15px;width:90%;margin:0 auto 30px;position:relative;}
.p_text h3{padding-bottom:10px;font-size:16px;font-weight:bold;}
.p_text p{text-indent:1em;line-height:22px;padding-bottom: 20px;}
.p_text p span{padding-left:10px;display:block;}
.p_tit{width:45%;margin:-50px auto 0;}
.p_text h3 i{width:33px;height:24px;background:url('../assets/images/p_ic.png') no-repeat 0 0;background-size:100px auto;}
</style>
