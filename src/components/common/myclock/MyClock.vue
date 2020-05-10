<template>
  <div class="my-clock">
    <div class="date">{{date}}</div>
    <div class="time">{{time}}</div>
  </div>  
</template>

<script>
export default {
  data(){
    return {
      date:"",
      time:"",
      week:['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    }
  },
  methods:{
    updataTime(){
      let now = new Date()
      this.time = this.fillZero(now.getHours(),2) + ':' + this.fillZero(now.getMinutes(),2) + ':' + this.fillZero(now.getSeconds(),2)
      this.date = this.fillZero(now.getFullYear(),4) + '-' + this.fillZero(now.getMonth()+1,2) + '-' + this.fillZero(now.getDate(),2) + ' ' + this.week[now.getDay()]
    },
    fillZero(val,num){
      let ex = ''
      for(let i=0; i < num; i++){
        ex ='0'+ex
      }
      return (ex + val).slice(-num)
    }
  },
  created(){
    const timer = setInterval(this.updataTime,1000)
  }
}
</script>

<style lang="stylus" scoped>
  .my-clock
    font-family $themefont
    text-shadow: 0 0 10px #15a03a, 0 0 20px rgba(10, 175, 230, 0)
    width 100%
    height 100%
    color #daf6ff
    text-align center
    .date
      width 100%
      font-size 25px
      letter-spacing 2px
    .time
      width 100%
      font-size 35px
      letter-spacing 2px
</style>
