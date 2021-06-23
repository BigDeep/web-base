const getSingle = function(fn){
    var result;
    return function (...args) {
        return result || ( result = fn.apply(this, args))
    }
}

