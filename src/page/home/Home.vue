<template>
  <div class="home">
    <nav-bar class="nav-bar">
      <div slot="left" class="iconfont"><span class="icon-cat1"></span></div>
      <div slot="center">Fancy Memo!</div>
    </nav-bar>
    <div class="content">
      <daily-list class="daily-list"></daily-list>
    </div>
    <my-cat></my-cat>
    <my-bubble></my-bubble>
    <my-note></my-note>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import DailyList from "./childComps/DailyList"
import MyCat from "components/content/animate/MyCat"
import MyBubble from "components/content/bubble/MyBubble"
import MyNote from "components/content/animate/MyNote"
export default {
  components:{
    NavBar,
    DailyList,
    MyCat,
    MyBubble,
    MyNote
  }
}
</script>

<style lang="stylus" scoped>
  .home
    position fixed
    top 0
    bottom 0
    right 0
    left 0
    background-image $themebg1
    .nav-bar
      background-color $appColor
      color #ffffff
      font-size 16px
      box-shadow 2px 1px 3px rgba(0, 0, 0, 0.1)
      .iconfont
        font-size 30px
    .content
      width 100%
      height 100%
      .daily-list
        position relative
        top 50%
        left 50%
        transform translate(-50%,-50%)
</style>
