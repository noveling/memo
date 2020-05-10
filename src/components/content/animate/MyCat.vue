<template>
  <div class="mycat" @click="clickCat">
    <div class="img-wrap" ref="mycat"><img src="~assets/img/cat.png" alt="..."></div>
  </div>
</template>
<script>
import anime from "animejs"
export default {
  methods:{
    run(){
      return new Promise((resolve)=>{
        anime({
          targets:this.$refs.mycat,
          scale:.9,
          loop:true,
          duration:1000,
          direction: 'alternate',
          opacity:.8,
          easing:'linear'
        })
      })
    },
    clickCat(){
      this.$bus.$emit("catClick")
    }
  },
  mounted(){
    this.run()
  }
}
</script>

<style lang="stylus" scoped>
  img
    width 100%
  .mycat
    position fixed
    bottom 10px
    left 0
    width 130px
    height 150px
</style>
