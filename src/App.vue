<template>
  <div id="app">
    <top-header></top-header>
    <div class="main">
       <keep-alive>
        <router-view></router-view>
       </keep-alive>
      <!--  <lg-preview class="lg-preview"  isTitleEnable="false" ></lg-preview> -->
    </div>
    
    <nav-bar v-show="$route.meta.navShow"></nav-bar>
  </div>
</template>

<script>
import topHeader from './components/header/head'
import navBar from './components/nav'

export default {
  name: 'app',
  components:{
    topHeader,navBar
  }

}
</script>

