# memo

## 前言
这是一个Vue学习项目,主要运用Vue的大部分知识去实现的一个单页面应用。
项目主要是实现一个日程表的功能,通过vuex记录当前状态,再通过LocalStorage保持状态信息实现长时间存储信息。
项目过程本着熟悉和深入了解Vue的相关内容。

## 功能说明
- 支持事件状态切换(未完成、已完成、已取消)
  - 添加事件(在edit页面提交)
  - 未完成(在工具项选择撤回)
  - 已完成(在工具项中选对勾)
  - 已取消(在工具项中选取消)
  - 删除(在工具项中可以移除)
- 支持本地化存储数据
- 支持由本地导入数据
- 事件列表
- 显示时间
- 支持清空数据
- 支持显示事件状态
- 添加动画效果
- 界面优化

## 技术栈

*  vue-cli
*  vue2
*  vue-router
*  vuex
*  animejs
*  stylus
*  webpack2
*  better-scroll
*  postcss-px-to-viewport
*  fastclick

## 目录结构

``` bash
├── src                          
│   ├── assets                   // 静态资源
│   ├── components               // 全局组件
│   │   ├── common               // 公共组件
│   │   └── content              // 项目组件
│   ├── page                   
│   |   ├── cancel               // 取消页
│   |   ├── complete             // 完成页
│   |   ├── edit                 // 编辑
│   |   ├── home                 // 首页
│   |   ├── list                 // 列表页
│   |   └── todo                 // 待处理页
│   ├── router                   // 路由
│   ├── store                    // 状态管理
│   ├── common                   // 公用内容
│   |   └──utils                 // 公用工具
│   ├── App.vue
│   └── main.js


> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report


