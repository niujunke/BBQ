
<template>
  <div class="comment">
      <div class="user_state">
            <div class="user_pc">
               <!-- <router-link to="/userInfo" v-if="userInfo.avatar"><img :src="URL+'/'+userInfo.avatar" ></router-link> -->
              <img src="../assets/images/us.png" >
            </div>
            <div class="user_name" ><span>大烤倌配送员</span></div>
      </div>
      <div class="stars">
           <p>为配送打分</p>
           <p class="all frist" >
            <input type="radio" name="a" value="0"  v-model="inputdata"/>
            <span>★</span>
            <input type="radio" name="a" value="1" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="a" value="2" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="a" value="3" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="a" value="4" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="a" value="5" v-model="inputdata" />
            <span>★</span>
        </p>
      </div>
     <div class="divider"></div> 
      <div class="user_state">
            <div class="user_pc">
              <img :src="URL+'/'+store.logoUrl" >
            </div>
            <div class="user_name" ><span>{{store.store_name}}</span></div>
      </div>
      <div class="stars">
          <p class="all" >
            <input type="radio" name="b" value="0"  v-model="stars"/>
            <span>★</span>
            <input type="radio" name="b" value="1" v-model="stars" />
            <span>★</span>
            <input type="radio" name="b" value="2" v-model="stars" />
            <span>★</span>
            <input type="radio" name="b" value="3" v-model="stars" />
            <span>★</span>
            <input type="radio" name="b" value="4" v-model="stars" />
            <span>★</span>
            <input type="radio" name="b" value="5" v-model="stars" />
            <span>★</span>
        </p>
      </div>
       <div class="goodsInfo">
           <div class="remark">
                 <textarea placeholder="写下您对配送和商家的评价吧~" v-model="msg" ></textarea>
           </div>
      </div>
          <ul class="photos ">
              <li> 
                  <div class="photo" v-for="(item,index) in images"><img :src="item"><span class="del" @click="del(index)"></span></div> 
              </li>
              <li class="file_pc"> 
                <img src="../assets/images/photo.png" >
                 <form id="fileForm"  enctype="multipart/form-data" >
                    <input type="file" name="file_head" accept="image/*" capture="camera" id="img"  @change="onFileChange">
                 </form>
              </li>
          </ul>
     
      <div class="btn">
         <mt-button type="default" size="large" @click="uploadImage">提交评论</mt-button>
     </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {Button,MessageBox} from 'mint-ui';
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('setHeadTitle', '评价');
        vm.$store.commit('showRank', true);
        vm.getStore()
      });
    },
    beforeRouteLeave(to, from, next){
       this.$store.commit('setHeadTitle', '');
       this.$store.commit('showRank', true);
      next()
    },
    watch: {
            inputdata(value) {
                console.log(value)
                this.evaluateValueShip=value
            },
             stars(value) {
                console.log(value)
                this.evaluateValueStore=value
            }
        },
    data(){
      return{
        msg:'',
        images: [],
        dataImg:[],
        store:{},
        inputdata:5,
        stars:5,
        evaluateValueShip:null,
        evaluateValueStore:null
      }
    },
   
   methods:{
       onFileChange(e)
          {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.createImage(files); 

            },
            createImage(file)
             {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();         
                var vm = this;
                var leng=file.length;
                for(var i=0;i<leng;i++)
                {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    let imgs=e.target.result.split(',')
                     
                    vm.images.push(e.target.result);  
                    vm.dataImg.push(imgs[1])                                  
                    };    
                              
                }   
                console.log(this.images)              
            },
             uploadImage()
             {
                console.log(this.dataImg)
                var formData=new FormData();
                formData.append('photos',this.dataImg)
                formData.append('userId',localStorage.clientId)
                formData.append('orderId',this.$route.query.id)
                formData.append('evaluateInfo',this.msg)
                formData.append('evaluateValueStore',this.evaluateValueStore)
                formData.append('evaluateValueShip',this.evaluateValueShip)
                console.log(formData)
                  let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                  };
                  this.$http.post(this.URL+'/app/orderEvaluate',formData,config)
                  .then(res=>{
                     if(res.data.code==0)
                     {
                       this.images=[];
                       this.msg='';
                       this.inputdata=5;
                       this.stars=5;
                     }
                  })        

            },
            getStore()
            {
                this.$http.get(this.URL+'/app/getSnameSlogo?storeId='+this.$route.query.id)
                  .then(res=>{
                    this.store=res.data.object
                    console.log(res);
                  })  
            },
            del(index)
            {
 
              if(this.images.length==1)
              {
                this.images=[]
              }
              else
              {
                  Vue.set(this.images, index, this.images.splice(this.images.indexOf(index)));
              }
              
               console.log(this.images)
            }
   }
}
</script>
<style>
.comment .user_state{background:#fff;border-bottom:1px solid #dcdcdc;padding:12px 15px}
.comment .user_name {color:#464646;}
.comment .user_state .user_pc img,.comment .user_state .user_pc{width:55px;height:55px;border:none;}
.stars{text-align:center;padding:15px 0}
.stars p{padding-bottom:15px;}
.comment .remark{padding-bottom:22px;}
.comment .remark textarea{margin-top: 10px;height:120px;}
.comment .btn{margin-top:0;margin-bottom:30px;}
.photos{padding:0 15px 30px;display:flex;}
.photos li img{width:60px;height:60px;margin-right:10px;}
.comment .file_pc input{width:60px;height:60px;position:absolute;right:0px;top:0;opacity:0;}
.photo{display:inline-block;position:relative;}
.photo .del{position:absolute;right: 5px;top: -10px;background:url(../assets/images/icon_del.png) no-repeat 15px 0;background-size: 23px auto;width: 40px;height: 40px;display: inline-block;}
/**/
.all>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}
.all>input:nth-of-type(1),
.all>span:nth-of-type(1){display:none;}
.all>span{font-size:3em;color:#fdd47c;
    -webkit-transition:color .2s;
    transition:color .2s;
}
.all>input:checked~span{color:#cdd2d8;}
.all>input:checked+span{color:#fdd47c;}
</style>
