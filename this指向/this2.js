function Fn(){
    var n = 10
    this.m = 20
    this.aa = function() {
        console.log(this.m)
    }
}



Fn.prototype.bb = function () {
    console.log(this.n)
}


var f1 = new Fn
Fn.prototype = {
    aa: function(){
        console.log(this.m + 10)
    }
}

var f2 = new Fn
console.log(f1.constructor)     // ==> function Fn(){...}
console.log(f2.constructor)     // ==> Object() { [native code] }
f1.bb()    // undefined
f1.aa()    // 20
f2.aa()    // 20
f2.__proto__.aa()    // NaN
f2.bb()     //  Uncaught TypeError: f2.bb is not a function

