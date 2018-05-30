<template>
  <div class="psTop">
	  <v-header :seller="goods" :roasted="roasted"></v-header>
	  <div class="gstab">
	    <div class="tab-item">
	      <router-link :to="{path:'/goods/'+this.$route.params.id+'/goodsDetail'}" replace>商品</router-link>
	    </div>
	    <div class="tab-item">
	      <router-link :to="{path:'/goods/'+this.$route.params.id+'/ratings'}" replace>评论</router-link>
	    </div>
	  </div>
	  <keep-alive>
	    <router-view :seller="goods" ></router-view>
	  </keep-alive>
</div>
</template>
<script>
import vHeader from './goodsHead/header'
import { mapGetters,mapActions } from 'vuex'
//const ERR_OK = 0
  //通过路由的before钩子解除router-view缓存限制
   var info={
          id:null,
          date:null
        }
 export default{
  computed:{
    ...mapGetters(['goods']),
     roasted() {
       let data_num={
           sold:null,
           repertory:null
        }
        data_num.sold=this.goods.tablewareSaleNum
        data_num.repertory=this.goods.tablewareInventory
         return data_num
      }
  },
 	beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('setHeadTitle', '烤题'); 
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadStyle', {background: `rgba(33,200,131,0)`});     
        vm.newPage=vm.$route.params.id
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      this.$store.commit('setHeadStyle', {background: `rgba(33,200,131,1)`});                                                                                                                                                  
      next()
    },
    data() {
    return {
      seller: {},
      pageId:'',
      newPage:'',
      time:'',
      oldTime:''
    }
  },
  watch:{
      newPage:function(val)
      {   
           if(val!==this.pageId)
            {

                this.getInfo()
                this.$store.dispatch('getGoods')
                this.pageId=val
                this.empty()
            }
        
      }
  }, 
  created() {
       this.getInfo()
       this.$store.dispatch('getGoods')
       this.pageId=this.$route.params.id  
        console.log(this.pageId)
  },
  components: {
    vHeader
  },
  methods:{
     getInfo()
     {
        info.id=this.$route.params.id  
        info.date=this.$route.query.date
        this.$store.commit('setInfo',info);
     },
      empty() {
       this.$http({
           method:'post',
           url:this.URL+'/app/cartClear',
           params:{userId:localStorage.clientId,storeId:this.$route.params.id}
           }).then(res=> {
         
           });
        }
    }
 }
    
</script>

<style>
.hidden{overflow: hidden;}
.psTop{bottom:0;width:100%;}
 .gstab{ display:flex;width:100%;height:40px;line-height:37px; border:-1px solid rgba(7,17,27,0.1);background:#fff;position: relative;}
 .tab-item{flex:1;text-align:center}
 a{ display:block; font-size:14px; color:rgb(77,85,93)}
/* .active{font-size:14px; color:rgb(240,20,20)}  */
.gstab:after {display: block;position: absolute;left: 0;bottom: 0;width: 100%;border-top: 1px solid rgba(7,17,27,0.1);content: '';}
.gstab .tab-item { -ms-flex: 1;flex: 1;text-align: center;}
.gstab .tab-item a {display: block;font-size: 14px;color: #4d555d;}
.gstab .tab-item a.cur {color: #21c883;border-bottom:2px solid #21c883;}
  ::-webkit-scrollbar {
         width:0px; }
</style> 


