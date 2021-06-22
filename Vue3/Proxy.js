import { property } from "lodash";

var message = 'hello word';
const data = {};
Object.defineProperty(data,'message',{
    get(){
        return message
    },
    set(newVal){
        message = newVal
    },
    enumerable:true,
    configurable:true,
    value: '',
    writable:true,
    get(){

    },
    set(){

    },
})
//

//老写法
try{
    Object.defineProperty(target,property,attributes);
}catch(e){
    console.log(e);
}

Reflect.has(Object,'assign');


const fp =(fn)=>{

}