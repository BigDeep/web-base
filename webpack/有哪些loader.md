style-loader 将 css 添加到 DOM 的内联样式标签 style 里

css-loader 允许将 css 文件通过 require 的方式引入，并返回 css 代码

less-loader 处理 less

sass-loader 处理 sass

postcss-loader 用 postcss 来处理 CSS

autoprefixer-loader 处理 CSS3 属性前缀，已被弃用，建议直接使用 postcss

file-loader 分发文件到 output 目录并返回相对路径

url-loader 和 file-loader 类似，但是当文件小于设定的 limit 时可以返回一个 Data Url

html-minify-loader 压缩 HTML

babel-loader 用 babel 来转换 ES6 文件到 ES5
