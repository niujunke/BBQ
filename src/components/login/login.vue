<template>
  <div class="login">
      <div class="gstab">
        <div class="tab-item" :class="{'active':selected==1}"  @click="tabLog(1)">普通登录</div>
        <div class="tab-item" :class="{'active':selected==2}" @click="tabLog(2)">快捷登录</div>
    </div>
    <div class="tab-con" v-show="selected==1">
         <div class="setps set">
            <mt-cell title="账号" >
              <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="user.username">
            </mt-cell>
            <mt-cell title="密码" >
              <input type="password" placeholder="请输入密码" v-model="user.password">
            </mt-cell>
           </div>     
     </div> 
     <div class="tab-con" v-show="selected==2">
         <div class="setps set"  >
              <mt-cell title="手机号" >
                <input type="tel" placeholder="请输入手机号" maxlength="11" v-model="user.username">
              </mt-cell>
              <mt-cell title="验证码" >
                <input type="number" placeholder="请输入验证码"  maxlength="5" v-model="user.code">
                <code-btn :rightPhoneNumber="rightPhoneNumber" :name="user.username"></code-btn>
              </mt-cell>
         </div>
     </div>
       <div class="btn">
           <mt-button type="default" size="large" @click="login()">登录</mt-button>
            <div class="flex-sb">
             <router-link to="/register">注册</router-link>
             <router-link to="/findPs">忘记密码</router-link>
           </div>
      </div>
     
  </div>
</template>

<script>
import {Cell,Button,MessageBox,Indicator} from 'mint-ui';
import { mapState } from 'vuex'
import codeBtn from '../getCode/code-btn'
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('setCss', 'show');
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '登录');
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
     computed:{
      ...mapState(['selected']),
        //判断手机号码
        rightPhoneNumber: function (){
            return /^((1[3-9]{1})+\d{9})$/gi.test(this.user.username)
        }
     },
     components: {
      codeBtn
    },

    methods:{
      tabLog(index)
      {
         this.$store.commit('setSelected', index);
        console.log(this.selected)
      },
      login()
        {
           if(this.selected==1)
           {
               if(!this.rightPhoneNumber)
               { 
                  MessageBox('提示', '手机号码不正确');
                  return
               }
               else if(!this.user.password)
               {
                  MessageBox('提示', '请输入密码');
                  return
               }
           }
           else 
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
             
           }
               Indicator.open({
                  text: '正在登录',
                  spinnerType: 'fading-circle'
                })

              this.$http({
               method:'post',
               url:this.URL+'/app/login',
               params:{username:this.user.username,password:this.selected==1?this.user.password:'',code:this.user.code,isQuick:this.selected==2?'y':'',url:localStorage.url}
               }).then(res=> {
                  Indicator.close();
                  if(res.data.object==null)
                  {
                    MessageBox('提示', res.data.msg);
                    return
                  }
                  else
                  {
                    /* MessageBox('提示', '登录成功！');*/
                     localStorage.clientId=res.data.object.id 
                     localStorage.token=res.data.object.token
                     this.$http.get(this.URL+'/app/wxLogin').then((res)=>{
                        console.log(res)
                        if(res.data.code==0)
                        {
                            let url=res.data.object
                            window.location.href=url
                            
                        }
                      })
                     //this.$router.push({path: '/index'})
                  }
                   console.log(res)
               });
        }
    }
}
</script>
<style>
.login .setps .mint-cell-title{width:auto;padding-right: 20px;}
.login .setps{margin:15px 10px 0;border:1px solid #c0c0c0;border-radius:3px;}
.login .gstab div.active{border-bottom:2px solid #21c883;color:#21c883;}
.login .mint-cell{background: none}
.login .tab-con .mint-cell:last-child{border:none;}
.login .mint-cell-wrapper .code_number{background:#21c883;}
.login .mint-button--primary{padding: 0;font-size:12px;width:110px;background: #ddd;}
.login .mint-button--primary .mint-button-text{width:100%;display:inline-block;}
.login .btn{margin-top:6%;padding:0 10px;}
.login .btn .flex-sb a{color:#21c883;padding-top:10px;}
.login .mint-cell-wrapper{font-size:14px;}
.mint-msgbox .mint-msgbox-confirm{color:#21c883;}
</style>
