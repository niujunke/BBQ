<template>
 <mt-button type="primary"  size="small" :class="{'code_number':rightPhoneNumber}"  @click.prevent="getVerifyCode">{{coedTxt}}</mt-button>
</template>

<script>
import {Button,MessageBox} from 'mint-ui';
export default {
     props: {
      rightPhoneNumber: {
        type: Boolean
      },
      name
    },
    data(){
      return{
        computedTime:0,
        coedTxt:'发送验证码'
      }
    },  
    methods:{
        getVerifyCode()
        {
           console.log(this.name)
           if (this.rightPhoneNumber)
           {
              this.$http({
               method:'post',
               url:this.URL+'/app/getSmsCode',
               params:{phone:this.name}
               }).then(res=> { 
                console.log(res)
                 if(res.data.code==-1)
                 {
                    MessageBox('提示', res.data.msg);
                    return
                 }
                 else
                 {
                     this.computedTime = 30;
                     this.timer = setInterval(() => {
                          this.coedTxt='已发送'+this.computedTime+'s'
                          this.computedTime --;
                          if (this.computedTime == 0) {
                              this.coedTxt="发送验证码"
                              clearInterval(this.timer)
                          }
                      }, 1000)
                 }        
              
               });
             
             
           }
        }    
    }
}
</script>

