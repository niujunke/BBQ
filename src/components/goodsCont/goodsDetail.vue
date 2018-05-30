<template lang="html">

  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper" id="wrapper_menu">
      <ul ref="menu_ul">
        <li v-for="(item,index) in seller.appGoodsClassList" @click="menuClick(index,$event)" :class="index==now?'menu-item-selected':'menu-item'" :data-id="'f'+index">
          <span class="text">
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item,index) in seller.appGoodsClassList" class="food-list food-list-hook" :id="'f'+index">
          <h1  ref="item_ps">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.appGoodsList" class="food-item" @click="goDetail(food)">
              <div class="icon">
                <img width="57" height="57" :src="URL+'/'+food.goods_main_photo"/>
              </div>
              <div class="content">
                <h2>{{food.name}}</h2>
                <div class="gray  sale_count"  v-show="food.saleGoodsLimitCount"><span class="red pd_r">每单限{{food.saleGoodsLimitCount}}份</span><span>库存：{{food.saleGoodsCount}}份</span></div>
                <div class="sell_box">
                    <span class="price pd_r">
	                  <span class="newPrice"><span class="unit">￥</span>{{food.current_price}}</span>
	                  <span v-show="food.saleGoodsCount" class="oldPrice">￥{{food.store_price}}</span>
	                </span>
	                <span class="sell-info">
	                  <span class="sellCount">月售{{food.goods_salenum}}份</span>
	                 <!--  <span class="rating"><i></i>{{food.rating}}%</span> -->
	                </span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
              <div class="mask" v-if="nowTime>food.saleGoodsEnd&&food.saleGoods"></div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopCart :selectFoods="selectFoods" :Inventory="seller.tablewareInventory"></shopCart>
    <foodDetail :food="selectedFood" v-if="selectedFood" ref="myFood"></foodDetail>
  </div>

</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import shopCart from '../shopCart/shopCart'
import foodDetail from '../foodDetail/foodDetail'
import BScroll from 'better-scroll'
import Vue from 'vue'
import { mapGetters,mapActions } from 'vuex'
export default {
  props: {
    seller: Object
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
         vm.getDate()

      });
    },
  data() {
    return {
      listHeight: [],
      foodsScrollY: 0,
      selectedFood: '',
      scroll: '',
      now:0,
      nowTime:null,
      storeId:null,
      initScroll:true,
      menuCurrentIndex:0
    }
  },
  computed: {
    selectFoods() 
    {
     let foods = []
      if(this.seller.appGoodsClassList)
      { 
         this.seller.appGoodsClassList.forEach((good) => {
              good.appGoodsList.forEach((food) => {
                if (food.count)
                {
                  foods.push(food)
                }
              })
          })
      }
      this.now=0
       return foods
      
    }
  },
  created()
  {
    this.empty() 
  },
  mounted() {
      this.$refs.foodsWrapper.addEventListener('scroll', this.menu)
    },
  methods: {
     menu() {
              this.foodsScrollY =this.$refs.foodsWrapper.scrollTop;
              let items =this.$refs.foodsWrapper.querySelectorAll('.food-list-hook')
              items.forEach((item, index) => {
                   if (this.foodsScrollY >=item.offsetTop-20) {
                       this.now = index;
           
                  } 
              });
              let menuList=this.$refs.menuWrapper.querySelectorAll('.menu-item-selected')
              let el = menuList[0];
              console.log(-el.offsetTop+'px')
              this.$refs.menuWrapper.scrollTop=-el.offsetTop+'px';
      },
    getDate()
    {
       var date = new Date(this.$route.query.date)
           this.nowTime=date.getTime()
    },
    goDetail(food) {
      this.selectedFood = food
      this.$nextTick(() => {
        this.$refs.myFood.showToggle()
      })
    },
    
    menuClick(index, event) {
       this.now=index
       document.getElementById("f"+index).scrollIntoView();
    },
    empty() {
       this.$http({
           method:'post',
           url:this.URL+'/app/cartClear',
           params:{userId:localStorage.clientId,storeId:this.$route.params.id}
           }).then(res=> {
              console.log(res)
           });
        }
  },
  components: {
    cartcontrol,
    shopCart,
    foodDetail

  }
  
}

</script>

<style lang="stylus">
@import '../../common/stylus/mixin'
  .goods
    display flex
    position absolute
    bottom 46px
    width 100%
    overflow hidden
    top 208px
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      margin-top: 2px;
      height 100%;
      overflow auto
      .menu-item-selected
        background white
        font-weight 700
        margin-top -1px
        color #21c883
      .menu-item,.menu-item-selected
        position relative
        display table
        height 54px
        line-height 14px
        padding 0 12px
        width 80px
        text-align center
        &:last-child:after
          content none
      .menu-item:after
          position: absolute
          content: ''
          left: 12px
          width: 56px
          bottom: 0
          border-bottom: 1px solid rgba(7,17,27,0.1)
        .text
          display table-cell
          vertical-align middle
          font-size 12px
          font-weight 200
          white-space normal
          line-height 14px
          .iconMap
            vertical-align middle
    .foods-wrapper
      flex 1
      margin-top: 2px;
      overflow auto
      
      .food-list
        h1
          margin 6px 0 0 10px
          padding-left 12px
          font-size 12px
          color rgb(147,153,159)
          border-left 2px solid #05c981
        .mask
         position absolute
         top 0
         left 0
         width 100%
         height 100%
         background rgba(255,255,255,0.7)
         z-index 300
      .food-item
        position relative
        display flex
        margin: 0 12px;
        padding: 18px 0;
        border-bottom 1px solid rgba(7,17,27,0.1)
        .pd_r
          padding-right 10px
        .icon
          flex 0 0 57px
          img 
            height 57px
            width:57px
        &:last-child
          border-bottom none
        .content
          flex 1
          padding-left 10px
          h2
            margin 2px 0 8px 0
            font-size 14px
            line-height 14px
            height 14px
            font-weight 700
            color rgb(7,17,27)
          .sell-info,.description
            font-size 10px
            color rgb(147,153,159)
            .sellCount
              margin-right 4px
            .rating
              i
               display inline-block
               width 16px
               height 14px 
               background url(../../assets/images/min_ic.png) no-repeat 0 -88px
               background-size 80px auto
               vertical-align text-top
          .sale_count
            font-size 10px
          .sell_box 
            margin-top 14px
	          .price
	            font-size 10px
	            font-weight 700
	            .newPrice
	              font-size 14px
	              color #62d39f
	              .unit
	                font-size 10px
	                font-weight normal
	            .oldPrice
	              text-decoration line-through
	              color rgb(147,153,159)
	              padding-left 4px
                font-weight normal 
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom 12px
            z-index 20

</style>
