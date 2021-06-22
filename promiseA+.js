//定义状态枚举

const PENDING = "PENDING";
const RESOLVED = "RESOLVED";
const REJECTED = "REJECTED";

class Promise {
    constructor(exector){
        this.status = PENDING;
        //成功和失败的结果，方便then和catch来访问。
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallbackList = [];
        this.rejectCallbackList = [];
        
        const resolve = (value) =>{
            if(this.status === PENDING){
                // 记录this.value
                this.value = value;
                //改变promise状态
                this.status = RESOLVED;
                //清理resolveCallBack中未执行的函数;
                this.rejectCallbackList.forEach(fn=>{
                    fn(this.value);
                })
            }
        }
        const reject = (reason)=>{
            if(this.status === PENDING){
                this.reason = reason;
                this.status = REJECTED;
                this.rejectCallbackList.forEach(fn=>{
                    fn(this.reason);
                })
            }
        }
        try{
            exector(resolve,reject);
        }catch(e){
            reject(e);
        }
    }
}
// 版本V1

Promise.prototype.then = function(onResolved,onRejected){
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : value => value;
    if(this.status === PENDING){
        this.resolveCallbackList.push(onResolved);
        this.rejectCallbackList.push(onRejected);
    }
    if(this.status === RESOLVED || this.status === REJECTED){
        onResolved(this.value);
    }
} 

Promise.prototype.then = function(onResolved,onRejected){
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : value => value;
    let self = this;
    let promise2 = new Promise((resolve,reject)=>{
        if(self.status === PENDING){
            self.resolveCallbackList.push(()=>{
                try{
                    setTimeout(()=>{
                        const result = onResolved(self.value);
                        if(result instanceof Promise)  {
                            result.then(resolve, reject)
                        }else{
                            resolve(result);
                        }
                    });
                   
                }catch(e){
                    reject(e);
                }
            });
            self.onRejectedCallbacks.push(() => {
                // 以下同理
                try {
                  setTimeout(() => {
                    const result = onRejected(self.reason);
                    // 不同点：此时是reject
                    result instanceof Promise ? result.then(resolve, reject) : reject(result);
                  })
                } catch(e) {
                  reject(e);
                }
              })
        } else if (self.status === FULFILLED) {
            try {
              setTimeout(() => {
                const result = onResolved(self.value);
                result instanceof Promise ? result.then(resolve, reject) : resolve(result);
              });
            } catch(e) {
              reject(e);
            }
          } else if (self.status === REJECTED){
            try {
              setTimeout(() => {
                const result = onRejected(self.reason);
                result instanceof Promise ? result.then(resolve, reject) : reject(result);
              })
            } catch(e) {
              reject(e);
            }
          }
    })
}
Promise.prototype.catch = function(reason){
    return new Promise((resove,reject)=>{
        reject(reason)
    })
}

new Promise(function(reject,resolve){

})