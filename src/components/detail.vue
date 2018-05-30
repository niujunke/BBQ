<template>
  <div class="bbq_detail p60">
      <div class="bbq_name flex-sb" :style="'background:url('+URL+'/'+detail.logoUrl+') no-repeat'">
            <div class="box">
                  <span class="name">{{detail.store_name}}</span>
                  <div class="stars"><i class="z"></i><star :score="detail.store_evaluate1"></star></div>
            </div>
            <router-link to="/pics"><div class="pics"><i></i>{{detail.albums==null?0:detail.albums.length}}张</div></router-link>
      </div>
      <div class="detail_info">
           <div class="map">
                 <div class="map_box"  id="container" >
                     <a :href="'http://api.map.baidu.com/marker?location='+this.detail.store_lat+','+this.detail.store_lng+'&title='+detail.appArea.parentAreaName+detail.appArea.areaName+detail.store_address+'&content='+detail.appArea.parentAreaName+detail.appArea.areaName+detail.store_address+'&output=html&src=yourCompanyName|yourAppName'" >
                      <img  width="100%" height="100%" :src="'http://api.map.baidu.com/staticimage/v2?ak=btsVVWf0TM1zUBEbzFz6QqWF&mcode=666666&center='+detail.store_lng+','+detail.store_lat+'&width=200&height=70&zoom=12&scale=2&markers='+detail.store_lng+','+detail.store_lat+''" />  
                    </a>
                 </div>
                 <p>{{detail.appArea.parentAreaName+detail.appArea.areaName+detail.store_address}}距我{{detail.distance}}km</p>
           </div>
           <div class="score">
                 <p class="green"><span>{{detail.storePoint.store_evaluate1}}</span>分</p>
                 <router-link :to="'/goods/'+detail.id+'/ratings'" class="allow-right">{{detail.appEvaluates.length==0?0:detail.appEvaluates.length}}条评价</router-link>

           </div>

      </div>
      <div class="explain flex-sb"><span>请提前24小时预订</span><a :href="'tel:'+detail.store_telephone+''" class="green allow-right">咨询电话</a></div>
      <div class="date flex" @click="openPicker">
             <div class="input"><input type="text" name="year" v-model="y" readonly="readonly">年</div>
             <div class="input"><input type="text" name="month" v-model="m" readonly="readonly">月</div> 
             <div class="input"><input type="text" name="day" v-model="d" readonly="readonly">日</div>     
      </div>
       <div class="recommend">
       <div class="intro" v-html="detail.store_info"></div>
  </div>
  <div class="bottom_btn">
        <div class="l flex green">
           <span @click="togBj" :class="{'active': tog }"><i class="i1"></i>收藏</span>
           <span @click="tog1=!tog1" :class="{'active': tog1 }"><i class="i2"></i>赞</span>
        </div>
        <div class="r flex">
             <div class="tel"><a href="tel:15538930911">联系客服</a></div>
             <div class="reservation" @click="reservation()">立即预订</div>
        </div>
  </div>
      <mt-datetime-picker ref="picker" type="date" @confirm="handleConfirm" year-format="{value} 年"  month-format="{value} 月"  date-format="{value} 日" :startDate="startDate" :endDate="endDate"> </mt-datetime-picker>
  </div>
</template>

<script>
import star from './star/star'
import {DatetimePicker,Toast} from 'mint-ui';
import { mapGetters,mapActions } from 'vuex'
export default {
	data()
    {
      return{
      	y:null,
      	m:null,
      	d:null,
      	curDate:null,
      	tog:false,
      	tog1:false,
      	opacity:0,
        detail:{},
        lat:0,
        lng:0,

        startDate:null,
        endDate:null
      }
    },
  components: {
    star: star
  },
  beforeRouteEnter (to, from, next) {
      next(vm => {
      	vm.$store.commit('setHeadTitle', '烤场详情');
      	vm.$store.commit('showRank', true);
      	vm.$store.commit('setHeadStyle', {background: `rgba(33,200,131,${vm.opacity})`});
        
        let id = vm.$route.params.id;
        let lat=localStorage.lat
        let lng=localStorage.lng
        vm.getData(id,lng,lat)
        vm.tog=false
        vm.tog1=false
      	window.onscroll = ()=>{
          vm.opacity = window.pageYOffset / 250;
          vm.$store.commit('setHeadStyle', {background: `rgba(33,200,131,${vm.opacity})`});
        }
       
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      this.$store.commit('setHeadStyle', {background: 'rgba(33,200,131,1)'});
      window.onscroll = null;
      next()
    },
    mounted()
    { 
      let id = this.$route.params.id;
      let lat=localStorage.lat
      let lng=localStorage.lng
      this.getData(id,lng,lat)
      this.getTime()
    },
    methods:{
	  /*  init (lng,lat) 
	    {    
        var map = new BMap.Map("container");
　　　　var point = new BMap.Point(lng,lat);
　　　　map.centerAndZoom(point, 15);
　　　　var marker = new BMap.Marker(point);// 创建标注
　　　　map.addOverlay(marker);
        map.addEventListener("click", this.openMap);
	      },*/
	      getTime()
	      {
             var date=new Date();
             this.y=date.getFullYear();
             this.m=date.getMonth()+1;
             this.d=date.getDate();
             this.startDate=new Date(this.y,this.m-1,this.d+1);
             this.endDate=new Date(this.y,this.m-1,this.d+15);
	      },
	      openPicker() 
	      {
	        this.$refs.picker.open();     
	      },
	      handleConfirm(value)
	      {
          var d=new Date(value)
	      	this.y=d.getFullYear()
          this.m=d.getMonth()+1
	        this.d=d.getDate()
	      },
	      togBj()
	      {
          if(localStorage.clientId)
          {
             this.tog=!this.tog;
            if(this.tog)
            {
               Toast('收藏成功')
               this.$http({
                 method:'post',
                 url:this.URL+'/app/addStoreFavorite',
                 params:{userId:localStorage.clientId,storeId:this.$route.params.id,token:localStorage.token}
                 }).then(res=> {
                  console.log(res)
                 });
            }
            else
            {
              Toast('收藏已取消')
                this.$http.post(this.URL+'/app/storesFavoriteDelete/'+localStorage.clientId+'?token='+localStorage.token).then((res)=>{
                  console.log(res)
               })
            }
          }
          else
          {
            localStorage.url='#'+window.location.href.split('#')[1]
            this.$router.replace({path:'/login'})
            this.$router.push({path:'/login'})
           
          }
	      	
	      	
	      },
	      reservation()
	      {
           if(localStorage.clientId)
           {
              var date=new Date();
              if(this.d==date.getDate())
              {
                  Toast('请选择预订日期')
              }
              else
              {
               this.$router.push({path:'/goods/'+this.$route.params.id+'?date='+this.y+'-'+this.m+'-'+this.d+'&type='+this.$route.query.type}); 
              }
           }
           else
           {
             localStorage.url='#'+window.location.href.split('#')[1]
              console.log(localStorage.url)
              this.$router.replace({path:'/login'})
              this.$router.push({path: '/login'}); 
               
           }
	      	  
	      },
        recommend(id)
        {
            let lat=localStorage.lat
            let lng=localStorage.lng
           document.body.scrollTop = document.documentElement.scrollTop = 0;
            this.$router.push({path: '/detail/'+id+''});
            this.getData(id,lng,lat)
        },
        getData(id,lng,lat)
        {
          
              this.$http({
               method:'post',
               url:this.URL+'/app/store?id='+id+'&lat='+lat+'&lng='+lng
               }).then(res=> {
                console.log(res)
                  this.detail=res.data.object
                  //this.init(this.detail.store_lng,this.detail.store_lat);
                  this.$store.commit('setPhoto', this.detail.albums==null?[]:this.detail.albums);
               });
          
        }/*,
        openMap()
        {
            let url='http://api.map.baidu.com/geocoder?location='+this.detail.store_lat+','+this.detail.store_lng+'&coord_type=gcj02&output=html&src=yourCompanyName|yourAppName'
             window.location.href=url
            
        }*/
    }
}
</script>

<style>
.bbq_detail{position:absolute;top:0px;width:100%;overflow-x:hidden;}
.bbq_name{background-size: cover;padding:151px 26px 5px;color:#fff;}
.bbq_name .stars{padding-top:15px;}
.bbq_detail .bbq_name a{color:#fff;}
.pics{width:50px;height:50px;border-radius:50%;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;flex-direction: column}
.z{width:16px;height:22px;background:url('../assets/images/min_ic.png') no-repeat -46px -64px;background-size:62px auto;display:inline-block;vertical-align: middle;}
.pics i{width:16px;height:19px;background:url('../assets/images/min_ic.png') no-repeat -34px -69px;background-size:66px auto;display:inline-block;}
.detail_info{display:flex;border-bottom:1px solid #c9c9c9;text-align:center;}
.map{border-right:1px solid #c9c9c9;flex:1;position: relative;min-height:103px;}
.map p{padding:10px 0;position:absolute;bottom:0;left:0;background:#fff;width:100%;color:#464646;}
.score{padding:15px;width:112px;}
.score .green{padding-bottom:5px;}
.score .green span{font-size:26px;}
.score a{font-size:12px;color:#c9c9c9;}
#container{min-width:200px;min-height:103px;}
.explain{padding:10px 25px;color:#999}
.date{padding:15px 22px;border:5px solid #e7e7e7}
.date .input input{width:70%;text-align: center;border:2px solid #dcdbdc;border-radius:5px;color:#05c981;margin-right:8px;padding:3px 0;}
.recommend .name{padding-bottom:20px;}
.recommend .order_info span,.recommend .order_info em{font-size:12px;color:#999;}
.recommend  .order_pc img{border-radius:0;}
.bottom_btn{display: flex;height:58px;position:fixed;width:100%;bottom:0;left:0;border-top:1px solid #eee;background:#fff;}
.bottom_btn .l{width:126px;}
.bottom_btn .l span{padding-top:10px;color:#3dd3b8 !important;}
.bottom_btn .l span:nth-child(1){border-right:1px solid #eee;}
.bottom_btn .l i{background:url(../assets/images/z.png) no-repeat;background-size:36px auto;display:block;width:17px;height:17px;margin:0 auto 8px;}
.bottom_btn .l i.i2{background-position:0 -19px;width:18px;}
.bottom_btn .l span.active i.i1{background-position:-19px 0px;}
.bottom_btn .l span.active i.i2{background-position:-18px -19px;}
.bottom_btn .r{flex:1;color:#fff;line-height:58px;font-size:16px;}
.bottom_btn .r .tel{background:#f89f0b;}
.bottom_btn .r .tel a{color:#fff;}
.bottom_btn .r .reservation{background:#ec6941;}
.intro{padding: 10px;}
.intro p{line-height:24px;position:relative;width:100%;clear:both;}
.intro p img{margin:10px 0}
.recommend .intro p strong{padding-left:10px ;border-left:3px solid #05c981;text-indent:0 !important;float:left;display:inline-block;height:15px;line-height:15px;margin-bottom:10px;}
</style>
