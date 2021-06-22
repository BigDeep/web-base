### webpack 提供了两种配置 loader 的模式。

1. 通过 webpack config 形式 进行配置 比如：

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: "vue-loader"
      },
      {
        test: /.scss$/,
        use: [
          "vue-style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              data: "$color: red;"
            }
          }
        ]
      }
    ]
  }
};
```

2. 单文件引入行内形式配置 loader

```javascript
import a from "raw-loader!../../utils.js";
```

- webpack 内部有着不同的解析方式。

- 首先行内配置规则

1. ! 忽略 webpack.config 配置当中符合规则的 normalLoader
2. -! 忽略 webpack.config 配置当中符合规则的 preLoader/normalLoader
3. !! 忽略 webpack.config 配置当中符合规则的 postLoader/preLoader/normalLoader

- 在 module 一开始构建的过程中，首先会创建一个 loaderContext 对象
- 当 loaderContext 初始化完成后，开始调用 runLoaders 方法，这个时候进入到了 loaders 的执行阶段。runLoaders 方法是由 loader-runner 这个独立的 npm 包提供的方法，那我们就一起来看下 runLoaders 方法内部是如何运行的。

pitch 函数。
