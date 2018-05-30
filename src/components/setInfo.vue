<template>
  <div class="user_info">
     <div class="setps set">
          <mt-cell title="昵称" >
            <input type="text" placeholder="请输入昵称"  v-model="name">
          </mt-cell>
          <mt-cell title="生日"  @click.native="openPicker()">
            <input type="text" placeholder="请输入生日" v-model="birthday">
          </mt-cell>
     </div>
      <div class="btn">
         <mt-button type="default" size="large" @click="setInfo()">确认</mt-button>
     </div>
      <mt-datetime-picker ref="picker" type="date" v-model="pickerValue"  @confirm="handleConfirm" year-format="{value} 年"  month-format="{value} 月"  date-format="{value} 日" :startDate="startDate" :endDate="endDate"> </mt-datetime-picker>
  </div>
</template>

<script>
import {Cell,Button,MessageBox,DatetimePicker,Toast} from 'mint-ui';
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '修改个人信息');
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data(){
      return{
        name:'',
        birthday:null,
        pickerValue:new Date(),
        startDate:new Date('1900-01-01'), 
        endDate:new Date()
      }
    },
    methods:{
       openPicker() 
        {
          this.$refs.picker.open();     
        },
         handleConfirm(value)
        {
           var d=new Date(value)
            this.birthday = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()  
        },
       setInfo()
       {
          if(!this.name)
             { 
                MessageBox('提示', '请输入昵称');
                return
             }
             else if(!this.birthday)
             {
                MessageBox('提示', '请输入生日');
                return
             }
              this.$http({
               method:'post',
               url:this.URL+'/app/nickName',
               params:{userId:localStorage.clientId,nickName:this.name,birthday:this.birthday,token:localStorage.token}
               }).then(res=> {
                  if(res.data.code==-1)
                  {
                    MessageBox('提示', res.data.msg);
                    return
                  }
                  else
                  {
                     Toast('修改成功！');
                     this.$router.push({path: '/userInfo'})
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
