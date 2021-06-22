import { result } from "lodash";

Function.prototype.myCall = function(obj = window, ...args){
    var context = context || window;
    context.fn = this;
    const result = context.fn(...args);
    delete context.fn;
    return result;

}

Function.prototype.myApply = function(obj = window, ...args){
    var context = context || window;
    context.fn = this;
    const result  = context.fn(args);
    delete context.fn;
    return result;

}

Function.prototype.myBind = function(obj = window, ...args){
    var context = context || window;
    context.fn = this;
    return function(){
        const result = context.fn(...args);
        delete context.fn;
        return result;
    }
}



Function.prototype.myCall= function(context = window, ...args){
    let sysbolAttr = new Symbol();
    context[sysbolAttr] = this;
    const result = context[sysbolAttr](...args);
    delete context[sysbolAttr];
    return result;
}

Function.prototype.myApply = function(context = window, ...args){
    let sysbolAttr = new Symbol();
    context[sysbolAttr] = this;
    const result = context[sysbolAttr](args);
    delete context[sysbolAttr];
    return result;
}

Function.prototype.myBind = function(context = window, ...args){
    let sysbolAttr = new Symbol();
    context[sysbolAttr] = this;
    return function(..._args){
        const reuslt = context[sysbolAttr](...(args.concat(args)));
        delete context;
        return result;
    }
}