<template>
    <div class="payDetail pd_bot">
         <mt-cell title="添加地址" is-link :to="'/newAdd'" v-if="!orders.appAddress&&value!='自提'"> </mt-cell>
         <mt-cell :title="orders.appAddress.appArea.parentAreaName+orders.appAddress.appArea.areaName+orders.appAddress.area_info" :label="orders.appAddress.trueName+' '+orders.appAddress.mobile" is-link v-if="orders.appAddress&&value=='送货'" to="/userAdd"></mt-cell>
          <mt-cell :title="orders.appShipAddress.appArea.parentAreaName+orders.appShipAddress.appArea.areaName+orders.appShipAddress.area_info" :label="orders.appShipAddress.mobile" is-link v-if="value=='自提'" ></mt-cell>
         <mt-cell title="预订时间" :value="this.$route.query.date"></mt-cell>
         <mt-radio title="配送方式" align="right" v-model="value"  :options="['自提', '送货']"></mt-radio>
         <div class="divider"></div>
         <mt-cell title="支付方式" value="在线支付"></mt-cell>
         <mt-cell title="优惠红包" is-link> <span class="gray">暂无优惠</span></mt-cell>
         <div class="divider"></div>
         <consumer-list :cars="orders.appStoreCart" :tablewares="orders.tablewares"></consumer-list>
         <div class="divider"></div>
         <div class="goodsInfo">
          <div class="remark">
                 <span>备注：</span>
                 <textarea placeholder="口味，偏好等要求" v-model="msg" ></textarea>
           </div>
         </div>
         <bottom-but :toOrder="toPay" :pice="orders.appStoreCart.total_price" :msg="msg" :value="value"></bottom-but>
    </div>
</template>

<script>
import { Cell,Radio } from 'mint-ui';
import bottomBut from './bottomBut/bottom_but'
import consumerList from './consumerLists/consumerLists'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '支付详情');
        vm.getGoods()
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
         value:'送货',
         orders:{},
         msg:'',
         toPay:{
            cartSession:'',
            addrId:null,
            couponId:'',
            userId:localStorage.clientId,
            storeId:null,
            shipAddressId:null

         }
      }
    },
    components:{
      bottomBut,
      consumerList
    },
    methods:{
      getGoods()
      {
          
          this.$http({
             method:'post',
             url:this.URL+'/app/cartCommit',
             params:{userId:localStorage.clientId,storeId:this.$route.query.id,transportType:this.value=='送货'?1:0,token:localStorage.token}
             }).then(res=> {
              this.orders=res.data.object
               console.log('提交购物车')
               console.log(res.data.object)
              this.toPay.cartSession= this.orders.cartSession
              this.toPay.storeId=this.$route.query.id
              this.toPay.addrId=res.data.object.appAddress?res.data.object.appAddress.id:'' 
              this.toPay.shipAddressId=res.data.object.appShipAddress?res.data.object.appShipAddress.id:'' 
             });
      }
    }
 }
</script>
<style>
.payDetail .mint-cell-wrapper{font-size:14px;}
.payDetail .mint-radio-input:checked + .mint-radio-core{border-color:#05c981;background:#05c981}
.payDetail .mint-radiolist-title{font-size:14px}
.goodsInfo{line-height:40px;}
.info_list{padding:0 15px;border-bottom:1px solid #ddd;}
.shoop_name{color:#b6b5b5;}
.shoop_name i{width:15px;height:20px;background:url('../assets/images/icons.png') no-repeat;background-size:70px auto;}
.gs_tit{text-align:center;}
.package_price{text-align:right;padding:0 10px;border-top:1px solid #ddd;}
.package_price span{padding-left:30px;}
.goodsInfo .flex .tl{text-align:left;padding:8px 0 0 15px;line-height:24px;}
.goodsInfo .flex .tr{text-align:right;padding-right:15px;}
.remark{padding:0 15px 30px;}
.remark textarea{width:100%;height:80px;padding:5px 10px;resize: none;border:1px solid #ddd;}
</style>
