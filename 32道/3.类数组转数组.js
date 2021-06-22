export const transfer = function(arr){
    return Array.prototype.splice.call(arr)
}

export const transfer2 = function(arr){
    return Array.from(arr);
}

export const transfer3 = function(arr){
    return Array.prototype.concat.call([],arr);
}