<template>
  <div class="home p60">
     <div class="page-swipe">
         <mt-swipe :auto="5000">
		      <mt-swipe-item v-for="item in banner
          ">
		        <img :src="URL+'/'+item.imgUrl">
		      </mt-swipe-item>
	    </mt-swipe>
     </div>
     <div class="notice">
          <div class="notice_ic" ><i></i>公告：</div>
          <roll-notice :notices="ntice"></roll-notice>
     </div>
     <div class="type flex">
           <router-link to="/shareOrder"><img src="../assets/images/p.png"><span>一起火拼</span></router-link>
           <router-link to="/salePrice"><img src="../assets/images/t.png"><span>每日特价</span></router-link>
           <router-link to="/mien"><img src="../assets/images/f.png"><span>烤管风采</span></router-link>
           <router-link to="/notify"><img src="../assets/images/x.png"><span>烤场须知</span></router-link>
     </div>
     <div class="main_list home_list">
          <div class="title p10">
               <i></i>热门烤场
          </div>
          <ul class="list-info">
             <li v-for="(item,index) in hotShop">
               <router-link :to="'/detail/'+item.id" >
                 <div class="pic">
                       <img :src="URL+'/'+item.logoUrl"> 
                      <!--  <img src="../assets/1.jpg"> -->
                      <div class="hot" v-if="index==0"><i></i><span>烧烤胜地</span></div>
                      <div class="hot" v-if="index==1"><span>超高</span><span>满意度</span></div>
                      <p>{{item.saleNum}}人已烧烤</p>
                 </div>
                 <div class="detail">
                      <div class="flex-sb">
                          <div class="bbq-name">{{item.store_name}} <star :score="item.storePoint.store_evaluate1?item.storePoint.store_evaluate1:''"></star></div>
                          <div class="location">{{item.distance}}km</div>      
                      </div>
                     <!--  <div class="ellipsis" >
                         <div class="text" v-html="item.store_info"></div>
                      </div> -->
                 </div>
                </router-link>
             </li>
          </ul>
     </div>
  </div>
</template>

<script type="es6">
import star from './star/star'
import RollNotice from './notice/RollNotice'
import {Swipe,Cell,Indicator} from 'mint-ui' 
import { mapGetters,mapActions } from 'vuex'
export default {
  components: {
    star,RollNotice
  },
  data () {
    return {
      lat:0,
      lng:0,
      ntice:[],
      banner:[],
      shops:[]
    }
  },
    beforeRouteLeave(to, from, next){
      clearInterval(this.timer)
      next()
    } ,
  watch:{
     $route(to,from)
     {
      
        if(to.path=='/index')
        {
            this.$store.commit('showHead', false);
        }
        else
        {
            this.$store.commit('showHead', true);
        }
        if(to.path=='/user'||to.path=='/order/allPay'||to.path=='/my_share')
        {
           localStorage.url='#'+to.path
        }
     }
  },
  created()
  {
     Indicator.open({
                        text: '加载中...',
                        spinnerType: 'snake'
                   });
     this.$store.commit('showHead', false);
     this.GetLocation()
     this.getBn()
     console.log( this.hotShop)
  },
  computed:mapGetters(['hotShop']),
  methods:{
      getntice()//公告
      {
          this.$http.get(this.URL+'/app/notices?mark=news').then(res=> {
             this.ntice=res.data.object
          }) 
      },
       getBn()//轮播
      { 
          this.$http.get(this.URL+'/app/ads').then(res=> {
              this.banner=res.data.object
          })
          this. getntice()
      },
      /**百度地图API功能**/  
      GetLocation()
      {  
          var that=this
          var geolocation = new BMap.Geolocation();  
          geolocation.getCurrentPosition(function(r){  
              if(this.getStatus() == BMAP_STATUS_SUCCESS){  
                  var rp = new BMap.Point(r.point.lng,r.point.lat);  
                  var gc = new BMap.Geocoder(); 
                  gc.getLocation(rp,function(rs){  
                      var addComp = rs.addressComponents;  
                      //console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber)

                     // that.getShoop(rp.lat,rp.lng,addComp.city)
                      localStorage.lat=rp.lat;
                      localStorage.lng=rp.lng; 
                      localStorage.city=addComp.city; 
                      that.$store.commit('setCity', localStorage.city);
                      that.getHotShops()
                      console.log(rp.lat+'-'+rp.lng+'-'+addComp.city)
                  });  
              }     
          },{enableHighAccuracy: true})  
      },
       ...mapActions(['getHotShops'])
      /*,
      getShoop(lat,lng,city)
      {   
           
        this.$http({
             method:'post',
             url:this.URL+'/app/storesRecommend',
             params:{lat:lat,lng:lng,name:city}
             }).then(res=> {
               Indicator.close();
               this.shops=res.data.object
               console.log(res.data.object)
             });
      }*/
  }
}
</script>
<style>
.page-swipe  .mint-swipe { height:32vw;}
 .page-swipe  .mint-swipe-indicator {width: 12px ;height: 12px ;}
.page-swipe  .mint-swipe-indicators {bottom: 5px ;}
.notice{border-bottom:1px solid #eee;overflow: hidden;padding:4px 0;height:26px;font-size:12px;display:flex;align-items:center;line-height:26px;}
.notice_ic{color:#f45b5e;padding-left:15px;width:74px;}
.notice_ic i,.title i{display:inline-block;width:18px;height:17px;background:url('../assets/images/ics.png') no-repeat;background-size:100% auto;vertical-align: middle;}
.show-notice{height:22px;overflow:hidden;vertical-align:middle;flex:1;}
.ntice_list{width:70%;}
.ntice_list p{height:22px;margin:0;line-height:22px;}
.ntice_list a{color:#6a6769;}
.type{padding:10px 0;border-bottom:1px solid #eaeaea;}
.type a{text-align:center;color:#242424;}
.type a img{width:50px;height:50px;}
.type a span{display:block;padding-top:5px;}
.main_list .title i{background-position:0 -20px;}
.detail{padding:6px 10px;}
.detail p,.detail .location{color:#919191;font-size:12px;}
.detail .flex-sb{padding-bottom:5px;}
.detail .ellipsis p{text-indent: 0 !important;overflow: hidden; white-space: nowrap;text-overflow: ellipsis;}
.pic{position:relative;height:37vw;overflow:hidden;}
.pic .hot{width:66px;height:50px;background:url('../assets/images/hot.png') no-repeat;background-size:100% auto;position:absolute;top:0;right:20px;color:#feffb2;font-size:12px;display:flex;align-items:center;flex-direction:column;padding-top:4px;}
.pic p{position:absolute;right:10px;bottom:10px;color:#fff;}
.pic .hot i{display:block;width:18px;height:17px;background:url('../assets/images/ics.png') no-repeat 0 -37px;background-size:100% auto;}
.home_list .bbq-name{padding:0;}
.detail .ellipsis{height:22px;}
.detail .ellipsis .text{margin-top:-13px;}
</style>
