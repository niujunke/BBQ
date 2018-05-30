<template>
    <div class="notify">
       <div class="notify_cont">
           <h3 class="">{{cont.title}}</h3>
           <div class="text">
                 <p>{{cont.content}}</p>
           </div>
       </div>
       
    </div>
</template>

<script>
 export default{
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '公告详情');
        vm.getNotice()
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
          cont:{}
       }
    },
    methods:{
       getNotice()
          {
              this.$http.get(this.URL+'/app/noticeInfo?id='+this.$route.params.id)
                .then(res=>{
                  this.cont=res.data.object
                  console.log(res);
                })  
          }
    }
 }
</script>
<style>

</style>
