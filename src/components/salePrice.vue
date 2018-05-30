<template>
    <div class="salePrice">
       <div class="ban"><img src="../assets/images/tj.jpg"></div>
       <div class="time flex-sb">
            <p class="">截止日期：{{endTime?endTime:已过期|time}}</p>
            <count-down :endTime="endTime" :callback="callback" endText="活动已经结束了" ref="time"></count-down>
       </div>
       <div class="shops" v-for="(key,value) in saleGoods">
            <div class="shop_name">{{value}}</div>
            <ul>
              <li v-for="list in key">
                 <a :href="'#/detail/'+list.storeId">
                    <div class="flex-auto">
                         <div class="order_pc"><img :src="URL+'/'+list.goodsImg"></div>
                         <div class="order_info">
                            <div class="name flex-sb"><h3>{{list.goodsName}}</h3></div>
                           
                            <div class="gray flex-sb"><span class="red">每单限{{list.limitCount}}份</span><span>库存：{{list.count}}份</span></div>
                            <div class="price flex-sb red"><span>￥<i>{{list.currentPrice}}</i><span class="old_pice">￥{{list.storePrice}}</span></span><span class="state"><router-link  :to="'/detail/'+list.storeId">立即预定</router-link></span></div>

                         </div>
                    </div>
                 </a>
              </li>
           </ul>
       </div>

    </div>
</template>

<script>
import countDown from './time/countDown'
import { Badge } from 'mint-ui'
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '每日特价');
        vm.getSaleGoods()
        
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    components: {
    countDown
  },
  data(){
    return{
      saleGoods:{},
      endTime:null,
      startTime:null
    }
  },
  methods:{
      getSaleGoods()
      {
        this.$http.get(this.URL+'/app/saleGoods?city='+localStorage.city).then((res)=>{
             console.log(res)
             this.saleGoods=res.data.object
             console.log(Object.values(this.saleGoods)[0])
             var end=null
             var start=null
             for(var i=0;i<Object.values(this.saleGoods)[0].length;i++)
             {
                 end=Object.values(this.saleGoods)[0][0].endTime
             }
             console.log(end)
             this.endTime=end
             this.$refs.time.countdowm(this.endTime)
         })
      },
      callback(){

      }
  }
 }
</script>
<style>
.salePrice .order_pc,.salePrice .order_pc img{width:151px;height:102px;}
.salePrice .order_info .gray{margin:10px 0;font-size:12px;}
.salePrice .order_info p{}
.price i{font-size:22px;}
.salePrice .price a{border-color:#ff0000;background:#ff0000;color:#FFF;padding:4px 10px;border-radius:3px;}
.salePrice .flex-auto{border:none;}
.salePrice .price .old_pice{color:#999;text-decoration: line-through;padding-left:10px;}
.shop_name{padding:6px 0 6px 10px;border-left:3px solid #05c981;margin:5px 0;background:#fafafa;}
.salePrice .order_info .end_time{color:#eb5b13;} 
.salePrice .time{line-height:40px;background: #f5cd2e;font-size:13px;}
.salePrice .time *{padding:0 1%;}
.salePrice .time p{background:#555;color:#fff;}

</style>
