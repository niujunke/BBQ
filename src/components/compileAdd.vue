<template>
  <div class="user_info">
    <div class="cont">
        <div class="setps set">
          <div class="title">联系人</div>
          <mt-cell title="姓名：" >
            <input type="text" placeholder="请输入姓名" v-model="user.name">
          </mt-cell>
          <mt-cell title="手机：" >
            <input type="tel" placeholder="请输入收货手机号" v-model="user.phone">
          </mt-cell>
           <div class="title">收货地址</div>
          <mt-cell title="地区：" @click.native="openPicker()">
            <input type="text" placeholder="请输入城市地区" v-model="areaText">
          </mt-cell>
          <mt-cell title="详细地址：" >
            <input type="text" placeholder="请输入小区楼号门牌号" v-model="user.areaInfo">
          </mt-cell>
      </div>   
     <div class="btn">
         <mt-button type="default" size="large" @click="addressAdd">确认</mt-button>
     </div>
    </div>
    <cityList :citys="selectedCity" v-if="selectedCity" ref="myAdd"></cityList>
  </div>
</template>

<script>
import {Button,Toast} from 'mint-ui';
import cityList from './cityList/cityList'
import { mapGetters } from 'vuex'
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '修改收货地址');
        vm.inint()
        console.log(vm.addData)
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
       this.$nextTick(() => {
                this.$refs.myAdd.showDetail=false
              })
      next()
    },
    components: {
      cityList
  },
   computed:mapGetters(['addData']),
    data(){
       return{
        areaText:'',
        areaId:null,
        selectedCity:[],
        user:{
          name:'',
          phone:null,
          areaInfo:''
        }
       }
    },
    created() {
      this.$root.eventHub.$on('area',function (m) {
        this.areaText=m.area
        this.user.areaId=m.id
      }.bind(this))
     this.inint()
  },
    methods:{
      inint()
      {
          this.user.name=this.addData.trueName
          this.user.phone=this.addData.mobile
          this.areaText=this.addData.appArea.areaName
          this.user.areaInfo=this.addData.area_info
      },
       openPicker()
        {
           
           this.$http.get(this.URL+'/app/getAreas').then((res)=>{
            console.log(res)
              this.selectedCity= res.data.object
              this.$nextTick(() => {
                this.$refs.myAdd.showToggle()
              })
           })
        },
        addressAdd()
        {
           var id=this.user.areaId?this.user.areaId:this.addData.appArea.id
           console.log(id)
           this.$http({
             method:'post',
             url:this.URL+'/app/addressUpdate',
             params:{userId:localStorage.clientId,trueName:this.user.name,mobile:this.user.phone,area:id,areaInfo:this.user.areaInfo,id:this.addData.id,token:localStorage.token}
             }).then(res=> {
                Toast(res.data.msg);
                if(res.data.code==0)
                {
                  this.$router.push({path:'/userAdd'})  
                  this.user.name=''
                  this.user.phone=''
                  this.areaText=''
                  this.areaInfo=''
                }
                console.log(res)
             });
        }
    }
}
</script>
<style>
.user_info .title{padding:10px 20px;}
.user_info  .setps .mint-cell-title{width:auto;padding-right: 10px;}
.user_info .detailWrapper.citys{top:52px;background:#eee;}
.user_info .detailWrapper.citys .cityDetail .info{padding:0;}
.user_info .detailWrapper.citys .cityDetail .info li{line-height:40px;padding:0 10px;border-bottom:1px solid #ddd;}
.cityInfo{line-height:40px;background:#999;padding:0 10px;position:fixed;top:51px;left: 0;width:100%;}
.cityInfo .city_text{color:#eee;}
.city_btn button{margin-left:10px;}
.cityDetail{overflow: auto;height:100%;}
.pt{padding-top: 40px;}
</style>
