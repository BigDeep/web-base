/**
 * debounce(防抖)
 * 触发高频事件后n秒内函数只会执行一次,如果n秒内高频时间再次触发,则重新计算时间。
 * 
 */
const debounce = function(fn,time) {
    const timer = null;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,arguments);   
        },time);
    }
}





const throttle = function(fn,time){
    let flag = true;
    return function(){
        if(!flag){
            return
        }else{
            flag = false;
            setTimeout(()=>{
                fn.apply(this,arguments);
                flag = true;
            },time);
        }
    }
}

const _instanceof = function(obj,fn){
    const proto = fn.prototype;
    while(true){  
        if(obj.__proto__  === null) {
            return false;
        }
        if(obj.__proto === fn){
            return true;
        }else{
            obj.__proto__ = obj.__proto__.__proto__;
        }
        
    }

}

const debounce = function(fn,time){
    let timer = null;
    return function(){
        timer && clearTimeout(timer);
        timer = setTimeout(()=>{
            fn.apply(this,arguments);   
        },time);
    }
}

const throttle = function(fn,time){
    let flag = true;
    return function(){
        if(flag === false){
            return 
        }else{
            fn.apply(fn,arguments);
            setTimeout(()=>{
                flag = true;
            },time)
        }
    }
}

const _instanceof= function(obj,fn){
    const proto = fn.prototype;
    while(true){
        if(obj.__proto__ === null){
            return false;
        }
        if(obj.__proto__ === proto){
            return true;
        }
        obj.__proto__ = obj.__proto__.__proto__
    }

}



const debounce = function(fn,time){
    let timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        setTimeout(() => {
            fn.apply(this,arguments)
        },time)
    }
}

const throttle = function(fn,time){
    let flag = true;
    return function(){
        if(!flag){
            return 
        }else{
            fn.apply(this,arguments);
            setTimeout(()=>{
                flag = true
            },time)
        }
    }
}

const _instanceof = function(obj,fn){
    const proto = fn.prototype;
    while(true){
        if(obj.__proto__ === null){
            return false;
        }
        if(obj.__proto__ === proto){
            return true;
        }
        obj.__proto__ = obj.__proto__.__proto__
    }
}













