<template>
  <div class="refund postponed">
       <div class="goodsInfo">
            <div class="info_list"><span class="gray">原预定时间</span></div>
            <div class="info_list" ><span >{{datas.bookTime}}</span></div>
            <div class="divider"></div>
            <div class="info_list"><span class="gray">更改日期</span></div>
            <div class="date flex" @click="openPicker">
             <div class="input"><input type="text" name="year" v-model="y" readonly="readonly">年</div>
             <div class="input"><input type="text" name="month" v-model="m" readonly="readonly">月</div> 
             <div class="input"><input type="text" name="day" v-model="d" readonly="readonly">日</div>     
            </div>
            <div class="divider"></div>
            <div class="info_list"><span class="gray">扣除现金</span></div>
            <div class="info_list flex-sb"><span>食材损耗费</span><span>-￥{{datas.lose_fee}}</span></div>
            <div class="divider"></div>
            <div class="info_list"><span class="gray">退改签须知</span></div>
            <div class="info_list">
                 <p>
                    开烤前一天18点前，可免费改签</br>
                    开烤前一天18点后改签，需支付食材损耗费20元</br>
                    开烤前60分钟以内无法改签</br>
                    实际支付金额小于损耗费的无法改签</br>
                    开烤前一天18点前，可免费退款</br>
                    开烤前一天18点后退款，需支付食材损耗费20元</br>
                    开烤前60分钟以内无法退款</br>
                    实际支付金额小于损耗费的无法退款
                 </p>
            </div>
            <div class="divider"></div>
           <!--  <div class="caution"><i></i>安全提醒：请谨防钓鱼链接或诈骗电话</div> -->
            <div class="btn">
              <mt-button type="default" size="large" @click="rescheduled()">确认改签</mt-button>
            </div> 
       </div>
      <mt-datetime-picker ref="picker" type="date" @confirm="handleConfirm" year-format="{value} 年"  month-format="{value} 月"  date-format="{value} 日" :startDate="startDate" :endDate="endDate"> </mt-datetime-picker>
  </div>
</template>

<script>
import { Button,DatetimePicker,MessageBox } from 'mint-ui';
export default {
 beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '改签申请');
        vm.getLossFee()
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data()
    {
       return{
            y:null,
            m:null,
            d:null,
            startDate:null,
            endDate:null,
            datas:{}
       }
    },
    created()
    {
      this.getTime()
    },
    methods:{
      getTime()
        {
             var date=new Date();
             this.y=date.getFullYear();
             this.m=date.getMonth()+1;
             this.d=date.getDate();
             this.startDate=new Date(this.y,this.m-1,this.d+1);
             this.endDate=new Date(this.y,this.m-1,this.d+15);
        },
        openPicker() 
        {
          this.$refs.picker.open();     
        },
        handleConfirm(value)
        {
          var d=new Date(value)
          this.y=d.getFullYear()
          this.m=d.getMonth()+1
          this.d=d.getDate()
        },
         getLossFee()
        {
            this.$http({
             method:'post',
             url:this.URL+'/app/orderEndorse',
             params:{userId:localStorage.clientId,orderId:this.$route.query.orderId}
             }).then(res=> {
                 if(res.data.code==0)
                 { 
                    this.datas=res.data.object
                 }
                 else
                 {
                    MessageBox.alert(res.data.msg).then(action => {
                      this.$router.go(-1)
                     }); 
                 }
                 console.log(res)
             });
        },
        rescheduled()
        {
            this.$http({
             method:'post',
             url:this.URL+'/app/endorseSubmit',
             params:{userId:localStorage.clientId,orderId:this.$route.query.orderId,date:this.y+'-'+this.m+'-'+this.d}
             }).then(res=> {
                 if(res.data.code==0)
                 {
                     MessageBox.alert('改签成功！').then(action => {
                      this.$router.go(-1)
                     }); 
                 }
                 console.log(res)
             });
        }
    }
}
</script>
<style>
.postponed .btn{padding-top:20px;}
</style>
