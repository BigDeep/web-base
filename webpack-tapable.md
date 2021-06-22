- tapable 提供了很多钩子注册，执行的机制。
- 让 webpack 可以灵活管理模块编译的各个阶段。灵活处理不同几段触发的 plugin
  example

```javascript
const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
  AsyncParallelHook,
  AsyncParallelBailHook,
  AsyncSeriesHook,
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook
} = require("tapable");

let ahook = new SyncHook(); // 通过new 创建一个钩子的实例
ahook.tap("name", () => {
  console.log("xxx");
}); // 通过tap来挂载一个函数到钩子实例上
ahook.call(); // 通过call来触发钩子函数执行，钩子执行会触发所有挂载函数的执行
// xxx 调用call后，输出xxx
```

- SyncBailHook
- 同步钩子函数上的挂载函数按顺序执行，当某一个函数返回了一个非 undefined 的值的时候，回停止向下继续执行

- SyncWaterfallHook 同步瀑布钩子
- 将作为参数在挂载函数中作为入口流转因子，再接下来的挂载函数中，会将上一次的返回值作为新的流转因子进行流转

- SyncLoopHook 同步循环钩子
- 此钩子会不停的触发挂载函数，直到挂载函数返回内容为 undefined 的时候，继续执行下一个挂载函数。直到结束

- AsyncParallelHook 异步并行钩子
- AsyncSeriesHook 异步串行钩子
  如下两个异步函数将串行执行，第一个挂载函数成功后，才开始执行第二个挂载函数

各种个字。我觉得他就是一个升级版的 eventEmitter;
常见的 run,make,compile,finish,seal,emit 等，我们写的插件就是作用在这些暴露方法的 hook 上

Compiler 是控制从输入命令到完成输出的这整个生命周期，Compilation 是把所有处理成 modules 的过程，所以一个 Compiler 周期内会反复触发 Compilation 实例
