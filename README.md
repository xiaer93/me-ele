# meele

> 饿了吗&美团外卖，使用vue+mongodb+node+express构建的全栈项目。

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

# run unit tests
npm run unit

# run all tests
npm test
```

- home 首页
- discover 发现
- order 订单
- profile 我的

- filter-nav 搜索过滤组件
- food-list 食物列表
- shop-list 商家列表

- vue-keep-alive独有钩子函数：activated、deactivated
- 组件命名、api命名，RESTApi设计
- 主题色设计
- css嵌套命名，需要再次优化下，以catalog.vue为例~~~

- 9.7任务：1、将字体，颜色等提取为变量；2、进一步提取公共组件，优化电梯组件
- vue/jquery混合，是否不利于维护？
- 父组件、子组件（子组件在路由中），子组件获取定位信息，父组件根据定位信息刷新显示数据，各种bug？
- 父子组件的生命周期嵌套，子组件中改变数据+子组件路由返回父组件+获取数据，3次更新父组件，导致了bug？

- mutation传参使用有哪些限制？？？
- vue的响应式有层数限制吗，为什么直接food.number += 1无效
- 给vue动态对象新增响应属性，必须使用vue.set
- 依赖计算属性的计算属性，这个多层依赖可以吗？

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
