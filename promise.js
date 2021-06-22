const PENDING = 'pending';
const RESOLVED = 'resolved';
const REJECTED = 'rejected';

function MyPromise(fn){
   

    this.status = PENDING;
    this.value = null;
    this.reason = null;


    this.resolvedCallback = [];
    this.rejectedCallback = [];

    const that = this;
    function resolve(data){
        if(that.status === PENDING){
            that.value = data;
            that.status = RESOLVED;
            that.resolvedCallback.forEach(cb => {
                cb && cb(data);
            });
        }  
    }
    function reject(data){
        if(that.status === PENDING){
            that.reason = data;
            that.status = REJECTED;
            that.rejectedCallback.forEach(cb=>{
                cb && cb(data);
            })
        }
    }

    try{
        fn(resolve,reject);
    }catch(exception){
        reject(exception);
    }
    
}

MyPromise.prototype.then = function(onFullfilled,onRejected){
    const that = this;
    if(this.status === PENDING){
        that.resolvedCallback.push(onFullfilled);
        that.resolvedCallback.push(onRejected);
    }
    if(this.status === RESOLVED){
        onFullfilled(that.value);
    }
    if(this.status === REJECTED){
        onFullfilled(that.resson);
    }
    return that;
}

const p = new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve(1000);
    }, 1000);
  });

p.then((res) => {
console.log('结果：', res); // 结果：1000

}).then((res) => {
console.log('jsliang'); // jsliang
console.log(res);
})