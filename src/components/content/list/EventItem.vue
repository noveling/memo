<template>
  <div class="item">
    <div class="event">
      <div class="txt">
        <div class="desc">{{event.content}}</div>
        <div class="time">
          <div class="clock">{{event.time}}</div>
          <div class="date">{{event.date}}</div>
        </div>
      </div>
      <div class="iconfont more" @click="toActive" :class="{active:isActive}"><span class="icon-more"></span></div>
    </div>
    <transition name="animate">
      <div class="tool" v-show="isActive">
        <slot name="tool">
          <div class="tool-wrap">
            <div class="iconfont todo" @click="renewEvent"><span class="icon-Renewableenergy"></span></div>
            <div class="iconfont delete" @click="removeEvent"><span class="icon-delete"></span></div>
          </div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isActive:false
    }
  },
  props:{
    event:{
      default:()=>{}
    }
  },
  methods:{
    toActive(){
      this.isActive = !this.isActive
      this.$emit("itemState")
    },
    renewEvent(){
      this.$emit('renew',this.event)
    },
    removeEvent(){
      this.$emit('remove',this.event)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .active
    color $appColor
  .item
    width 100%
    background-color #ffffff
    border-radius 10px
    color #999
    padding 10px 2px 5px
    margin-bottom 6px
    font-size 15px
    .event
      display flex
      .txt
        flex 1
        display flex
        flex-direction column
        align-items center
        .desc
          width 285px
          text-ellipsis()
          text-align center
        .time
          display flex
          justify-content space-around
          font-size 10px
          color #ccc
          width 100%
          line-height 25px
      .more
        width 60px
        flex-center()
        font-size 20px
    .tool
      width 100%
      display flex
      height 33px
      border-top 1px solid rgba(204,204,204,0.212)
      .tool-wrap
        width 100%
        height 100%
        display flex
      .iconfont
        flex-center()
        flex 1
        border-left 1px solid rgba(204,204,204,0.212)
        color #ccc
        &:nth-child(1)
          border-left none
  .animate-enter-active
    animation bounce .2s 
  .animate-leave-active
    animation bounce .2s reverse
  @keyframes bounce {
    0%{
      height 5px
      opacity .1
    }
    100%{
      height 33px
      opacity .9
    }
  }
</style>
