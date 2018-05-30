<template>
    <div class="share_order">
       <div class="cont">
           <div class="AA_info">
               <div class="input flex-sb">
                    <span>预订游玩日期：</span>
                    <input type="text" name="" :value="aaInfo.bookTime">
               </div>
                 <div class="input flex-sb">
                    <span>预订烧烤地点：</span>
                    <input type="text" name="" :value="aaInfo.appStore.store_name">
               </div>
                 <div class="input flex-sb">
                    <span>烧烤人数：</span>
                    <input type="number" name="" placeholder="请输入拼单人数" v-model="num" @keyup="getorderShare" :disabled="chang">
               </div>
              <div class="hint text_r"><span class="yellow caution"><i></i>提示：</span>{{num?num:0}}人<span class="yellow">拼单预计人均拼单金额</span>{{shareInfo.ammount?shareInfo.ammount:0}}元 <span class="yellow">左右</span> </div> 
               <div class="input">
                    <div class="goodsInfo">
                      <div class="gs_tit info_list">消费信息</div> 
                      <div class="flex" v-for="item in aaInfo.goodsCarts"><span class="tl">{{item.goods.name}}</span><span class="gray">x{{item.count}}</span><span class="tr">￥{{item.goods.current_price}}</span></div>
                      <div class="package_price"><span>总计：<em class="red">¥{{aaInfo.totalPrice}}</em></span></div>
                    </div>
               </div>
               <div class="pay_btn">
                    <mt-button type="default" size="large" @click="sharePay">需支付￥{{shareInfo.ammount?shareInfo.ammount:0}}</mt-button>
                    <div class="hint"><span class="yellow caution"><i></i>提示：</span>拼单有效期为预定日期24小时之前，过期则拼单失败。</div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {MessageBox} from 'mint-ui';
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', 'AA拼单');
        vm.getShareInfo()
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data()
    {
      return{
        aaInfo:{},
        num:'',
        shareInfo:{
          id:'',
          ammount:''
        },
        chang:false
      }
    },
     created()
    {
      this.SDKRegister(this)
    },
    methods:{
      getShareInfo()
      {
         this.$http({
           method:'post',
           url:this.URL+'/app/orderShareInfo',
           params:{userId:localStorage.clientId,orderId:this.$route.query.id}
           }).then(res=> {
            console.log(res)
             this.aaInfo=res.data.object
           });
      },
      getorderShare()
      {
         this.$http({
           method:'post',
           url:this.URL+'/app/orderShare',
           params:{userId:localStorage.clientId,orderId:this.$route.query.id,peopleNum:this.num}
           }).then(res=> {
             if(res.data.object.id)
             {
                 this.shareInfo.id=res.data.object.id
                 this.shareInfo.ammount=res.data.object.ammount
                 this.chang=true
             }
            
           });

      },
      sharePay()
      {
        if(this.num<2)
        {
           MessageBox('提示', '烧烤人数不能低于2位');
           return false
        }
          let that=this
          this.$http({
           method:'post',
           url:this.URL+'/app/shareOrderWxPay',
           params:{userId:localStorage.clientId,sn:this.shareInfo.id}
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
                          that.$router.push({path:'/AA_share?orderId='+that.$route.query.id+'&userId='+localStorage.clientId})
                          console.log(res)
                             this.num=''
                            this.shareInfo.ammount=''
                            this.chang=false
                      } 
                  });
              }
           })
        /*this.$router.push({path: '/my_share?id='+this.$route.query.id})*/
       
      }   
    }
 }
</script>
<style>
.AA_info{padding:20px;}
.AA_info .input{background:#fff;border:2px solid #000;border-radius:20px;padding:8px 20px 8px 18px;margin-bottom:15px;}
.AA_info .input span{font-size:16px;}
.AA_info .input input{border:none;text-align:right;font-size:16px;flex:1;width:100%;}
.AA_info .hint{color:#fff;margin-bottom: 20px;font-size:12px;}
.AA_info .text_r{text-align:right;margin-top:-5px;padding-right:10px;}
.AA_info .caution{padding:0;}
.AA_info .caution i{background-position:-35px -25px}
.pay_btn{padding:0 10px;}
.pay_btn button{background:#faeb00;color:#000;border:2px solid #000;border-radius:20px 16px 16px 16px;margin-bottom:8px;box-shadow:0 -6px 2px #d7cb0e inset;}
 input[disabled]{background:#fff;}
</style>
