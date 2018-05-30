<template>
    <div class="share_order my_share">
       <div class="cont">
              <div class="log_status" v-if="!userState">
                <div class="status_box">
                    <p class="gray">登录后可查看订单</p>
                    <router-link to="/login" class="mint-button--default">登录</router-link>
                </div>
             </div>
             <div class="AA_info">
                 <div class="input" v-for="(item,index) in shareList">
                      <div class="flex-auto">
                         <div class="order_pc"><img src="../assets/images/aa.png"></div>
                         <div class="order_info">
                            <div class="name flex-sb"><span>预订烧烤时间：{{item.bookTime}}</span><span :class="item.orderStatus!=='已付款'?'red':'green'">{{item.orderStatus=='已付款'?'拼单成功':item.orderStatus}}</span></div>
                            <p class="">预订地点：{{item.appStore.store_name}}</p>
                            <p class="flex-sb"><span>拼单人数：{{item.peopleNum}}人</span><span class="share" @click="share(item.id)"><button>分享给小伙伴</button></span></p>
                         </div>
                      </div>
                      <div class="AA_detail flex-sb">
                           <span>拼单详情</span>
                           <span class="red down" @click="aaDetail(item)"><span v-if="item.orderStatus!=='已付款'">还差{{item.childOrderNoPay}}人未拼单</span></span>
                      </div>
                      <div class="AA_detail yellow_bg" v-show="item.toogle">
                          <div class="flex-sb"><strong>拼单成员</strong><strong>拼单金额</strong></div>
                          <div class="flex-sb" v-for="(num,index) in item.childOrderHasPay">
                              <span><img :src="num[1]"><strong>{{num[0]}}</strong><i class="p_state" v-if="num[3]">发起</i><i class="p_state participation" v-if="!num[3]">参与</i></span>
                              <span>{{num[2]}}元</span>
                          </div>
                      </div>

                 </div>
           <!--        <div class="input">
                      <div class="flex-auto">
                         <div class="order_pc"><img src="../assets/images/cd.png"></div>
                         <div class="order_info">
                            <div class="name flex-sb"><span>预订烧烤时间：2017-05-01</span><span class="green">拼单成功</span></div>
                            <p class="">预订地点：牛王滩</p>
                            <p class="flex-sb"><span>拼单人数：8人</span><span class="share"><button>分享给小伙伴</button></span></p>
                         </div>
                      </div>
                      <div class="AA_detail flex-sb">
                           <span>拼单详情</span>
                           <span class="down"></span>
                      </div>
                 </div> 
                  <div class="input">
                      <div class="flex-auto">
                         <div class="order_pc"><img src="../assets/images/aa.png"></div>
                         <div class="order_info">
                            <div class="name flex-sb"><span>预订烧烤时间：2017-05-01</span><span class="red">拼单失败</span></div>
                            <p class="">预订地点：牛王滩</p>
                            <p class="flex-sb"><span>拼单人数：8人</span><span class="share"><button>分享给小伙伴</button></span></p>
                         </div>
                      </div>
                      <div class="AA_detail flex-sb">
                           <span>拼单详情</span>
                           <span class="down"></span>
                      </div>
                 </div> -->    
           </div>
       </div>
    </div>
</template>

<script>
import Vue from 'vue'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '我的拼单');
        vm.getMyorder()
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data(){
      return{
        toogle:false,
        shareList:[],
        userState:false
      }
    },
     mounted(){
    /*  wx.ready(function() {
       
      })*/
    },
    methods:{
      getMyorder()
      {
        if(localStorage.clientId)
        {
          this.userState=true
          this.$http({
           method:'post',
           url:this.URL+'/app/shareOrders/'+localStorage.clientId+'?token='+localStorage.token
           }).then(res=> {
             console.log(res)
             this.shareList=res.data.object
           });
        }
        
      },
      aaDetail(item)
      {
           if (!item.toogle) {
             Vue.set(item, 'toogle', true)
           }
           else
           {
             item.toogle=!item.toogle
           }
         console.log(item.toogle)
         
      }
    }
 }
</script>
<style>
.AA_info .input .flex-auto{padding:8px 0;border:none;}
.my_share .AA_info .input{padding:0;}
.my_share .AA_info .order_pc img,.my_share .AA_info .order_pc{width:80px;height:80px;}
.my_share .AA_info .order_info{padding-top:10px;}
.my_share .AA_info .order_info p{color:#000;font-size:12px;}
.my_share .AA_info .order_info button{border:2px solid #000;background:#faeb00;color:#292929;font-weight:bold;border-radius:10px 10px 10px 8px}
.my_share .AA_info .input .flex-auto{padding:8px 12px;}
.AA_detail{padding:5px 25px 5px 30px;border-top:2px solid #000;}
.AA_detail .red,.down{position:relative;padding-right:25px;}
.down:after{content:' ';display:block;position:absolute;right:0px;top:3px;width: 0;height: 0;border-left:7px solid transparent; border-right:7px solid transparent; border-top:11px solid #000;}
.my_share .AA_info .yellow_bg{background:#faeb00;border-radius:0 0 20px 20px;padding:5px 50px 5px 30px;line-height:24px;}
.my_share .AA_info .yellow_bg .flex-sb span:nth-child(1){padding-left:5px;}
.my_share .AA_info .yellow_bg .flex-sb span:nth-child(2){padding-right:12px;}
.AA_detail .flex-sb span img,.AA_detail .flex  span img{width:35px;height:35px;border-radius:50%;margin-right:5px;vertical-align:middle;}
.AA_detail .flex-sb span .p_state,.AA_detail .flex  span .p_state{font-size:10px;color:#f54840;border:1px solid #f54840;display:inline;position:relative;right:-5px;padding:0 2px;}
.AA_detail .flex-sb span .participation,.AA_detail .flex  span .participation{color:#0184fa;border:1px solid #0184fa;}
.my_share .AA_info .input span{font-size:12px;}
.my_share .AA_info .yellow_bg .flex-sb {margin-bottom:8px;}
</style>
