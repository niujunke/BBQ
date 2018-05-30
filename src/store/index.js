import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import {Indicator} from 'mint-ui' 
Vue.use(Vuex)
Vue.use(Axios)
//const URL='http://dakaoguan.0379city.com/dkg'
const URL='http://192.168.1.108:8888/shopping'
const store=new Vuex.Store({
	state:{//状态数据
         shop:[],
         photos:[],
         hotShop:[],
         goods:{},
         isPlay:true,
         audioLoadding: false,
         showPlayer: false,
         detailPlayerFlag: false,
         selected:1,
         head: {
  	        toggle: true,
            rank:false,
            isOk:false,
            isSch:false,
            show:false,
            isShare:false,
  	        title: '',
            cityName:'',
  	        style: {'background': 'rgba(33,200,131,1)'}
	      },
        Pays:{
            orderId:null,
            storeLogo:'',
            storeName:'',
            totalPrice:null
        },
        info:{
            id:null,
            date:null
        },
        addData:{},
        orderNum:{
            
        }
	},
	getters:{//获取数据
        shop:state=>state.shop,
        head:state=>state.head,
        photos:state=>state.photos,
        hotShop:state=>state.hotShop,
        goods:state=>state.goods,
        Pays:state=>state.Pays,
        addData:state=>state.addData
	},
	actions:{//处理你要干什么，异步请求，判断，流程控制--函数提交给mutations//commit提交
		getShops({commit,state},keyword)
		{      
             Axios({
             method:'post',
             url:`${URL}/app/search?keyword=${keyword}`,
           /* url:`http://192.168.1.109:8888/shopping/app/search?keyword=${keyword}`,*/
             params:{lat:localStorage.lat,lng:localStorage.lng,name:localStorage.city}
             }).then(res=> {
                var json_obj =res.data.object;
               commit('setShops',json_obj)
              
             });
            console.log(localStorage.lat)
           
		},
    getHotShops({commit,state})
    {      
             Axios({
             method:'post',
             url:`${URL}/app/storesRecommend`,
           /* url:'http://192.168.1.109:8888/shopping/app/storesRecommend',*/
             params:{lat:localStorage.lat,lng:localStorage.lng,name:localStorage.city}
             }).then(res=> {
                console.log(res)
                var json_obj =res.data.object;
                Indicator.close();
                commit('setHotShops',json_obj)
             });
    },
    getGoods({commit,state})
    {      
             var lng=localStorage.lng
             var lat=localStorage.lat
             Axios({
             method:'post',
             url:''+URL+'/app/store?id='+state.info.id+'&lat='+lng+'&lng='+lat+'&date='+state.info.date
            /*url:'http://192.168.1.109:8888/shopping/app/store?id='+state.info.id+'&lat='+lng+'&lng='+lat+'&date='+state.info.date*/
             }).then(res=> {
                var json_obj =res.data.object;
                 console.log(res)
                commit('setGoods',json_obj)
             });
          
    }
	},
	mutations:{//处理状态，数据变化
        isPlay:(state,flag)=>{
        	state.isPlay=flag;
        },
        showHead(state, flag){
          state.head.toggle = flag;
        },
        setHeadTitle(state, title){
          state.head.title = title;
        },
        setHeadStyle(state, style){
          state.head.style = style;
        },
        showRank(state,flag){
          state.head.rank=flag;
        },
        showOk(state,flag){
          state.head.isOk=flag;
        },
        showPIN(state,flag){
          state.head.isShare=flag;
        },
        showSearch(state,flag){
          state.head.isSch=flag;
        },
        setShops(state,data){
            state.shop=data
        },
        setPhoto(state,arr){
            state.photos=arr
        },
        setHotShops(state,data){
            state.hotShop=data
        },
        setGoods(state,data){
           state.goods=data
        },
        setSelected: (state, index)=> {
          state.selected = index;
        },
        setCss:(state,css)=>{
          state.head.show=css
        },
        setPays:(state,data)=>{
          state.Pays=data
        },
        setInfo:(state,{id,date})=>{
            state.info.id = id;
            state.info.date = date;
        },
         setAdd:(state,data)=>{
            state.addData=data;
        },
        setCity:(state,data)=>{
            state.head.cityName=data;
        }
   }
});

export default store;