import Vue from 'vue'
import Router from 'vue-router'


const Home = ()=>import("page/home/Home")
const Edit = ()=>import("page/edit/Edit")
const List = ()=>import("page/list/List")
const Todo = ()=>import("page/todo/Todo")
const Complete = ()=>import("page/complete/Complete")
const Cancel = ()=>import("page/cancel/Cancel")

Vue.use(Router)

Router.prototype.goBack = function(){
  this.isBack = true
　window.history.go(-1)
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/todo',
      name: 'todo',
      component: Todo
    },
    {
      path: '/complete',
      name: 'complete',
      component: Complete
    },
    {
      path: '/cancel',
      name: 'cancel',
      component: Cancel
    }
  ]
})
