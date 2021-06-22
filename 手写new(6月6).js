const _new = function(fn,...args){
    const obj = {}; // step1 创建一个空对象
    obj.__proto__ = fn.prototype; // step2 
    const result = fn.apply(obj,args);// step3 
    return typeof result === 'object' ? result : obj // step4 
}

// step4 出现的原因。
// 1、 构造函数没有返回值的情况下，result的值回味undefined
// 2、 当返回基本类型的时候 也要处理
// 3、 所以要判断是否为object