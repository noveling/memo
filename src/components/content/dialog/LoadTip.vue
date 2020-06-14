<template>
  <div class="load-data">
    <div class="title">提示</div>
    <div class="content">
      <p>只允许上传由侧边栏下载的notepad.txt文件</p>
      <p v-if="up_suc">数据读取成功，是否导入？</p>
      <p v-if="up_err">上传失败，只允许notepad.txt文件</p>
      <input type="file" accept="*.txt" ref="myfile" @change="upload">
    </div>
    <div class="dialog-btns">
      <button type="button" class="cancel-btn" @click="cancelLoad">取消</button>
      <button type="button" class="sure-btn" @click="toLoad">确定</button>
    </div>
  </div>  
</template>

<script>
import {mapMutations} from "vuex"
export default {
  data(){
    return {
      up_suc:false,
      up_err:false,
      events:''
    }
  },
  methods:{
    ...mapMutations(['SET_DEFAULT_EVENT']),
    cancelLoad(){
      this.$emit('cancel')
    },
    upload($event){
      let files = $event.srcElement.files
      let reader = new FileReader()
      if(files[0] && files[0].name.indexOf('notepad') !== -1){
        reader.onload = (ev)=>{
          this.up_err = false
          this.up_suc = true
          this.events = ev.target.result
        }
        reader.readAsText(files[0])
      }else{
          this.up_suc = false
          this.up_err = true
      }
    },
    toLoad(){
      let events = []
      if(this.up_suc == false){
        this.up_err = true
      }else{
        try{
          events = JSON.parse(this.events)
          this.SET_DEFAULT_EVENT(events)
          this.$emit('success')
        }catch(error){
          this.up_err = true
        }
        this.$refs.myfile.value = ''
        this.up_suc = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .load-data
    width 300px
    background-color #ffffff
    border 1px solid #eee
    border-radius 10px
    box-shadow 0 0 10px rgba(0,0,0,0.1)
    .title
      padding 20px 20px 0
      color #666
    .content
      text-align center
      padding 20px
      &>p
        font-size 11px
        line-height 25px
        padding 5px 0
        margin 0
      &>input
        margin-top 15px
        outline none
    .dialog-btns
      padding 10px 20px 15px
      text-align right
      font-size 0
      &>button
        width 50px
        background-color #ffffff
        border 1px solid #c0ccda
        outline none
        color #555
        border-radius 5px
        font-size 14px
        padding 7px 0
        letter-spacing 2px
      .sure-btn
        margin-left 10px
        border 1px solid #f4b976
        background #f4b976
        color #ffffff
</style>
