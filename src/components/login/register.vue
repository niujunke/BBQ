<template>
  <div class="login register">
    <div class="tab-con">
         <div class="setps set">
            <mt-cell title="手机号" >
              <input type="tel" placeholder="请输入手机号"  maxlength="11" v-model="user.username">
            </mt-cell>
            <mt-cell title="验证码" >
              <input type="number" placeholder="请输入验证码" maxlength="5" v-model="user.code">
             <!--  <mt-button type="primary"  size="small" :class="{'code_number':rightPhoneNumber}"  @click.prevent="getVerifyCode">{{coedTxt}}</mt-button> -->
              <code-btn :rightPhoneNumber="rightPhoneNumber" :name="user.username"></code-btn>
            </mt-cell>
             <mt-cell title="密  码" >
              <input type="password" placeholder="请输入密码"  v-model="user.password">
            </mt-cell>
           </div>
            <div class="btn">
                 <mt-button type="default" size="large" @click="register()">注册</mt-button>
                 <div class="flex-sb">
                  <span></span>
                   <router-link to="/login">已有账号</router-link>
                 </div>
            </div>
              
     </div> 
     
  </div>
</template>

<script>
import {Cell,Button,MessageBox,Indicator } from 'mint-ui';
import codeBtn from '../getCode/code-btn'
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('setCss', 'show');
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '注册');
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('setCss', '');
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data(){
      return{
        user:{
          username:'',
          password:'',
          code:null
        }
      }
    },
    computed: {
            //判断手机号码
            rightPhoneNumber: function (){
                return /^((1[3-9]{1})+\d{9})$/gi.test(this.user.username)
            }
        },
    components: {
      codeBtn
    },
    methods:{
        register()
        {
           if(!this.rightPhoneNumber)
           { 
              MessageBox('提示', '手机号码不正确');
              return
           }
           else if(!(/^\d{5}$/gi.test(this.user.code)))
           {
              MessageBox('提示', '短信验证码不正确');
              return
           }
           else if(!this.user.password){
             MessageBox('提示', '请输入密码');
             return
          }
           else
           {
               Indicator.open({
                  text: '正在登录',
                  spinnerType: 'fading-circle'
                })
              this.$http({
               method:'post',
               url:this.URL+'/app/register',
               params:{username:this.user.username,password:this.user.password,code:this.user.code}
               }).then(res=> {
                  Indicator.close();
                  if(res.data.object==null)
                  {
                    MessageBox('提示', res.data.msg);
                    return
                  }
                  else
                  {
                     MessageBox('提示', '注册成功！');
                     localStorage.clientId=res.data.object.id 
                     this.$router.push({path: '/login'})
                  }
                   console.log(res)
               });
           }
         
        }
    }
}
</script>
<style>
.register .tab-con{padding-top:5px;}

</style>
