1 compose
题目描述:实现一个 compose 函数 将 compose(a,b,c)(...args) 转化成 a(b(c(...args)))
// 用法如下:
function fn1(x) {
return x + 1;
}
function fn2(x) {
return x + 2;
}
function fn3(x) {
return x + 3;
}
function fn4(x) {
return x + 4;
}
const a = compose(fn1, fn2, fn3, fn4);
console.log(a(1)); // 1+4+3+2+1=11
复制代码
实现代码如下:

```javascript
const compose = function (...args) {
  if (!args.length) {
    return (v) => v;
  }
  if (args.length === 1) {
    return fn[0];
  }
  return args.reduce((prev, next) => {
    return (number) => {
      return prev(next(number));
    };
  });
};
```
