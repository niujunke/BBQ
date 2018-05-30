<template>
    <div class="salePrice voucher">
       <ul>
          <li v-for="item in vouchers">
            <div class="flex-auto">
                 <div class="voucher_price green"><p>￥ <span>{{item.appCoupon.coupon_amount}}</span></br>抵用券</p></div>
                 <div class="voucher_info">
                    <div class="name flex-sb"><h3>{{item.appCoupon.coupon_name}}</h3></div>
                    <p>满10元可用、限新用户使用</p>
                 </div>
            </div>
            <p class="validity">有效期：{{item.appCoupon.coupon_begin_time}} 至 {{item.appCoupon.coupon_end_time}}</p>
          </li>
       </ul>
       <p class="emt" v-if="!vouchers">暂无可用优惠券</p>
    </div>
</template>

<script>
import { Badge } from 'mint-ui'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '我的抵用券');
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
         vouchers:[]
       }
    },
    created() {
     this.$http.post(this.URL+'/app/coupon/'+localStorage.clientId).then((res)=>{
         console.log(res)
         this.vouchers=res.data.object
     })
   },
 }
</script>
<style>
.voucher ul{padding:20px 15px 0;}
.voucher li{border-radius:5px;background:#fff;box-shadow:0 0 5px rgba(217,217,217,0.1)}
.voucher_price{width:100px;text-align: center;display:flex;align-items: center;justify-content:center;padding:8px 0;background:url('../assets/images/j.jpg') no-repeat right 0px;background-size:8px 100%;}
.voucher_price span{font-size:22px;}
.voucher .flex-auto{padding: 0}
.voucher_info{flex:1;line-height:20px;padding:13px 14px 8px 10px;}
.voucher_info p{font-size:12px;color:#b0b0b0;}
.voucher li .validity{padding:7px 10px;color:#ff9600;font-size:12px;border-radius:0 0px 5px 5px;background:#f3f3f3 url('../assets/images/jb.jpg') no-repeat 88px bottom;background-size:14px 100%;}
.emt{text-align:center;padding-top:20%;}
</style>
