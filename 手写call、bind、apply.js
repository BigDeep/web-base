
//ES6 手撕 Call 类型1
Function.prototype.myCallForES6 = function(context){
    const context = context || window;
    const symbol = new Symbol('temporary');
    const args = Array.from(arguments).slice(1);
    context[symbol] = this;
    const result = context[symbol](...args);
    delete context[symbol];
    return result;
}

//ES6 手撕 Call 类型2
Function.prototype.myCallForES6 = function(context = window,...args){
    const symbol = new Symbol('temporary');
    context[symbol] = this;
    const result = context[symbol](...args);
    delete context[symbol];
    return result;
}

//ES5 手撕 Call
Function.prototype.myCallForES5 = function(context){
    var context = context || window;
    context.fn = this;
    var args = [];
    for (let i = 1; i < arguments.length; i++) {
        args.push(arguments[i])
    }
    var res = args.length ? eval('context.fn('+args+')') : context.fn();
    delete context.fn;
    return res;
}


//ES6 手撕 Call
Function.prototype.myBindForES6 = function(context, ...args){
        context = context || window;
        const fnSymbol = Symbol("fn");
        context[fnSymbol] = this;
        
        return function (..._args) {
        args = args.concat(_args);
        
        context[fnSymbol](...args);
        delete context[fnSymbol];   
        }
}

//ES5 手撕 Call
Function.prototype.myBindForES5 = function(){
    
}



//ES6 手撕 Call
Function.prototype.myApplyForES6 = function(context,argsArr){
    context = context || window;
  
    const fnSymbol = Symbol("fn");
    context[fnSymbol] = this;
    
    context[fnSymbol](...argsArr);
    delete context[fnSymbol];

}

//ES5 手撕 Call
Function.prototype.myApplyForES5 = function(){

}


