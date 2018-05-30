<template>
    <div class="confirmpay">
          <div class="info_list remind">
             <span><i></i>公告：</span>
             <span>确认支付后此订单无法全额退单,需缴纳<em class="red">20%</em>的材料损失费</span>
          </div>
         <div class="divider"></div>
         <div class="info_list pay_price">
             <span><img :src="URL+'/'+Pays.storeLogo"></span>
             <span class="item_center"><strong>¥{{Pays.totalPrice}}</strong></br>{{Pays.storeName}}</span>
          </div>
         <div class="divider"></div>
         <mt-cell title="微信支付">
           <i class="radio cur"> </i>
           <img slot="icon" src="../assets/images/wx.png" width="24" height="24">
          </mt-cell>
        <div class="btn">
         <mt-button type="default" size="large" @click="goPay()">确认支付 <span>￥{{Pays.totalPrice}}</span></mt-button>
        </div> 
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import { Cell } from 'mint-ui';
import { mapGetters } from 'vuex'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '支付订单');
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    created()
    {
      this.SDKRegister(this)
    },
    computed:mapGetters(['Pays']),
    methods:{
       goPay()
       {
          let that=this
          this.$http({
           method:'post',
           url:this.URL+'/app/wxpay',
           params:{userId:localStorage.clientId,sn:this.Pays.orderId}
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
                          that.$router.push({path:'/payOk?id='+that.Pays.orderId+'&name='+that.Pays.storeName+'&storeId='+that.$route.query.storeId})
                          console.log(res)
                      } 
                  });
              }
           })
           //
       }
    }
 }
</script>
<style>
.confirmpay{position:fixed;height:100%;top:51px;bottom:0;width:100%;background:#f3f5f7}
.confirmpay .info_list{padding:10px 15px;border:none;display:flex;line-height:20px;background:#fff;}
.confirmpay .info_list span:nth-child(1){width:74px;}
.confirmpay .info_list span:nth-child(2){flex:1;}
.item_center{padding-top:10px;}
.pay_price img{border-radius:50%;width:60px;height:60px;}
.remind i{width:22px;height:21px;background:url('../assets/images/icons.png') no-repeat -15px 1px;background-size:70px auto;}
.mint-cell .radio,.add_handle .radio{width:20px;height:20px;border-radius:50%;border:1px solid #c7c5c5}
.mint-cell .radio.cur,.add_handle .radio.cur{background:url('../assets/images/icons.png') no-repeat -38px -1px;background-size:70px auto;border:none;}
.confirmpay .btn .mint-button--default{font-size:14px;}
.confirmpay .btn .mint-button--default span{font-size:16px;}
</style>
