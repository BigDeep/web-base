var num = 10    // 60； 65
var obj = {
    num: 20    
}
obj.fn = (function (num){
    this.num = num * 3
    num++    // 21
    return function(n){
        this.num += n    // 60 + 5 = 65；20 + 10 =30
        num++   // 21 + 1 = 22；22 + 1 = 23
        console.log(num)
    }
})(obj.num)
var fn = obj.fn
fn(5)   // 22
obj.fn(10)   // 23
console.log(num, obj.num)    // 65, 30



