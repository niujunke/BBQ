<template>
    <div class="feedback">
          <div class="remark">
                 <textarea placeholder="有问题或建议，请告知我们~" v-model="msg" ></textarea>
         </div>   
        <div class="btn">
         <mt-button type="default" size="large" @click="quit">提交</mt-button>
        </div>
    </div>
</template>

<script>
import { Button } from 'mint-ui';
import bottomBut from './bottomBut/bottom_but'
import consumerList from './consumerLists/consumerLists'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '产品反馈');
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
         msg:'',
      }
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
.feedback .remark{margin-top: 20px;}
.feedback .remark textarea{height:140px;}
.feedback .btn{margin:0;}
</style>
