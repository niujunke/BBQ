import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import mint from 'mint-ui'
import Axios from 'axios'
import wx from 'weixin-js-sdk'
import 'mint-ui/lib/style.css'
import './assets/css/neat-min.css'
import './assets/css/style.css'
import vueSee from 'vue-see'
/*import vuePicturePreview from 'vue-picture-preview'*/

Vue.prototype.$http=Axios
//Vue.prototype.URL='http://dakaoguan.0379city.com/dkg'
Vue.prototype.URL='http://192.168.1.108:8888/shopping'
Vue.prototype.SDKRegister = (that) => {
  // 接入微信JSSDK
  // 获取微信JSSDK配置
  let url =window.location.href.split('#')[0]
   console.log(url )
  that.$http({
     method:'post',
     url:'http://192.168.1.109:8888/shopping/app/wxConfig',
     //url:'http://dakaoguan.0379city.com/dkg/app/wxConfig',
     params:{url:url}
     }).then(res => {
     console.log(res)
      wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId:res.data.object.appId, // 必填，公众号的唯一标识
      timestamp: res.data.object.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.object.nonceStr, // 必填，生成签名的随机串
      signature: res.data.object.signature, // 必填，签名，见附录1
       jsApiList: [
         'onMenuShareTimeline',
         'onMenuShareAppMessage' // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
       ] 
    })
  })
 
}

Vue.use(mint)

Vue.use(vueSee)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
   data: {
    eventHub: new Vue()
  }
})
