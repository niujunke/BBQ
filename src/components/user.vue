
<template>
  <div class="user p60">
      <div class="user_state">
            <div class="user_pc">
               <router-link to="/userInfo" v-if="userInfo.avatar"><img :src="userInfo.avatar" ></router-link>
               <router-link to="/userInfo" v-if="!userInfo.avatar"><img src="../assets/images/us.png" ></router-link>
            </div>
            <div class="user_name" v-if="state">
                  <router-link to="/userInfo"><span>{{userInfo.nickName}}</span></router-link>
                  账号：{{userInfo.phone}}
            </div>
      </div>
      <div class="user_menu flex">
           <router-link :to="state?'/collect':'login'" ><i class="sc"></i>我的收藏</router-link>
           <router-link :to="state?'/voucher':'login'" ><i class="j"></i>抵用券</router-link>
           <router-link :to="state?'/userAdd':'login'"><i class="dz"></i>我的地址</router-link>
           <!-- <router-link to="" ><i class="help"></i>客服中心</router-link> -->
      </div>
     <div class="set">
          <mt-cell title="设置"  is-link :to="state?'/userSet':'login'"></mt-cell>
        <!--   <mt-cell title="产品反馈" to="/feedback" is-link></mt-cell> -->
          <!-- <mt-cell title="关于大烤倌"  is-link></mt-cell> -->
     </div>
     <div class="btn">
         <mt-button type="default" size="large" @click="quit">{{state?'退出登录':'登录'}}</mt-button>
     </div>
     
  </div>
</template>

<script>
import {Cell,Button,MessageBox} from 'mint-ui';
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.getUser()
        vm.$store.commit('setHeadStyle', {background: 'rgba(33,200,131,0)'});
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('setHeadStyle', {background: 'rgba(33,200,131,1)'});
      next()
    },
    data(){
      return{
        userInfo:{},
        state:false
      }
    },
    created() {
     
   },
   methods:{
    getUser()
    {
       if(localStorage.clientId)
       {
          this.state=true
          this.$http.post(this.URL+'/app/userInfo/'+localStorage.clientId+'').then((res)=>{
           console.log(res);
           this.userInfo=res.data.object
          })   
       } 
    },
     quit()
     { 
         if(this.state)
         {
            MessageBox.confirm('确定退出?').then(action => {
            this.$http({
               method:'post',
               url:this.URL+'/app/logout',
               params:{userId:localStorage.clientId}
               }).then(res=> {
                localStorage.clientId=''
                localStorage.token=''
                 this.userInfo={}
                 this.state=false
                console.log(res)
              });
            });
         }
         else
         {
             this.$router.push({path:'/login'}) 
         }
        
     }
   }
}
</script>
<style>
.user{position:absolute;top:0px;width:100%;}
.user_state{display:flex;align-items:center;background:url('../assets/images/bg.jpg') no-repeat;background-size: cover;padding:51px 26px 25px;color:#fff;}
.user_state .user_pc{width:70px;height:70px;border:2px solid rgba(255,255,255,0.8);border-radius:50%;margin-right:10px;}
.user_state .user_pc img{border-radius:50%;width:70px;height:70px;}
.user_name a{color:#fff;}
.user_name span{display: block;font-size:16px;padding-bottom:5px;}
.user_menu{padding:12px 0;border-width: 1px 0 1px;border-style: solid;border-color:#d6d6d6;margin:8px 0}
.user_menu i{width:21px;height:28px;display:block;margin:0 auto 5px;background:url('../assets/images/min_ic.png') no-repeat 0 -28px;background-size:74px auto;}
.user_menu i.sc{background-position:0px -26px}
.user_menu i.j{background-position:-25px -26px}
.user_menu i.dz{background-position:-50px -25px}
.user_menu i.help{background-position:0px -51px;width:28px;}
.user_menu a{border-right:1px solid #dfdfdf}
.user_menu a:last-child{border:none;}
.mint-cell{border-bottom:1px solid #dfdfdf}
.btn{padding:0 20px 20px;margin-top:24%; }
.btn .mint-button--default{background-color:#21c883;color:#fff;}
.set .mint-cell-wrapper{padding:0 20px;background: #fff;}
</style>
