<template>
  <div>
       <div class="goodsInfo">
            <div class="flex-sb shoop_name info_list"><span><i></i>{{cars.appStore.store_name}}</span><span>烧烤清单</span></div>
            <div class="gs_tit info_list">消费信息</div>
            <div class="block"  v-for="(item,index) in cars.goodsCarts">
                 <div class="goods_list">
                     <div class="flex" @click="isCombin(item,item.goods.combin_goods)"><span class="tl " :class="{'down':item.goods.combin_goods!=null}">{{item.goods.name}}</span><span class="gray">x{{item.count}}</span><span class="tr">￥{{item.totalPrice}}</span></div>

                      <div class="flex combin" v-for="combin in item.goods.combin_goods" v-show="item.toogle">
                        <span class="tl">{{combin.name}}</span>
                        <span class="gray">x{{combin.combin_count}}</span>
                        <span class="tr">￥{{combin.current_price}}</span>
                      </div>
                       <div class="flex combin" v-for="tablewares in item.goods.tablewares" v-show="item.toogle">
                        <span class="tl">{{tablewares.name}}</span>
                        <span class="gray">x{{tablewares.combin_count}}</span>
                        <span class="tr">￥{{tablewares.current_price}}</span>
                      </div>
                 </div>
            </div>
           <!--  <div class="package_price"><span>原价：{{pice}}</span><span>套餐价： <em class="red">{{pice}}</em></span></div> -->
       </div>
       <div class="divider"></div>
        <div class="goodsInfo">
            <div class="gs_tit info_list">租赁信息</div>
            <div class="flex" v-for="item in getRent[0]"><span class="tl ">{{item.name}}</span><span class="gray tl">x{{item.combin_count}}</span></div>
            <div class="package_price"><span class="tl"></span><span></span><span >押金：<em class="red">￥{{cars.deposit?cars.deposit:0}}</em></span><span class=" tr">租金：<em class="red">￥{{cars.tablewarePrice?cars.tablewarePrice:0}}</em></span></div>
       </div>
       <div class="divider"></div>
       <div class="goodsInfo">
           <div class="flex"><span class="tl">配送费</span><span class=" tr">¥{{cars.freight?cars.freight:0}}</span></div>
           <div class="package_price"><span>总计：¥{{cars.total_price}}</span><span>实付：<em class="red">￥{{cars.total_price}}</em></span></div>
           
       </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    cars:Object,
    tablewares:Array
  },
  computed:{
    getRent()
    {
      let arr=[]
      if(this.tablewares.length!=0)
      {
        arr.push(this.tablewares[0].goods.combin_goods)
      }

      return arr
    }
  },
  methods:{
      isCombin(item,com)
      {
        console.log(com)
         if(com!=null)
         {
             if (!item.toogle) {
             Vue.set(item, 'toogle', true)
             }
             else
             {
               item.toogle=!item.toogle
             }
         }
      }
  }
}
</script>
<style>
.combin{font-size:12px;margin:0 14px;}
.combin span {border-top:1px solid #ddd;border-left:1px solid #ddd;}
.combin:last-child{border-bottom:1px solid #ddd;}
.combin span:nth-child(3){border-right:1px solid #ddd;}
.goods_list .flex .down:after{top:14px;right:12px;border-top-color:#666}
</style>
