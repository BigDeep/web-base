export const _new = function(fn,...args){
    const obj = {};
    obj.__proto__ = fn.prototype;
    const result = fn.apply(obj,args);
    return typeof result === 'object' ? result : obj
}