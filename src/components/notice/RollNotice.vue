<template>
  <div class="show-notice">
    <div class="notice-list ntice_list" :style="{transform: 'translateY(-'+noticePosition+'px) translateZ(0px)'}"  ref="roll">
      <p v-for="notice in noticess"   class="ellipsis ntice_txt" ><router-link :to="'/article/'+notice.id">{{notice.title}}</router-link></p>
    </div>
  </div>
</template>

<script>
import rAF from '../../utils/rAF.js'
export default {
  name: 'RollNotice',
  props: {
    notices: Array
    
  },
   computed: {
    noticess() {
       this.notices.push(this.notices[0])
      if(this.notices[0])
      {
        return  this.notices;
      }
      
       
    }
  },
  data () {
    return {
      noticePosition: 0// 列表位置,
    }
  },
  mounted () {
    
    let destination = 22
    setInterval(() => {
      if (destination / 22 < this.notices.length) {
        this.move(destination, 500)
        destination += 22
      } else { // 列表到底
        this.noticePosition = 0 // 设置列表为开始位置
        destination = 22
        this.move(destination, 500)
        destination += 22
      }
    }, 2500)
  
  },
  methods: {
    move (destination, duration) { // 实现滚动动画
      let speed = ((destination - this.noticePosition) * 1000) / (duration * 44)
      let count = 0
      let step = () => {
        this.noticePosition += speed
        count++
        //console.log(this.noticePosition)
        rAF(() => {
          if (this.noticePosition < destination) {
            step()
          } else {
            this.noticePosition = destination
          }
        })
      }
      step()
    }
  }
}
</script>
