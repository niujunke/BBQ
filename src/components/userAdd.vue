<template>
  <div class="user_info">
    <div class="cont">
        <div class="add_list" v-for="(item,index) in address">
          <div class="add">
          <div class="flex-sb"><span>{{item.trueName}}</span><span>{{item.mobile}}</span></div>
          <p>{{item.appArea.areaName+item.area_info}}</p>
         </div>
         <div class="add_handle flex-sb">
              <span v-show="index<1" @click="setAdd(index,item)"><i class="radio" :class="{'cur':inow==index||inow==null}"></i>默认地址</span>
              <span  v-show="index>=1" @click="setAdd(index,item)"><i class="radio" :class="{'cur':inow==index}"></i>设为地址</span>
              <div><span class="compile" @click="compile(item)"><i></i>编辑</span><span class="empty" @click="delet(item.id,index)"><i></i>删除</span></div>
         </div> 
      <div class="divider"></div> 
    </div>

     <div class="btn">
         <mt-button type="default" size="large" @click="newAdd()">添加新地址</mt-button>
     </div>
    </div>
  </div>
</template>

<script>
import {Button,Toast } from 'mint-ui';
import Vue from 'vue'
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '管理收货地址');
        vm.getAdd()
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data(){
      return{
        address:[],
        inow:null
      }
    },
    methods:{
      newAdd()
      {
        this.$router.push({path:'/newAdd'})
      },
      getAdd()
      {
          this.$http.post(this.URL+'/app/address/'+localStorage.clientId+'').then((res)=>{
           this.address=res.data.object
           console.log(res)
          })
      },
      setAdd(index,item)
      {
         console.log(index)
         this.inow=index
         this.$http({
           method:'post',
           url:this.URL+'/app/updateDefault',
           params:{userId:localStorage.clientId,addressId:item.id}
           }).then(res=> {
              if(res.data.code==0)
              {
                 this.$router.go(-1);  
              }
           });
       /*  Vue.set(this.address[index],this.address[index],this.address.unshift(this.address[index]))
         Vue.set(this.address[index],this.address[index],this.address.splice(index+1, 1))*/
          /*　this.$nextTick(function () {
　　　　　　　　this.address.forEach(function (item) {
　　　　　　　　　　Vue.set(item,'active',false);
　　　　　　　　});
　　　　　　　　Vue.set(item,'active',true);
　　　　　　});*/ 
         //this.$router.go(-1);  
      },
      delet(id,index)
      {
           this.$http.post(this.URL+'/app/addressDelete/'+id+'').then((res)=>{
           Toast('删除成功')
           console.log(index)
            this.getAdd()
           this.address.splice(this.address.indexOf(index),1);
          })
      },
      compile(obj)
      {
         console.log(obj)
         this.$store.commit('setAdd', obj);
         this.$router.push({path:'/compileAdd'})  
      }
    }
}
</script>
<style>
.user_info{position: fixed;top:51px;left:0;bottom:0;background:#eee;width:100%;}
.add_list{background:#fff;}
.add {padding:15px 20px 5px;line-height:24px;}
.add .flex-sb{font-size:16px;}
.add p{color:#414141;}
.add_handle{padding:5px 20px;border-top:1px solid #ddd;}
.add_handle div span{padding-left:15px;}
.compile i{width:16px;height:24px;background:url('../assets/images/icons.png') no-repeat -48px -18px;background-size:64px auto;}
</style>
