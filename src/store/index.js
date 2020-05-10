import Vue from 'vue'
import vuex from 'vuex'
import cache from '@/common/utils/cache'

Vue.use(vuex)

const state = {
  event:[]
}
const getters = {
  todo(state){
    if(state.event.length>0){
      return state.event.filter((item,index,array)=>{
        return item.state == 1
      })
    }else{
      return []
    }
  },
  complete(state){
    if(state.event.length>0){
      return state.event.filter((item,index,array)=>{
        return item.state == 2
      })
    }else{
      return []
    }
  },
  cancel(state){
    if(state.event.length>0){
      return state.event.filter((item,index,array)=>{
        return item.state == 0
      })
    }else{
      return []
    }
  },
  todoCount(state,getters){
    if(getters.todo&&getters.todo.length>0){
      return getters.todo.length
    }else{
      return 0
    }
  },
  completeCount(state,getters){
    if(getters.complete&&getters.complete.length>0){
      return getters.complete.length
    }else{
      return 0
    }
  },
  cancelCount(state,getters){
    if(getters.cancel&&getters.cancel.length>0){
      return getters.cancel.length
    }else{
      return 0
    }
  },
}
const mutations = {
  SET_DEFAULT_EVENT(state,val){
    state.event = val
  },
  ADD_INTO_EVENT(state,val){
    state.event.unshift(val)
    cache.setLocal("eventList",state.event)
  },
  REMOVE_FROM_EVENT(state,index){
    state.event.splice(index,1)
    cache.setLocal("eventList",state.event)
  },
  CANCEL_STATE(state,index){
    let newVal = state.event[index]
    newVal.state = 0
    Vue.set(state.event,index,newVal)
    cache.setLocal("eventList",state.event)
  },
  COMPLETE_STATE(state,index){
    let newVal = state.event[index]
    newVal.state = 2
    Vue.set(state.event,index,newVal)
    cache.setLocal("eventList",state.event)
  },
  TODO_STATE(state,index){
    let newVal = state.event[index]
    newVal.state = 1
    Vue.set(state.event,index,newVal)
    cache.setLocal("eventList",state.event)
  },
}
const actions = {
  REMOVE_BY_TIME({commit,state},payload){
    let index = state.event.findIndex(item=>{
      return item.time == payload.time &&item.date == payload.date
    })
    commit('REMOVE_FROM_EVENT',index)
  },
  CANCEL_BY_TIME({commit,state},payload){
    let index = state.event.findIndex(item=>{
      return item.time == payload.time &&item.date == payload.date
    })
    commit('CANCEL_STATE',index)
  },
  COMPLETE_BY_TIME({commit,state},payload){
    let index = state.event.findIndex(item=>{
      return item.time == payload.time &&item.date == payload.date
    })
    commit('COMPLETE_STATE',index)
  },
  RENEW_BY_TIME({commit,state},payload){
    let index = state.event.findIndex(item=>{
      return item.time == payload.time &&item.date == payload.date
    })
    commit('TODO_STATE',index)
  },
}
export default new vuex.Store({
  state,
  mutations,
  getters,
  actions
})