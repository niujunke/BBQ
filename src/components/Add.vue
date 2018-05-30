<template>
  <div class="user_info">
   <a class="mint-cell mint-field">  
          <div class="mint-cell-left"></div>  
          <div class="mint-cell-wrapper">  
            <div class="mint-cell-title">  
              <span class="mint-cell-text">所在地区</span>  
            </div>  
            <div class="mint-cell-value">  
              <div class="mint-cell-value is-link" @click="choiceArea">  
                <input placeholder="请选择省市" type="text" class="mint-field-core text-right" readonly="readonly" v-model="data.areaText">  
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>  
              </div>  
            </div>  
            <i class="mint-cell-allow-right"></i>  
            <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">  
              <div class="picker-toolbar">  
                <span class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</span>  
                <span class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</span>  
              </div>  
              <mt-picker :slots="citySlots" @change="onCityChange" :visible-item-count="3"></mt-picker>  
            </mt-popup>  
          </div>  
        </a>  
        <a class="mint-cell mint-field">  
          <div class="mint-cell-left"></div>  
          <div class="mint-cell-wrapper">  
            <div class="mint-cell-title">  
              <span class="mint-cell-text">详细地址</span>  
            </div>  
            <div class="mint-cell-value">  
              <div class="mint-cell-value">  
                <input placeholder="街道、楼牌号等" type="text" class="mint-field-core text-right" v-model="data.address">  
                <div class="mint-field-clear" style="display: none;"><i class="mintui mintui-field-error"></i></div>  
              </div>  
            </div>  
          </div>  
        </a>  
  </div>
</template>

<script>
import {Button,Picker,Toast} from 'mint-ui'; 
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '新增收货地址');
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data(){
       return{
        pick:false,
        popupVisible: false,  
        sexVisible: false,  
        areaPicker: '',  
        areaList:[],
        data: {  
          photo: '',  
          userName: '',  
          sex: '',  
          sexText: '',  
          mobile: '',  
          birthday: '',  
          privinceName: '',  
          provinceId: '',  
          cityName: '',  
          cityId: '',  
          address: '',  
          areaText: ''  
        },
        citySlots: [  
          {  
            flex: 1,  
            values: Object.keys(address),  
            className: 'slot1',  
            textAlign: 'center'  
          }, {  
            divider: true,  
            content: '-',  
            className: 'slot2'  
          }, {  
            flex: 1,  
            values: Object.values(address)[0],  
            className: 'slot3',  
            textAlign: 'center'  
          }  
        ],
    addressProvince: '',  
    addressProvinceId: '',  
    addressCity: '',  
    addressCityId: '' 
       }
    },
    created () {  
   
    this.loadAreaList()  
  },  
    methods:{
        loadAreaList: function () {  
          this.$http.get(this.URL+'/app/getAreas').then((res) => {
            console.log(res)
            if (res.data.object) {  
              this.areaList = res.data.object  
              var map=this.areaList
              address = this.areaList
          
            
             console.log(address)
              this.citySlots[0].values = address.object//Object.keys(address)  
              this.citySlots[2].values = Object.values(address)[0]  
            } else {  
              Toast('地区数据异常')  
            }  
          })  
        },  
        choiceArea: function () {  //选择
          this.popupVisible = true  

        },  
        cancleaddress: function () {  //取消
          this.popupVisible = false  
        },  
        selectaddress: function () {  //确定
          this.popupVisible = false  
          this.data.cityName = this.addressCity  
          this.data.privinceName = this.addressProvince 
          this.data.areaText = this.data.privinceName + this.data.cityName
        },
         onCityChange: function (picker, values) {  
        this.areaPicker = picker  
        picker.setSlotValues(1, address[values[0]])  
        console.log( values[0])
        this.addressProvince = values[0]
        this.addressCity = values[1] 
     

        console.log(address)
      }
    }
}
let address = {}  
let provinceCodeList = {}  
let cityCodeList = {}  
</script>
<style>
.user_info .title{padding:10px 20px;}
.user_info  .setps .mint-cell-title{width:auto;padding-right: 10px;}
.picker{background: #fff;}
.mint-popup{transition: all 0.5s}
.mint-popup-bottom{width:100%;}
</style>
