<template>
  <div class="user_info">
     <div class="set">
          <mt-cell title="个人信息" to="/userInfo" is-link></mt-cell>
          <mt-cell title="密码设置" to="/passwordSet" is-link></mt-cell>
     </div>
  </div>
</template>

<script>
import {Cell,Button} from 'mint-ui';
export default {
  beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.commit('showRank', true);
        vm.$store.commit('setHeadTitle', '设置');
      });
    },
    beforeRouteLeave(to, from, next){
      this.$store.commit('showRank', false);
      this.$store.commit('setHeadTitle', '');
      next()
    }
}
</script>
<style>
.user_info .user_pc{width:35px;height:35px;}
.user_info .user_pc img{border-radius:50%;}
</style>
