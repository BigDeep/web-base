#### hash 路由

- hash 路由，hash 路由的方式和锚点是一样的。在地址的后面添加# #及后面的内容，我们称之为 location Hash
- hash 值的变化。触发了浏览器 hasChange 事件，所以我们可以通过监听 hashChange 的变化来做出回应

#### history 路由

HTML5 的 API

1. pushState
2. replaceState
   history.back() history.forward();

hash 模式

window.location.hash 和 document 的 onhashchange 事件结合，
侦听 hash 的变化，来执行响应的 js 切换网页。

History 模式
pushState 和 replaceState
pushState 是添加历史记录的，而 replaceState 是不添加的。
history.back()

前置守卫
router.beforeEach();
进入所有路由前的前置守卫。

// 解析守卫
router.beforeResolve();

导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫 (2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

beforeRouteLeave
beforeEach
beforeRouteUpdate
beforeEnter
beforeRouteEnter
beforeResolve
afterEach
