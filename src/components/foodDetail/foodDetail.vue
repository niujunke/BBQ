<template lang="html">
  <transition name="move">
    <div class="detailWrapper" ref="detailWrapper" v-show="showDetail">
      <div class="foodDetail">
          <div class="back" @click="showToggle()">
            <i class="rank-head-back"></i>
          </div>
          <img :src="URL+'/'+food.goods_main_photo" height="425" width="100%">
          <div class="info">
              <div class="title">{{food.name}}</div>
              <div class="desc">
                <span>月售{{food.goods_salenum}}</span>
                <!-- <span>好评率{{food.rating}}%</span> -->
              </div>
              <div class="price">
                <span class="unit">￥</span>{{food.current_price}}
                <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
              </div>
              <div class="shopCart">
                <transition name="fade">
                  <div class="text" @click="addCart($event)" v-show="!food.count">加入购物车</div>
                </transition>
              </div>
              <cartcontrol :food="food"></cartcontrol>
          </div>
          <div class="divider"></div>
          <div class="desc">
            <div class="title">商品介绍</div>
            <div class="content" v-html="goods_list.description"></div>
          </div>
          <div class="divider"></div>
          <div class="detail_goods" v-if="combin">
              <div class="goodsInfo">
                <div class="flex-sb shoop_name info_list"><span>套餐</span></div>
                <div class="flex" v-for="item in goods_list.combin_goods">
                  <span class="tl">{{item.name}}</span>
                  <span class="gray">x{{item.combin_count}}<!-- {{item.count}} --></span>
                  <span class="tr">￥{{item.current_price}}</span></div>
                <div class="package_price"><span>原价：{{parseFloat(goods_list.combin_oldPrice).toFixed(1)}}</span><span>套餐价： <em class="red">{{goods_list.current_price}}</em></span></div>
              </div>
              <div class="goodsInfo">
                <div class="flex-sb shoop_name info_list"><span>租赁信息</span></div>
                <div class="flex" v-for="item in goods_list.tablewares">
                  <span class="tl">{{item.name}}</span>
                  <span class="gray">x{{item.combin_count}}</span>
                  <span class="tr">￥{{item.current_price}}</span></div>
                <div class="package_price"><span>租金： <em class="red">0</em></span><span>押金： <em class="red">50</em></span></div>
              </div>
               <div class="divider"></div>
               <div class="notes">
                   <div class="notes_tit">购买须知</div>
                   <dl>
                      <dt>套餐说明：</dt>
                      <dd>套餐内包含烤具，烤具免费使用只需缴纳50元押金，烧烤结束押金可退还。</dd>
                   </dl>
               </div>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
import '../../filter/time.js'
import cartcontrol from '../cartcontrol/cartcontrol'

export default {
  components: {
    cartcontrol
  },
  props: {
    food: Object
  },
  data() {
    return {
      showDetail: false,
      evelflag: true,
      goods_list:{},
      combin:false
    }
  },
  methods: {
    showToggle() {
      this.showDetail = !this.showDetail
      if (this.showDetail) {
        this.goodsInfo()
      }
    },
    addCart(event) {
     
      this.$set(this.food, 'count', 1)
      this.$root.eventHub.$emit('cart.add', event.target)
    },
    goodsInfo()
    {
        this.$http.post(this.URL+'/app/goods?id='+this.food.id+'&date='+this.$route.query.date+'&storeId='+this.$route.params.id).then((res)=>{
                console.log(res)
                this.goods_list=res.data.object
                if(this.goods_list.combin_goods)
                {
                     this.combin=true 
                    
                }
                else{
                   this.combin=false  
                }
        })
    }
  }
}

</script>

<style lang="stylus" scoped>
.detailWrapper
  position fixed
  left 0
  top 0
  bottom 48px
  width 100%
  background white
  transition all 0.4s ease
  z-index 1000
  &.move-enter-avtive,&.move-leave-active{
    transform translate3d(0,0,0)
  }
  &.move-enter,&.move-leave-active{
    transform translate3d(100%,0,0)
  }
.foodDetail
  height 100%
  overflow auto
  .back
    position absolute
    color white
    top 15px
    left 18px
    font-size 20px
    width 35px
    height 35px
    text-align center
    border-radius 50%
    background rgba(0,0,0,0.4)
   .rank-head-back
     float none
     position static
     display inline-block
     margin-top 4px
  .info
    position relative
    box-sizing border-box
    width 100%
    padding 18px
    .title
      font-size 14px
      font-weight 700
      color rgb(7,17,27)
      line-height 14px
    .desc
      display flex
      padding 0
      padding-top 8px
      font-size 10px
      color rgb(147,153,159)
      line-height 10px
    
    .price
      display flex
      padding-top 18px
      font-size 20px
      font-weight 700
      color #21c883
      line-height 24px
      .unit
        font-size 10px
        font-weight normal
      .oldPrice
        padding-left 12px
        font-size 10px
        font-weight normal
        color rgb(147,153,159)
        line-height 24px
    .shopCart
      position absolute
      right 18px
      bottom 18px
      height 24px
      text-align center
      z-index 2
      .text
        box-sizing border-box
        height 100%
        line-height 24px
        color white
        font-size 10px
        padding 0 12px
        border-radius 12px
        background #21c883
        &.fade-enter-active,&.fade-leave-active{
          transition opacity .2s
        }
        &.fade-enter,&.fade-leave-active{
          opacity 0
        }
    .cartcontrol
      position absolute
      right 12px
      bottom 12px
  .desc
    padding 18px
    .title
      font-size 14px
      font-weight 500
      color #07111b
      margin-bottom 6px
    .content
      font-size 12px
      font-weight 200
      color rgb(77,85,93)
      line-height 24px
      padding 0 8px
  .evaluation
    padding 18px 0
    position relative
    .title
      padding-left 18px
      font-size: 14px
      font-weight 500
      color: #07111b
    .classify
      padding 18px 0
      margin 0 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .item
        display inline-block
        font-size 12px
        padding 8px 12px
        line-height 16px
        background rgba(0,160,220,0.2)
        color rgb(77,85,95)
        margin-right 8px
        .count
          font-size 8px
          padding-left 2px
        &.active
          color white
          background rgb(0,169,220)
        &.bad
          background rgba(77,85,93,0.2)
        &.badActive
          background #4d555d
    .switch
      font-size 12px
      width 100%
      padding 12px 0 12px 18px
      color rgb(147,153,159)
      border-bottom 1px solid rgba(7,17,27,0.1)
      .icon-check_circle
        font-size 24px
        vertical-align middle
        &.on
          color #00c850
    .evel-list
      margin 0 18px
      .evel
        padding 16px 0
        border-bottom 1px solid rgba(7,17,27,0.1)
        .userInfo
          display flex
          color rgb(147,153,159)
          font-size 10px
          line-height 12px
          .time
            flex 1
          .user
            flex 1
            text-align right
            .avatar
              img
                padding-left 6px
                border-radius 50%
        .content
          padding-top 6px
          .icon
            font-size 12px
            line-height 24px
            &.icon-thumb_up
              color rgb(0,160,220)
            &.icon-thumb_down
              color rgb(147,153,159)
          .text
            font-size 12px
            color rgb(7,17,27)
            line-height 16px
            padding-left 4px
.notes
  padding 0 0 30px 10px
  .notes_tit
    font-size 12px
    border-bottom 1px solid #d2d2d2
    color #b6b5b5
    padding 5px 0
  dt
    color #ea7d1c
    padding-top 15px
  dd
    padding 10px 0 0 10px
</style>
