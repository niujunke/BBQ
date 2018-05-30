<template>
  <div class="user_info">
     <div class="set">
          <mt-cell title="头像"  is-link class="file_pc" >
               <div class="user_pc"><!-- <img :src="URL+'/'+user.avatar"> --><img :src="user.avatar"></div>
              <!--  <input type="file" accept="image/*"> -->
               <input type="file" name="file_head" accept="video/*;capture=camcorder" id="img"  @change="onFileChange">
          </mt-cell>
          <mt-cell title="手机号" :value="user.phone" is-link></mt-cell>
          <mt-cell title="昵称" :value="user.nickName" is-link to="/setInfo"></mt-cell>
          <mt-cell title="生日" :value="user.birthday" is-link to="/setInfo"></mt-cell>
     </div>
  </div>
</template>

<script>
import {Cell,Button} from 'mint-ui';
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '个人信息');
        vm.getUser()
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    },
    data(){
     return{
       user:{},
       images: []
     }
    },
    methods:{
      getUser()
      {
        this.$http.post(this.URL+'/app/userInfo/'+localStorage.clientId+'').then((res)=>{
         this.user=res.data.object 
         })
      },
       onFileChange(e)
          {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)return; 
                this.createImage(files);
                console.log(files[0])
                this.uploadImage(files[0]) 
              
            },
            createImage(file)
             {
                if(typeof FileReader==='undefined'){
                    alert('您的浏览器不支持图片上传，请升级您的浏览器');
                    return false;
                }
                var image = new Image();         
                var vm = this;
                 vm.images=[]
                var leng=file.length;
                for(var i=0;i<leng;i++)
                {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]); 
                    reader.onload =function(e){
                    vm.images.push(e.target.result);                                    
                    };    
                    console.log(vm.images)             
                }   
                              
            },
             uploadImage(obj)
             {
               
                //return false;
                //var obj = {};
               // obj.images=this.images
               console.log(obj);
                this.$http({
                 method:'post',
                 url:this.URL+'/app/avatar',
                 headers:{'Content-Type':'multipart/form-data'},
                 params:{userId:localStorage.clientId,avatar:obj}
                 }).then(res=> {
                  console.log(res)
                 });
            }
     /* fle()
      {
         var pic = document.getElementById('img').value
          if(pic)
          {
             console.log(pic)
            this.$http({
             method:'post',
             url:this.URL+'/app/app/avatar',
             params:{userId:localStorage.clientId,avatar:pic}
             }).then(res=> {
              console.log(res)
             });
          }
       
      }*/
    }
}
</script>
<style>
.user_info .user_pc{width:35px;height:35px;}
.user_info .user_pc img{border-radius:50%;}
.file_pc{position:relative;}
.file_pc input{width:35px;height:35px;position:absolute;right:46px;top:0;opacity:0;}
</style>
