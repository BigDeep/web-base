// 手写EventEmmiter
// 题目描述:实现一个发布订阅模式拥有 on emit once off 方法
class EventBus {
    constructor(){
        this.events = {}
    }
    off(type,callback){
        if(!callback){
            this.events[type] = null;
        }else{
            this.events[type].filter(el=>{
                return el !== callback
            })
        }
    }
    once(type,callback){
        if(!this.events[type]){
            this.events[type] = [];
        }
        this.on(type,()=>{
            callback();
            this.off(type,callback)
        })
    }
    emit(type,data){
        if(!this.events[type]){
            return 
        }
        this.events[type].forEach((fn)=>{
            typeof fn === 'function' && fn();
        })
    }
    on(type,callback){
        if(!this.events[type]){
            this.events[type] = [];
        }
        this.events[type].push(callback)
    }
}