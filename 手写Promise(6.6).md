### 手写 Promise

```javascript
const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";

class Promise {
  constructor(executor) {
    this.state = PENDING;

    this.value = undefined;

    this.reason = undefined;

    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULLFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn());
      }
    };

    let reject = (reason) => {
      if ((this.state = PENDING)) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
    then(onFulfilled,onRejected){
        if(this.state === FULLFILLED){
            onFulfilled(this.value)
        }
        if(this.state === REJECTED){
            onRejected(this.reason)
        }
        if (this.state === 'pending') {
            // onFulfilled传入到成功数组
            this.onResolvedCallbacks.push(()=>{
                onFulfilled(this.value);
            })
            // onRejected传入到失败数组
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason);
            })
        }
    }


}
```

### 解决基本状态

1. Promise 存在三个状态（state）pending、fulfilled、rejected
2. pending（等待态）为初始态，并可以转化为 fulfilled（成功态）和 rejected（失败态）
3. 成功时，不可转为其他状态，且必须有一个不可改变的值（value）
4. 失败时，不可转为其他状态，且必须有一个不可改变的原因（reason）
5. new Promise((resolve, reject)=>{resolve(value)}) resolve 为成功，接收参数 value，状态改变为 fulfilled，不可再次改变。
6. new Promise((resolve, reject)=>{reject(reason)}) reject 为失败，接收参数 reason，状态改变为 rejected，不可再次改变。
7. 若是 executor 函数报错 直接执行 reject();

### then 方法

Promise 有一个方法叫做 then 方法，里面有两个参数，一个是 onFulFilled，一个是 onRejected
成功有成功的值，失败又失败的原因

- 平时新建一个 promise 对象是这样的。

```javascript
const test = function () {
  return new Promise((resolve, reject) => {
    resolve("ABC");
  });
};
test()
  .then((res) => {
    console.log(res);
    return new Promise((resolve, reject) => {
      resolve("DDDD");
    });
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
```

- 1.先构建一个 Promise 类的架子,我们这里用 class 来声明了。

```javascript
class Promise(executor){
    const resolve = ()=>{

    }
    const reject = ()=>{

    }
    executor(resolve,reject)
}
```

- 接下来解决基本状态。

```javascript
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class Promise(executor){
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) =>{
        this.state = FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach(fn=>fn())
    }
    const reject = (value) => {
        this.state = REJECTED;
        this.reason = value
        this.onResolvedCallbacks.forEach(fn=>fn())
    }
    try{
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }

    then(onFulfilled,onRejected){

        let promise2 = new Promise((resolve,reject)=>{
            if(this.state === FULFILLED){
                let x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);

            }
            if (this.state === REJECTED) {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
            };
            if(this.state ===PENDING){
                this.onResolvedCallbacks.push(()=>{
                    let x = onFulfilled(this.value);
                    resolvePromise(promise2, x, resolve, reject);
                })
                // onRejected传入到失败数组
                this.onRejectedCallbacks.push(()=>{
                    let x = onRejected(this.reason);
                    resolvePromise(promise2, x, resolve, reject);
                })
            }
        })
    }
    function resolvePromise(promise2, x, resolve, reject){
    // 循环引用报错
    if(x === promise2){
        // reject报错
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    // 防止多次调用
    let called;
    // x不是null 且x是对象或者函数
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
        // A+规定，声明then = x的then方法
        let then = x.then;
        // 如果then是函数，就默认是promise了
        if (typeof then === 'function') {
            // 就让then执行 第一个参数是this   后面是成功的回调 和 失败的回调
            then.call(x, y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve的结果依旧是promise 那就继续解析
            resolvePromise(promise2, y, resolve, reject);
            }, err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);// 失败了就失败了
            })
        } else {
            resolve(x); // 直接成功即可
        }
        } catch (e) {
        // 也属于失败
        if (called) return;
        called = true;
        // 取then出错了那就不要在继续执行了
        reject(e);
        }
    } else {
        resolve(x);
    }
    }


}
```

```javascript
// 我自己手写
const PENDING = "pending";
const FULFIllED = "fulFilled";
const REJECTED = "rejected";
const resolvePromise = (promise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
      let then = x.then;
      if (typeof then === 'function') {
        // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
        then.call(x, y => { // 根据 promise 的状态决定是成功还是失败
          if (called) return;
          called = true;
          // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          // 只要失败就失败 Promise/A+ 2.3.3.3.2
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      // Promise/A+ 2.3.3.2
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4
    resolve(x)
  }
}

class Promise {
  constructor(excutor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
        this.state = FULFIllED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn=>fn())
    };
    const reject = (reason) => {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn=>fn())
    };
    try {
        executor(resolve, reject);
    } catch (err){
        reject(err);
    }
  }
  then(onFulFilled, onRejected) {
    // 解决没有传值的问题
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
    const promise2 =  new Promise((resolve,reject)=>{
        if(this.state === FULFIllED){
            let x = onFulfilled(this.value);
            resolvePromise(promise2,x,resolve,reject)
        }
        if(this.state === REJECTED){
            let x = onRejected(this.value);
            resolvePromise(promise2,x,resolve,reject)
        }
        if(this.state === PENDING){
            this.onFulfilledCallbacks.push(()=>{
                let x = onFulfilled(this.value);
                resolvePromise(promise2,x,resolve,reject)
            })
            this.onRejectedCallbacks.push(()=>{
                 let x = onRejected(this.value);
                resolvePromise(promise2,x,resolve,reject)
            })

        }
    })
    return promise2

  }

  function resolveParams(promise,x,resolve,reject){
    if(x === promise2){
        // reject报错
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
  }
}
```

```javascript
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 处理链式调用问题
const resolvePromise = (promise2, x, resolve, reject) => {
    if(promise2 === x){
        return reject('cycle call promise');
    }
    if(typeof x === 'object' && x !==null){
        let then = x.then;
        if(typeof then === 'function'){
            then.call(x,res=>{
                resolvePromise(x,res,resolve,reject)
            },rej=>{
                reject(rej)
            })
        }else{
            resolve(x);
        }
    }else{
        resolve(x);
    }
};
class myPromise {
  constructor(excutor) {
    this.state = "pending"; // 状态
    this.value = undefined; // resolve值
    this.reason = undefined; // reject值

    this.onFulfilledCallbacks = []; // 存放fulFilled
    this.onRejectCallbacks = [];

    const resolve = (value) => {
      this.state = FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach((fn) => fn());
    };
    const reject = (reason) => {
      this.state = REJECTED;
      this.reason = reason;
      this.onRejectCallbacks.forEach((fn) => fn());
    };
    try {
      excutor(resolve, reject);
    } catch (e) {
      reject(e);
    }
    then(onFulfilled,onRjected){
        //避免没有传入导致链式调用无法继续进行
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw reason}
        const promise2 = new myPromise((resolve,reject) => {
            try{
                if(this.state === PENDING){
                    setTimeout(()=>{
                        this.onFulfilledCallbacks.push(()=>{
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2,x,resolve,reject)
                        })
                    },0)
                    setTimeout(()=>{
                        this.onRejectCallbacks.push(()=>{
                            let x = onRjected(this.value);
                            resolvePromise(promise2,x,resolve,reject)
                        })
                    },0)
                }
                if(this.state === FULFILLED){
                    setTimeout(()=>{
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                    },0)
                }
                if(this.state === REJECTED){
                    setTimeout(()=>{
                        let x = onRjected(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                    },0)
                }
            }catch (err){
                reject(err)
            }

        })
        return promise2;
    }
  }
}
```
