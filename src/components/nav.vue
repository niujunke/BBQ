<template>
  <div class="nav">   
      <router-link to="/index" >
        <div class="icon"><img src="../assets/images/nav/home.png"><img src="../assets/images/nav/home_cur.png" class="iscur"></div>
         首页
      </router-link>
      <router-link to="/bbq" >
        <div class="icon"><img src="../assets/images/nav/sk.png"><img src="../assets/images/nav/sk_cur.png" class="iscur"></div>
          烧烤
      </router-link> 
      <router-link to="/order" >
          <div class="icon"><img src="../assets/images/nav/dd.png"><img src="../assets/images/nav/dd_cur.png" class="iscur"></div>
          订单
       </router-link>
      <router-link to="/user" >
         <div class="icon"><img src="../assets/images/nav/my.png"><img src="../assets/images/nav/my_cur.png" class="iscur"></div>
         我的
       </router-link>
  </div>
</template>

<style>
.nav{position:fixed;bottom:0;left:0;right:0;display:flex;border-top:1px solid #ccc;background:#fff;}
.nav .icon{width:24px;height:24px;margin:0 auto 5px;}
.nav .icon img{width:100%;height:100%;}
.nav .icon img.iscur{display:none}
.nav a{flex: 1;text-align:center;padding:7px 0;color:#333;}
.nav a.cur{color:#05c981;}
.nav a.cur .icon img.iscur{display:block;}
.nav a.cur .icon img:first-child{display: none;}
</style>
