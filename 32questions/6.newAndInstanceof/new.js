/**
 * 
 * @param {Function} fn 构造函数 
 * @param  {...any} args 构造函数的传参
 */
export const _new = function(fn,...args){
    let obj = {}; // 新建一个空对象
    obj.__proto__ = fn.prototype  // 完成obj原型链继承

    const result = fn.apply(obj,args);

    return typeof result === 'object' ? result : obj ;


}
/**
 * 改良版
 */
export const __new = function(fn,...args){
    let obj = Object.create(fn.prototype);
    const result = fn.apply(obj,args);
    return typeof result === 'object' ? result : obj ;
}