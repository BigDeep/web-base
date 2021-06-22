### Vuex 原理

#### 结论先行

> **Vuex** 原理可以拆分为 3 个关键点。

1. 每个组件注入**Store**
2. **Store** 实例中的方法都是为**Store**中的属性服务的。
3. **Store** 中的属性变更触发视图的更新。

### Question List

1. 为什么修改了 Store 实例里的属性，变更后会触发视图更新。
   答：使用 Vue 中的 reactive 来检测数据变化。
2. Vuex4 作为 Vue 的插件如何和 Vue 结合。
   app.use(store) 时会执行 Store 中的 install 方法，一句是为 composition API 中使用，提供 Store 实例对象到根实例中。一句则是注入到根实例的全局属性中，为 option API 中使用。它们都会在组件生成时，注入到每个组件实例中。

3. provide、inject 的如何实现的，每个组件如何获取到组件实例中的 Store 的
   provide 函数建立原型链区分出组件实例用户自己写的属性和系统注入的属性。inject 函数则是通过原型链找父级实例中的 provides 对象中的属性。
4. 为什么每个组件对象里都有 Store 实例对象了(渲染组件对象过程)。
5. 4444
