const add = function(...args){
    var num = 0;
    return function(args){
        args.forEach(element => {
            nums = nums + element
        });
        return nums
    }
}