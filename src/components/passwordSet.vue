<template>
  <div class="user_info">
     <div class="setps set">
          <mt-cell title="原密码" >
            <input type="text" placeholder="请输入原密码"  v-model="oldPs">
          </mt-cell>
          <mt-cell title="新密码" >
            <input type="text" placeholder="请输入新密码" v-model="newPs">
          </mt-cell>
           <mt-cell title="确认新密码" >
            <input type="text" placeholder="重复输入新密码" v-model="newPss">
          </mt-cell>
     </div>
      <div class="btn">
         <mt-button type="default" size="large" @click="setPs()">确认</mt-button>
     </div>
  </div>
</template>

<script>
import {Cell,Button,MessageBox} from 'mint-ui';
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '修改登录密码');
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data(){
      return{
        oldPs:null,
        newPs:null,
        newPss:null
      }
    },
    methods:{
       setPs()
       {
          if(!this.oldPs)
             { 
                MessageBox('提示', '请输入原密码');
                return
             }
             else if(!this.newPs)
             {
                MessageBox('提示', '请输入新密码');
                return
             }
              else if(this.newPs!==this.newPss)
             {
                MessageBox('提示', '二次密码输入不一致');
                return
             }
              this.$http({
               method:'post',
               url:this.URL+'/app/passwordModify',
               params:{id:localStorage.clientId,old_password:this.oldPs,new_password:this.newPs}
               }).then(res=> {
                  if(res.data.code==-1)
                  {
                    MessageBox('提示', res.data.msg);
                    return
                  }
                  else
                  {
                     MessageBox('提示', '修改成功！');
                     this.$router.push({path: '/login'})
                  }
                   console.log(res)
               });
       }
    }
}
</script>
<style>
.user_info .user_pc{width:35px;height:35px;}
.user_info .user_pc img{border-radius:50%;}
.setps .mint-cell-title{width:110px;flex: none;}
.setps .mint-cell-value{flex:1;}
.setps .mint-cell-value input{border:none;width:100%;outline:none}
</style>
