const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class Promise {
    constructor(executor){
        this.state = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.resolveCallbackList = [];
        this.rejectCallbackList = [];
        const resolve = (value)=>{
            this.state = FULFILLED;
            this.value = value;
            this.resolveCallbackList.forEach(el=>{
                 el && el();
            })
        }
        const reject = (reason)=>{
            this.state = REJECTED;
            this.reason = reason;
            this.rejectCallbackList.forEach(el=>{
                el && el();
           })
        }
        try{
            executor(resolve,reject);
        }catch(e){
            reject(e)
        }
    }
    then(resolve,reject){
        onResolve = typeof resolve === "function" ? resolve : (value) => value
        onReject = typeof reject === 'function' ? reject : (err) => { throw err}
        const promise2 = new Promise((resolve,reject) =>{
            if(this.state === "PENDING"){
                setTimeout(()=>{
                    this.onFulfilledCallbacks.push(()=>{
                        let x = onResolve(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                    })
                },0)
                setTimeout(()=>{
                    this.onRejectCallbacks.push(()=>{
                        let x = onReject(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                    })
                },0)
            }
            if(this.state === "FulFilled"){
                setTimeout(()=>{
                    this.onFulfilledCallbacks.push(()=>{
                        let x = onResolve(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                    })
                },0)
            }
            if(this.state === "REJECTED"){
                setTimeout(()=>{
                    this.onRejectCallbacks.push(()=>{
                        let x = onReject(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                    })
                },0)
            }
        })
    }
    
}
const resolvePromise = function(promise,x,resolve,reject){
    if(promise === x){
        throw "两个promise一样"
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

}