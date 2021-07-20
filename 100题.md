### 1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal /byte

```javascript
var mySetInterVal = function (fn, a, b) {
  let flag = 0;
  let timer;
  const loop = () => {
    timer = setTimout(() => {
      fn();
      flag++;
      loop();
    }, a + b * flag);
  };
  loop();
  return () => {
    clearTimeout(timer);
  };
};
```

### 2.合并二维有序数组成一维有序数组，归并排序的思路

### 3.斐波那契数列

```javascript
let fib = function (n) {
  if (n < 2) {
    return n;
  }
  let list = [0, 1];
  for (var i = 2; i < n; i++) {
    list[i] = list[i - 2] + list[i - 1];
  }
  return list[n - 1];
};

let result = fib(12);
console.log(result);
```

### 4.字符串出现的不重复最长长度

```javascript
var check = function (str) {
  var map = new Map();
  var index = -1;
  var len = str.length;
  var max = 0;
  for (let i = 0; i < len; i++) {
    if (map.has[str[i]]) {
      index = Math.max(index, map.get(str[i]));
    }
    max = Math.max(max, i - index);
    map.set(str[i], i);
    console.log(max);
  }
  return max;
};
```

### 8.说一下 Http 缓存策略，有什么区别，分别解决了什么问题

浏览器分为了强缓存和协商缓存

强缓存就是 cache-contorl:max-age 设置了一个秒级的时间。在这个秒数内会读浏览器缓存。
cache-control:no-cache 走的会是协商缓存。
expires
Last-Modified/If-Modified-since（http1.0）和 Etag/If-None-match（http1.1）

### 9.防抖与节流

```javascript
const debounce = function (fn, time) {
  let timer = null;
  return function (...args) {
    if (timer === null) {
    } else {
      clearTimeout(timer);
    }
    var timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
};

const throtling = function (fn, time) {
  let flag = true;
  return function (...args) {
    if (flag === false) {
      return;
    } else {
      flag = false;
      setTimout(() => {
        fn.apply(this, ...args);
        flag = true;
      }, time);
    }
  };
};
```

### 11.对闭包的看法，为什么要用闭包？说一下闭包原理以及应用场景

### 第 12 题：css 伪类与伪元素区别

···
伪类用单冒号
伪元素用双冒号 ::before ::after
···

### 13.有一堆整数，请把他们分成三份，确保每一份和尽量相等（11，42，23，4，5，6 4 5 6 11 23 42 56 78 90）

```javascript
var avenge = function (arr) {
  let arr1 = [];
  let arr2 = [];
  let arr3 = [];
};
```

### 15.实现 add(1)(2)(3)

```javascript
var sum = (a, b, c) => {
  return Number(a) + Number(b) + Number(c);
};
var curry = function (fn, ...args) {
  console.log(fn.length);
  if (args.length >= fn.length) {
    return fn(...args);
  }
  return (...args2) => curry(fn, ...args, args2);
};
let add = curry(sum);

console.log(add(1)(2)(3));
```

### 16.链式调用的实现

```javascript
function Class1() {
  console.log("类初始化");
}
Class1.prototype.method = function (msg) {
  console.log(msg);
  return this;
};
let c1 = new Class1();
c1.method("信息1").method("信息2").method("信息3");
```

### 18.类数组和数组的区别，dom 的类数组如何转换成数组

### 19.webpack 做过哪些优化，开发效率方面、打包策略方面等等

### 31. console.log(1);

```javascript
console.log(1);
setTimeout(() => {
  console.log(2);
  process.nextTick(() => {
    console.log(3);
  });
  new Promise((resolve) => {
    console.log(4);
    resolve();
  }).then(() => {
    console.log(5);
  });
});

new Promise((resolve) => {
  console.log(7);
  resolve();
}).then(() => {
  console.log(8);
});

process.nextTick(() => {
  console.log(6);
});

setTimeout(() => {
  console.log(9);
  process.nextTick(() => {
    console.log(10);
  });
  new Promise((resolve) => {
    console.log(11);
    resolve();
  }).then(() => {
    console.log(12);
  });
});
// 1 7 6 8 2 4 3 5 9 11 10 12
```

### 32.写出执行结果

```javascript
function side(arr) {
  arr[0] = arr[2];
}
function a(a, b, c = 3) {
  c = 10;
  side(arguments);
  return a + b + c;
}
a(1, 1, 1);
```
