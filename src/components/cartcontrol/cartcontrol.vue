<template lang="html">

  <div class="cartcontrol">
    <transition name="fadeRotate">
      <div class="cart-decrease car_ic" v-show="food.count>0" @click.stop.prevent="decreaseCart()"> </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">
      {{food.count}}
    </div>
    <div class="cart-add car_ic" @click.stop.prevent="addCart($event)"></div>
  </div>

</template>

<script>
import Vue from 'vue'

export default {
  props: {
    food: Object
  },
  data(){
     return{
      goodsCartId:null
     }
  },
  methods: {
    addCart(event) {
      console.log(event);
     /* if (!event._constructed) {
        return
      }*/
      if (!this.food.count) {
        Vue.set(this.food, 'count', 0)
      }
      if(this.food.saleGoodsLimitCount!=0&&this.food.count>=this.food.saleGoodsLimitCount)
      {
         this.food.count=this.food.saleGoodsLimitCount;
         return 
      }
      else
      {
         this.food.count++;
      }
      
       this.$root.eventHub.$emit('cart.add', event.target)
        this.postCar(this.food.id,this.food.count,this.food.current_price,this.food.goodsType)
    },
    decreaseCart() {
      if ( !this.food.count) {
        return
      }
      this.food.count--;
      if(this.food.count==0)
      {
          this.$http({
           method:'post',
           url:this.URL+'/app/cartDelete',
           params:{goodsCartId:this.goodsCartId,userId:localStorage.clientId,storeId:this.$route.params.id}
           }).then(res=> {
              console.log(res)
           });
      }
      else{
         this.postCar(this.food.id,this.food.count,this.food.current_price,this.food.goodsType)
      }
    },
    postCar(id,num,pice,type)
    {
      this.$http({
           method:'post',
           url:this.URL+'/app/cartAdd',
           params:{goodsId:id,userId:localStorage.clientId,storeId:this.$route.params.id,count:num,price:pice,gsp:'',buy_type:type,date:this.$route.query.date,token:localStorage.token}
           }).then(res=> {
              console.log(res)
              this.goodsCartId=res.data.object.goodsCartId
           });
    }
  }
}

</script>

<style lang="stylus">

.cartcontrol
  .cart-decrease
    display inline-block
    background-position -20px 0 !important
    transition: all .4s linear
    &.fadeRotate-enter-active, &.fadeRotate-leave-active
      transform translate3d(0,0,0)
    &.fadeRotate-enter, &.fadeRotate-leave-active
      opacity: 0
      transform translate3d(24px,0,0)
      .inner
        transform rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    font-size 10px
    color rgb(147,153,159)
    line-height 24px
    text-align center
    padding 6px 0
  .cart-add
    display inline-block
    vertical-align top
   .car_ic
    width 20px
    height 20px
    background url('../../assets/images/car.png') no-repeat
    background-size 40px auto
    margin 6px
</style>
