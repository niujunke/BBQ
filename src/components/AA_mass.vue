<template>
    <div class="share_order share_info share_mass">
       <div class="cont">
            <div class="ban"> <img src="../assets/images/pin.png"> </div>
            <div class="share_text">
                 <p>我是 <span class="yellow">张柯</span> ，好久不见的小伙伴们， <span class="yellow">5月1日</span> 假
一起去<span class="yellow">牛王滩烧烤</span>吧，我发起了<span class="yellow">“吃大户”拼单游戏</span>，我已经拼单 <span class="yellow">35元</span>了，看你拼多少钱,就等你了哦～</p>
            </div>
            <div class="p_btn" @click="pay()"><img src="../assets/images/c_btn.png"><div class="t"><img src="../assets/images/txt.png"></div> </div>
            <div class="p_text">
                 <div class="input">
                    <div class="mass_txt">
                      <h3><i></i>什么是吃大户</h3>
                      <p>
                         吃大户是新的拼单玩法，简单来说就是拼单 的金额为随机金额。有人拼0.2元， 有人可能拼50元。一定要玩得起才能玩儿～
                      </p>
                    </div>
                    <div class="goodsInfo">
                      <div class="gs_tit info_list" @click="tog=!tog">消费信息 <span class="down"></span> </div> 
                      <div class="con_box" v-show="tog">
                          <div class="flex"><span class="tl">羊肉串</span><span class="gray">x1</span><span class="tr">￥10</span></div>
                          <div class="flex"><span class="tl">羊肉串</span><span class="gray">x1</span><span class="tr">￥10</span></div>
                          <div class="flex"><span class="tl">羊肉串</span><span class="gray">x1</span><span class="tr">￥10</span></div>
                          <div class="package_price"><span>总计：¥5</span><span>实付：<em class="red">￥5</em></span></div>
                      </div>
                    </div>
                 </div>
                 <div class="AA_detail yellow_bg" >
                          <div class="flex"><strong>拼单成员</strong><strong>拼单金额</strong></div>
                          <div class="flex"><span>王小</span><span>35元</span></div>
                          <div class="flex"><span>王小五</span><span>35元</span></div>
                          <div class="flex"><span>王小五</span><span>35元</span></div>
                          <div class="flex"><span>王小五</span><span>35元</span></div>
                          <div class="flex my"><span>我</span><span>35元</span></div>
                </div>
            </div>
            <p class="share_txt">还差4人未拼单，继续分享给你小伙伴吧～</p>
            <div class="game" v-show="ispay" :class="{'bounceInDown':ispay}">
                 <div class="c_ban"> <img src="../assets/images/c_ban.png"> </div>
                 <ul class="pk" v-show="!cPay">
                    <li v-for="(item,index) in 6">
                      <div class="pk_box" @click="pkTog(index)" :style="'height:'+height+'px'">
                          <div class="flip" :class="index!==now?'out':'in'" ><img src="../assets/images/pk.png" ref="pic"></div> 
                          <div class="flip" :class="index==now?'out':'in'"><div class="pk_txt"><img src="../assets/images/pt.png"><p><strong>0.01</strong>元</p></div></div> 
                      </div>
                    </li>                   
                 </ul>
                 <div class="pay_pce" :class="{'zoomIn':cPay}" v-show="cPay">
                   <div class="pay_pk  pk_txt"><img src="../assets/images/c_pay.png"><p><strong>0.01</strong>元</p></div>
                   <div class="p_btn"><img src="../assets/images/c_pt.png"></div>
                </div>
            </div>
       </div>
    </div>
</template>

<script>
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '一起拼单烧烤啦');
        
        
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      
      next()
    },
    data(){
      return{
        tog:false,
        swh:false,
        pks:[0,1,2,3,4,5],
        height:null,
        now:null,
        cPay:false,
        ispay:false
      }
    },
  mounted(){
   
  },
    methods:{
      pay()
      {
        this.ispay=true
        this.setH()
      },
      pkTog(index)
      {
         console.log(index)
         this.now=index
         setTimeout(()=>{
           this.cPay=true
         },1000)
      },
      setH()
      {
         this.$nextTick(() => {
          if(this.$refs.pic[0].offsetHeight){
             this.height=this.$refs.pic[0].offsetHeight
             console.log(this.height)
           }
         })
      }
    }
 }
</script>
<style>
.share_mass .mass_txt{padding:50px 20px 15px;border-bottom:2px solid #000}
.share_mass .mass_txt p{padding:0}
.share_mass .p_text{margin-bottom:12px;}
.share_mass .p_text .mass_txt h3{padding:0}
.share_mass .p_btn{text-align: center;position:relative;padding:0 37%;margin-bottom:0px;top:6%;margin-top:-40px;z-index:10;}
.t{position:absolute;top:-16px;right:24%;width:15%;}
.game{position:fixed;top:51px;left:0;bottom:0;width:100%;background:rgba(0,0,0,0.9);z-index:1200;padding:15px 30px;}
.pk li {width:33%;float:left;padding:10px 10px 5px;}
.pk li .pk_box{position:relative;perspective:700;-webkit-perspective:700;width:100%;}
.pk li .flip{position:absolute;}
.pk li .pk_txt,.pay_pce .pk_txt{color:#000;text-align:center;position:relative;}
.pk li .pk_txt p{position:absolute;top:40%;left:16%;font-size:16px;}
.pk li .pk_txt strong{font-size:24px;}
.pay_pk{padding:0 22%;}
.pay_pce .p_btn{margin-top:25px;padding:0 20%;}
.pay_pce .pk_txt p{position:absolute;top:44%;left:30%;font-size:24px;}
.pay_pce .pk_txt strong{font-size:56px;}

.flip {-webkit-backface-visibility: hidden; backface-visibility: hidden;}
.flip.out {transform: rotateY(0deg) ;-webkit-animation:flipout 0.3s ease-out;animation:flipout 0.3s ease-out;z-index: 1; }
.flip.in {-webkit-animation:flipin 0.3s ease-in;animation:flipin 0.3s ease-in;}

@-webkit-keyframes flipout {
    from { -webkit-transform: rotateY(-90deg) scale(0.9); }
    to { -webkit-transform: rotateY(0deg) ; }
}
@keyframes flipout {
    from { transform: rotateY(-90deg) scale(0.9); }
    to { transform: rotateY(0deg) ; }
}
@-webkit-keyframes flipin {
    from { -webkit-transform: rotateY(0); }
    to { -webkit-transform: rotateY(90deg) scale(.9); }
}
@keyframes flipin {
    from { transform: rotateY(0); }
    to { transform: rotateY(90deg) scale(.9); }
}
.zoomIn{-webkit-animation:zoomIn .2s ease;animation:zoomIn .2s ease}
@-webkit-keyframes zoomIn{
  0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}
  50%{opacity:1}}
@keyframes zoomIn{
  0%{opacity:0;-webkit-transform:scale3d(.3,.3,.3);transform:scale3d(.3,.3,.3)}
  50%{opacity:1}}
  @-webkit-keyframes bounceInDown{
    0%,100%,60%,75%,90%{
      -webkit-animation-timing-function:cubic-bezier(0.215,.61,.355,1); animation-timing-function:cubic-bezier(0.215,.61,.355,1)
       }
    0%{
        opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)
      }
    60%{
      opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)
      }
    75%{
      -webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)
     }
    90%{
       -webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)
     }
    100%{
      -webkit-transform:none;transform:none
    }
}
.bounceInDown{-webkit-animation:bounceInDown .6s ease-in-out;animation:bounceInDown .6s ease-in-out}
@keyframes bounceInDown{
  0%,100%,60%,75%,90%{
    -webkit-animation-timing-function:cubic-bezier(0.215,.61,.355,1);animation-timing-function:cubic-bezier(0.215,.61,.355,1)
  }
  0%{
    opacity:0;-webkit-transform:translate3d(0,-3000px,0);transform:translate3d(0,-3000px,0)
  }
  60%{
    opacity:1;-webkit-transform:translate3d(0,25px,0);transform:translate3d(0,25px,0)
  }
    75%{
      -webkit-transform:translate3d(0,-10px,0);transform:translate3d(0,-10px,0)
    }
    90%{
      -webkit-transform:translate3d(0,5px,0);transform:translate3d(0,5px,0)
    }
    100%{
      -webkit-transform:none;transform:none
    }
}
</style>
