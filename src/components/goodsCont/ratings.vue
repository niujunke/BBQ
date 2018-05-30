<style lang="stylus" scoped>
.ratingsWrapper
  position: absolute
  top: 210px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
.rating
  top 51px
.ratings-content
    height 100%
    overflow auto
  .info
    display flex
    .mark
      flex 0 0 138px
      margin 18px 0
      border-right 1px solid rgba(7,17,27,0.1)
      text-align center
      .num
        font-size 24px
        color #21c883
        line-height 28px
      .text
        padding 6px 0 8px 0
        font-size 12px
        color rgb(7,17,27)
        line-height 12px
      .contrast
        font-size 10px
        color rgb(7,17,27)
        line-height 10px
        margin-bottom 6px
    .stars
      padding 34px 24px 0
      .serviceScore,.foodScore,.deliveryTime
        display flex
        margin-bottom 8px
        .text
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
          margin-right 12px
        .num
          font-size 12px
          line-height 18px
          color rgb(255,153,0)
          padding-left 12px
      .deliveryTime
        margin-bottom 0
        .time
          font-size 12px
          color rgb(147,153,159)
          line-height 18px
  .evaluation
    padding 18px 0
    position relative
    .classify
      padding-bottom 18px
      margin 0 18px
      text-align center
      .item
        display inline-block
        font-size 12px
        padding 8px 12px
        line-height 16px
        border 1px solid #c4c5c5
        border-radius 3px
        color #c4c5c5
        margin-right 8px
        .count
          font-size 8px
          padding-left 2px
        &.active
          color #fba71a
          border-color #fba71a
       
         
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
    .evel
      display flex
      padding 18px 0
      margin 0 18px
      border-bottom 1px solid rgba(7,17,27,0.1)
      .avatar
        flex 0 0 28px
        margin-right 12px
        img
          border-radius 50%
      .content
        flex 1
        .user
          font-size 10px
          color rgb(7,17,27)
          line-height 12px
          position static
          .rateTime
            position absolute
            font-weight 200
            right 18px
            color rgb(147,153,159)
        .star-wrapper
          font-size 0
          padding-top 4px
          margin-bottom 6px
          .star
            display inline-block
          .deliveryTime
            font-size 10px
            padding-left 6px
            font-weight 200
            color rgb(147,153,159)
        .text
          font-size 12px
          color rgb(7,17,27)
          line-height 18px
        .pcs
          .itemImg
            display inline-block       
        .recommend
          padding-top 4px
          .icon
            font-size 12px
            color rgb(0,160,220)
            line-height 16px
          .dish
            display inline-block
            font-size 9px
            color rgb(147,153,159)
            line-height 16px
            border 1px solid rgba(7,17,27,0.1)
            padding 2px 6px
            margin-right 8px
            white-space normal
            margin-top 4px
</style>

<template lang="html">
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="info">
        <div class="mark">
          <div class="num green">{{seller.storePoint.store_evaluate1}}</div>
          <div class="text">综合评分</div>
          <div class="contrast">商家好评率{{seller.rankRate}}%</div>
        </div>
        <div class="stars">
          <div class="serviceScore">
            <span class="text">配送评分</span>
            <star :size="36" ></star>
            <span class="num">{{seller.storePoint.ship_evaluate}}</span>
          </div>
          <div class="foodScore">
            <span class="text">商家评分</span>
            <star :size="36" ></star>
            <span class="num">{{seller.storePoint.store_evaluate1}}</span>
          </div>
         
        </div>
      </div>
      <div class="divider"></div>
      <div class="evaluation">
      
        <div class="evel-list">
          <ul>
            <li class="evel" v-for="evel in seller.appEvaluates">
              <div class="avatar">
                <img :src="evel.headImg" width="28" height="28" v-if="evel.headImg">
                <img src="../../assets/images/us.png" width="28" height="28" v-if="!evel.headImg">
              </div>
              <div class="content">
                <div class="user">
                  <span class="name">{{evel.user}}</span>
                 
                </div>
                <div class="star-wrapper">
                  <star :size="24" :score="evel.description_evaluate"></star>
                  <span class="rateTime deliveryTime">{{evel.date | time}}</span>
                </div>
                <div class="text">{{evel.desc}}</div>
                <div class="pcs"> 
                      <see-box>
                        <see-item class="itemImg"  v-for="(photo,index) in evel.evaluatePhotos" :key="index" :img="URL+'/'+photo"></see-item>
                      </see-box>
                 </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star'
export default {
   props: {
    seller: Object
  },
  components: {
    star: star
  },
  data() {
    return {
      ratings: [],
      classifyArr: [{
        name: '全部',
        count: 0,
        active: true
      }, {
        name: '推荐',
        count: 0,
        active: false
      }, {
        name: '吐槽',
        count: 0,
        active: false
      }],
      evelflag: true
    }
  },
  created() {
   
  },
  methods: {
   /* _init(){
        
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratingsWrapper, {
            click: true
          })
      })
    }*/
  }
}

</script>
<style type="text/css">
.itemImg img{width:80px;height:70px;margin:6px 10px 0 0;}
             
</style>
