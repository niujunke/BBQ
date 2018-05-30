<template>
    <div class="share_order share_info">
       <div class="cont">
            <div class="ban"> <img src="../assets/images/pin.png"> </div>
            <div class="share_text">
                 <p>我是 <span class="yellow">{{shareInfo.currentUser}}</span> ，好久不见的小伙伴们， <span class="yellow">{{shareInfo.bookTime}}</span> 
一起去<span class="yellow">{{shareInfo.appStore.store_name}}</span>烧烤吧，我发起了<span class="yellow">“ AA拼单”拼单游戏</span>，我已经拼单 <span class="yellow">{{shareInfo.currentNeedPay}}元</span>了，就等你了哦～</p>
            </div>
            <div class="p_text">
                 <div class="input">
                    <div class="goodsInfo">
                      <div class="gs_tit info_list" @click="tog=!tog">消费信息 <span class="down"></span> </div> 
                      <div class="con_box" v-show="tog"  >
                          <div class="flex" v-for="item in shareInfo.goodsCarts"><span class="tl">{{item.goods.name}}</span><span class="gray">x{{item.count}}</span><span class="tr">￥{{item.goods.current_price}}</span></div>
                          <div class="package_price"><span>总计：<em class="red">￥{{shareInfo.totalPrice}}</em></span></div>
                      </div>
                    </div>
                 </div>
                 <div class="AA_detail yellow_bg" >
                          <div class="flex-sb"><strong>拼单成员</strong><strong>拼单金额</strong></div>
                          <div class="flex-sb" v-for="(num,index) in shareInfo.childOrderHasPay">
                              <span><img :src="num[1]"><strong>{{num[0]}}</strong><i class="p_state" v-if="num[3]">发起</i><i class="p_state participation" v-if="!num[3]">参与</i></span>
                              <span>{{num[2]}}元</span>
                        </div>
                </div>
                <div class="p_btn" @click="sharePay" v-if="btnTxt"><img src="../assets/images/pay.png"><div class="btn_state">需支付￥{{shareInfo.currentNeedPay}}元</div></div>
                <div class="p_btn"  v-if="!btnTxt" @click="share"><img src="../assets/images/pay.png"><div class="btn_state">分享给朋友</div></div>
            </div>
            <p class="share_txt" v-if="shareInfo.childOrderNoPay!=0">还差{{shareInfo.childOrderNoPay}}人未拼单，继续分享给你小伙伴吧～</p>
            <p class="share_txt" v-if="shareInfo.childOrderNoPay==0">恭喜拼单成功！</p>
       </div>
       <div class="share_pc" v-if="showShare" @click="showShare=false"><img src="../assets/images/guide.png"></div>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {

        vm.$store.commit('setHeadTitle', '一起拼单烧烤啦');
        vm.$store.commit('showPIN', true);
        if(vm.isPay)
        {
          vm.getShareInfo(localStorage.clientId)
        }
       
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showPIN ', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data(){
      return{
        tog:false,
        shareInfo:{},
        btnTxt:true,
        showShare:false,
        isPay:false
       }
      },
      created()
     {
      this.getShareInfo(this.$route.query.userId)
      this.SDKRegister(this)
     },
       methods:{
        getShareInfo(id)
        {
             this.$http({
             method:'post',
             url:this.URL+'/app/wxShare',
             params:{userId:id,orderId:this.$route.query.orderId}
             }).then(res=> {
               console.log(res)
               this.shareInfo=res.data.object
                if(id==localStorage.clientId)
                {
                    this.btnTxt=false
                }
                else
                {
                   this.btnTxt=true
                }
             });
        },
        sharePay()
        {

         
          if(localStorage.clientId)
          { 
               let that=this
               this.$http({
               method:'post',
               url:this.URL+'/app/shareOrderWxPay',
               params:{userId:localStorage.clientId,sn:this.shareInfo.childOrderId}
               }).then(res=> {
                  console.log(res)
                  if(res.data.code==0)
                  { 
                      wx.chooseWXPay({
                          timestamp:res.data.object.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                          nonceStr:res.data.object.nonceStr, // 支付签名随机串，不长于 32 位
                          package:res.data.object.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                          signType:res.data.object.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                          paySign:res.data.object.paySign, // 支付签名
                          success: function (res) {
                              // 支付成功后的回调函数
                               that.isPay=true
                               that.getShareInfo(localStorage.clientId)
                              console.log(res)
                          } 
                      });
                  }
               })
          }
          else
          {
             localStorage.url='#'+window.location.href.split('#')[1]
             this.$router.replace({path:'/login'})
             this.$router.push({path:'/login'})             
          }
          
        }, 
       share()
       {
          this.showShare=true
          let that=this
          wx.onMenuShareAppMessage({
          title: '一起去烧烤吧！', // 分享标题
          desc: '我是'+that.shareInfo.currentUser+'一起去'+that.shareInfo.appStore.store_name+'烧烤吧!就等你了哦～', // 分享描述
          link: 'http://www.dakaoguan.com.cn/wap/#/AA_share?orderId='+that.$route.query.orderId+'&userId='+localStorage.clientId, // 分享链接
          imgUrl: 'http://www.dakaoguan.com.cn/upload/activity/icon.jpg', // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function() {
          // 用户确认分享后执行的回调函数
             console.log('ok')
          },
          cancel: function() {
          // 用户取消分享后执行的回调函数
          }
         });
       }
    }
 }
</script>
<style>
.share_text{padding:10px 22px;margin-bottom:10px;line-height:24px;text-decoration: underline;font-size:16px;}
.share_info .input{background:#fff;border-radius:20px 20px 0 0}
.share_info .p_text{padding:0}
.share_info .AA_detail{padding:10px 50px;}
.share_info .AA_detail .flex-sb{margin-top: 10px}
.share_info .AA_detail .flex-sb:nth-child(1){margin:0;}
.share_info .AA_detail .my{font-size:18px;color:#ff0000;}
.share_info .p_text .p_btn{margin:5px auto -20px;position:relative;width:168px;height:56px;padding:0;}
.share_info .p_text .p_btn img{width:168px;height:56px;}
.share_info  .share_txt{text-align:center;margin-bottom:30px;font-weight:bold;font-size:12px;}
.share_info .p_text .info_list .down{top:10px;float:right}
.btn_state{position:absolute;top:0;left:0;width: 100%;text-align: center;margin-top:18px;font-size:16px;font-weight:bold}
.share_pc{position:fixed;background: rgba(0,0,0,0.7);top:0;left:0;width:100%;bottom:0;text-align: center;;padding-top: 50px;z-index:1000}
</style>
