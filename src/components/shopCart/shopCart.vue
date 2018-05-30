 <template lang="html">
  <div class="">
  <div class="shopCart">
    <div class="content">
      <div class="content-left" @click="listToggle">
        <div class="logo-wrapper">
          <div class="badge" v-show="totalCount">
            {{totalCount}}
          </div>
          <div class="logo" :class="{'active':totalPrice}">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price" :class="{'active':totalPrice}">
          ￥{{parseFloat(totalPrice).toFixed(1)}}
        </div>
        <div class="desc">
          另需要配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice>=minPrice}" @click="Gopay()">
        {{payDesc}}
      </div>
    </div>
    <div class="ball-container">
      <transition name="drop" v-on:before-enter="beforeEnter"
        v-on:enter="enter" v-on:after-enter="afterEnter"
        v-for="(ball,index) in balls">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="transHeight">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="setEmpty()"><i></i>清空</span>
        </div>
        <div class="list-content" ref="foodlist">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.current_price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade-backdrop">
    <div class="backdrop" v-show="showBackdrop" @click="hideBackdrop"></div>
  </transition>
  </div>
</template>

<script>
import cartcontrol from '../cartcontrol/cartcontrol'
import backdrop from '..//backdrop/backdrop'
import BScroll from 'better-scroll'
import {MessageBox} from 'mint-ui';
export default {
  props: {
    selectFoods: {
      type: Array,
      default: []
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    Inventory:Number
  },
  data() {
    return {
      balls: [{
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }, {
        show: false
      }],
      dropBalls: [],
      listShow: false,
      cars:[],
      roast:false,
      isPay:true,
      isSclecd:false
    }
  },
  created() {
    this.$root.eventHub.$on('cart.add', this.drop)
  },
  computed: {
    showBackdrop() {
      if (this.listShow && this.totalPrice) {
        return true
      }
      this.listShow = false
      return false
    },
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        if (food.count) {
          total += food.current_price * food.count
        }
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    leftAmount() {
      if (this.minPrice - this.totalPrice > 0 && totalPrice) {
        return true;
      }
      return false
    },
    payDesc() {
      let diff = this.minPrice - this.totalPrice
      if (!this.totalPrice) {
        return `￥${this.totalPrice}起送`
      } else if (diff > 0) {
        return `还差￥${diff}元`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    drop(el) {
      console.log(el)
      for (let i = 0, l = this.balls.length; i < l; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    Gopay()
    {
       console.log(this.totalPrice)
       if(this.totalPrice)
       {   this.selectFoods.forEach((food) => {
              console.log()
              if(food.goods_tableware||food.combin_status==2)
              {
                 this.roast=true
              }
              else
              {
                this.roast=false
              }
           })
           if(!this.roast)
           {
              if(this.Inventory==0)
              {
                   MessageBox.confirm('烤具库存不足，是否继续下单?').then( promise => {
                       // this.$router.go(-1);
                       this.$router.push({path:'/payDetail?id='+this.$route.params.id+'&date='+this.$route.query.date+'&type='+this.$route.query.type})  
                  });   
              }
              else
              {
                   MessageBox.confirm('您没有选择烤具，是否继续下单?\n 食材满200免烤具费哦！').then( promise => {
                   /* this.$router.go(-1);*/
                    this.$router.push({path:'/payDetail?id='+this.$route.params.id+'&date='+this.$route.query.date+'&type='+this.$route.query.type})  
                     console.log(promise )
                  });  
              }
                       
           }
           else
           {
               this.$router.push({path:'/payDetail?id='+this.$route.params.id+'&date='+this.$route.query.date+'&type='+this.$route.query.type})
           }


          
          
       
                
       }
       
      //
    },
    setEmpty() {
      this.selectFoods.forEach((food) => {
        food.count = 0
      })
       this.$http({
           method:'post',
           url:this.URL+'/app/cartClear',
           params:{userId:localStorage.clientId,storeId:this.$route.params.id}
           }).then(res=> {
              console.log(res)
           });
    },
    hideBackdrop() {
      this.listShow = false
    },
    _initScroll() {
      this.foodlistScroll = new BScroll(this.$refs.foodlist, {
        click: true
      });
    },
    listToggle() {
      if (!this.selectFoods.length) {
        return
      }
      this.listShow = !this.listShow
      if (this.listShow) 
      {
          this.$nextTick(() => {
            if (!this.foodlistScroll) {
              this._initScroll()
            } else {
              this.foodlistScroll.refresh()
            }
          })
       /* this.$http.post(this.URL+'/app/carts?id='+localStorage.clientId+'&storeId='+this.$route.params.id).then((res)=>{
           this.cars=res.data.object[0].goodsCarts
           console.log(this.cars)
        })*/
      }
    },
    beforeEnter(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.querySelector('.inner-hook')
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter(el) {
      el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.querySelector('.inner-hook')
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
      })
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  components: {
    cartcontrol,
    backdrop
  }
}

</script>

<style lang="stylus" scoped>
.shopCart
  position fixed
  left 0
  bottom 0
  width 100%
  height 48px
  z-index 1001
  .content
    display flex
    background #141d27
    .content-left
      flex 1
      height 48px
      .logo-wrapper
        display inline-block
        vertical-align top
        position: relative
        height: 56px
        line-height: 56px
        border-radius: 50%
        width: 56px
        top: -10px
        background: #141d27
        margin:0 12px
        padding 6px
        box-sizing border-box
        text-align: center
        .badge
          position absolute
          top: 0;
          right 0
          background: rgb(240,20,20);
          color: white;
          width 24px
          height 16px
          line-height: 16px;
          font-size: 9px;
          box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
          font-weight: 700;
          border-radius: 16px;
          text-align center
        .logo
          width 100%
          height 100%
          background: #2b343c
          border-radius: 50%
          font-size: 24px
          color: #80858a
          line-height: 44px
          font-weight: 700
          .icon-shopping_cart
              width 23px
              height 20px
              display inline-block
              background url('../../assets/images/car.png') no-repeat 0 -17px
              background-size 34px auto
          &.active
            background: #05c981;
            color: white;
           
      .price
        display inline-block
        padding 0
        vertical-align top
        font-size 16px
        margin-top 12px
        padding-right 12px
        box-sizing border-box
        color rgba(255,255,255,0.4)
        font-weight 700
        line-height 24px
        border-right 1px solid rgba(255,255,255,0.1)
        &.active
          color white
      .desc
        position relative
        display inline-block
        vertical-align top
        margin 12px 0 0 12px
        font-size 10px
        color rgba(255,255,255,0.4)
        font-weight 700
        line-height 24px
    .content-right
      flex 0 0 105px
      font-size 12px
      font-weight 700
      background #2b343c
      color rgba(255,255,255,0.4)
      line-height 48px
      text-align center
      &.enough
        background #21c883
        color white
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      &.drop-enter,&.drop-enter-active
        transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background #05c981
          transition all 0.4s linear
  .shopcart-list
    position absolute
    top 0
    left 0
    width 100%
    background white
    transform translate3d(0,-100%,0)
    z-index -1
    &.transHeight-enter-active,&.transHeight-leave-active
      transition all 0.5s
    &.transHeight-enter,&.transHeight-leave-active
      transform translate3d(0,0,0)
    .list-header
      height 40px
      line-height 40px
      background #f3f5f7
      border-bottom 1px solid rgba(7,17,27,0.1)
      .title
        display inline-block
        font-size 14px
        font-weight 200
        color rgb(7,17,27)
        padding-left 18px
      .empty
        position absolute
        right 8px
        font-size 12px
        color #464646
        padding 0 10px
        i
         display inline-block
         width 16px
         height 24px 
         background url('../../assets/images/car.png') no-repeat -26px  -23px
         background-size 40px auto
         vertical-align middle
    .list-content
      max-height 217px
      overflow hidden
      .food
        position relative
        display flex
        height 48px
        margin 0 18px
        border-bottom 1px solid rgba(7,17,27,0.1)
        .name
          flex 1
          font-size 14px
          color rgb(7,17,27)
          line-height 48px
          font-weight 700
        .price
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          padding 0 12px 0 18px
          line-height 48px
        .cartcontrol-wrapper
          font-size 14px
          margin-top 6px
.backdrop
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background rgba(7,17,27,0.6)
  backdrop-filter blur(10px)
  z-index 40
  &.fade-backdrop-enter-active,&.fade-backdrop-leave-active
    transition opacity 0.5s
  &.fade-backdrop-enter,&.fade-backdrop-leave-active
    opacity 0
</style>
