<template>
  <div class="refund">
        <ul class="order_status">
             <li v-for="(item,index) in states">
               <i></i>
               <span>{{item.logInfo}}</span>
               <span class="gray" v-if="index==0">请支付订单</span>
               <span class="gray">{{item.createTime|time}}</span>
             </li>
      <!--     <li>
               <i></i>
               <span>支付成功</span>
               <span class="gray">2017-03-09 18:20</span>
             </li>
              <li>
               <i></i>
               <span>食材准备完毕，等待配送</span>
               <span class="gray">2017-03-09 18:20</span>
             </li>   -->         
        </ul>
  </div>
</template>

<script>
export default {
 beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getState()
      });
    },
  data () {
    return {
      states:[]
    }
  },
  methods:{
    getState()
    {
       this.$http.post(this.URL+'/app/orderRecord/'+this.$route.params.id).then((res)=>{
         console.log(res)
         this.states=res.data.object
       })
    }
  }
}
</script>
<style>
.order_status{padding:0 20px 20px;}
.order_status li{padding:20px 0 20px 0px;border-left:1px solid #05c981;margin-left:14px;position:relative;line-height:20px;}
.order_status li i{ vertical-align:top;display:inline-block;width:12px;height:12px;text-align:center;line-height:22px;background:#05c981;color:#fff;border-radius:50%;margin-right:10px;position:absolute;left:-6px;}
.order_status li span{display:block;padding-left:30px;}
.order_status li span.gray{color:#7d7d7d;font-size:12px;}
.order_status li:last-child{padding-bottom:20px;border:none;padding:0;}
.order_status li:nth-child(1){padding:20px 0 20px 0px !important;border-left:1px solid #05c981 !important;}
</style>
