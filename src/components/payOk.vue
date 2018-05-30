<template>
    <div class="confirmpay">
           <div class="payOk">
              <div class="ewm">
                   <p><i></i>支付成功</p>
                   <img :src="URL+'/'+ewm.qrcode">
                   <p>{{ewm.verifyCode}}</p>
              </div>
              <div class="delivery_info">
                   <p><span>送货信息</span>我们将尽快安排发货，请买家保持手机通讯畅通，以便快递小哥第一时间联系到您。</p>
                   <div class="flex-sb">
                      <router-link :to="'/detail/'+storeId" replace>继续选购</router-link>
                      <router-link :to="'/order/orderDetail/'+orderId+'?name='+name" replace>查看订单</router-link>
                   </div>
              </div>
         </div>
         <div class="caution"><i></i>安全提醒：请谨防钓鱼链接或诈骗电话</div>
    </div>
</template>

<script>
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showOk', true);
        vm.$store.commit('setHeadTitle', '支付订单');
        vm.getMa()
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showOk', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    created(){
        //this.getMa()
    },
    data()
    {
      return{
            orderId:this.$route.query.id,
            name:this.$route.query.name,
            storeId:this.$route.query.storeId,
            ewm:{}
           }
    },
    methods:{
      getMa()
      {
        
         this.$http({
             method:'post',
             url:this.URL+'/app/getQRCode',
             params:{orderId:this.$route.query.id}
             }).then(res=> {
              console.log(res)
              this.ewm=res.data.object
             });
      }
  }
 }
</script>
<style>
.confirmpay{position:fixed;height:100%;top:51px;bottom:0;background:#f3f5f7}
.payOk{background:#fff;padding:10px 20px;}
.ewm{text-align:center;font-size:18px;border-bottom:1px solid #d2d2d2;padding-bottom:10px;}
.ewm i{width:25px;height:28px;background:url('../assets/images/ok.png') no-repeat;background-size:25px auto;}
.ewm img{width:120px;height:120px;margin:5px 0 10px;}
.delivery_info{padding:10px 15px;}
.delivery_info p span{font-size:18px;padding-bottom:5px;display:block;}
.delivery_info p{line-height:22px}
.delivery_info a{padding:10px 0px;border:1px solid #dcdcdc;color:#999;border-radius:5px;display:inline-block;margin:15px 10px;width:36%;text-align:center;}
.delivery_info a:nth-child(1){color:#21c883;border-color:#21c883}
.caution{color:#999;padding:10px 25px;}
.caution i{width:14px;height:16px;background:url('../assets/images/icons.png') no-repeat 0 -19px;background-size:68px auto;}
</style>
