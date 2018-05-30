<template lang="html">
  <transition name="move">
    <div class="detailWrapper citys"  v-show="showDetail" ref="detailWrapper" >
      <div class="cityDetail">
          <div class="cityInfo flex-sb" v-if="City">
              <div class="city_text" ref="areaInfo">{{City}}-{{areaName}}</div>
              <div class="city_btn"><mt-button size="small" @click="cancel">取消</mt-button><mt-button size="small" type="danger"  @click="showToggle()">确认</mt-button></div>
          </div>
          <div class="city_box" :class="{'pt':City}">
              <ul class="info" v-show="!City">
                 <!--  <li  v-for="item in citys"  @click="getCounty(Object.keys(item)[0],Object.values(item)[0])">{{Object.values(item)[0]}}</li> -->
                  <li  v-for="(item,index) in citys"   @click="getCounty(item)">{{cityList[index]}}</li>
              </ul>
              <ul class="info" v-show="City">
                  <li  v-for="item in county" @click="getAreaName(item.id,item.areaName)">{{item.areaName}}</li>
              </ul>
          </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { Button } from 'mint-ui';
export default {
 
  props: {
    citys:Array
  },
  data() {
    return {
      showDetail: false,
      evelflag: true,
      goods_list:{},
      combin:false,
      City:'',
      county:[],
      areaName:'',
      areaId:null
    }
  },
  computed: {
     cityList(){
       let list=[]
       this.citys.forEach((key) => {
         list.push(Object.values(key)[0])
       })
       return list
     }  
  },
  methods: {
    showToggle() {
    
      this.showDetail = !this.showDetail
      if (this.showDetail) {
          this.City=''
          this.areaName=''
      }
      else
      {
          var txt={
            area:this.City+'-'+this.areaName,
            id:this.areaId
          }
          this.$root.eventHub.$emit('area',txt)
      }
      
         console.log(this.cityList)
    },
    getCounty(item)
    {    
      //Object.keys(item)[0],Object.values(item)[0]
          console.log(Object.keys(item)[0])
          this.City=Object.values(item)[0]
          this.$http.post(this.URL+'/app/area/'+Object.keys(item)[0]).then((res)=>{
            console.log(res)  
            this.county=res.data.object 

           })
    },
    getAreaName(id,name)
    {
       console.log(id)
        this.areaId=id
        this.areaName=name
     
    },
    cancel()
    {
      this.City=''
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
  .back
    position absolute
    color white
    top 12px
    left 6px
    font-size 20px
    padding 10px
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
