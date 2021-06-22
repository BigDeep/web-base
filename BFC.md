- 什么是 BFC

1. 首先 BFC 全称是 block formatting context;块级格式化上下文。
2. 然后他是一个隔离的容器，容器的内部元素是无法干扰到外部元素的。

- BFC 的标准

1. body 元素就是一个 BFC
2. 浮动元素 float;
3. position 为 absolute 或者是 fixed 的时候
4. overflow 设置为 visible 以外，(visible 是默认值);
5. display 为 inline-block ,table-cells,flex 等;

- BFC 应用

1. 清理浮动。
2. 解决 margin 折叠
3. 避免元素被浮动遮挡。
