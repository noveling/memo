<template>
  <div id="app">
    <transition :name="transitionName"><router-view class="Router"/></transition>
  </div>
</template>

<script>
import cache from "@/common/utils/cache"
import {mapMutations} from "vuex"
export default {
  name: 'App',
  methods:{
    ...mapMutations(['SET_DEFAULT_EVENT'])
  },
  data(){
    return {
      transitionName:''
    }
  },
  mounted(){
    this.SET_DEFAULT_EVENT(JSON.parse(cache.getLocal('eventList'))||[])
  },
  watch:{
    '$route'(){
      if(this.$router.isBack){
        this.transitionName = 'slide-right'
      }else{
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.Router 
  width 100%
  height 100%
  transition all .3s ease

 .slide-right-leave-active
  transform translate(100%,0)

.slide-left-leave-active
  transform translate(-100%,0)

.slide-right-enter-active,.slide-left-enter-active
  opacity .6
</style>