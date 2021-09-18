export const flat1 = function(arr){
    return arr.flat(Infinity);
}

/**
 * 数字会变成字符串
 * @param {*} arr 
 * @returns 
 */
export const flat2 = function(arr){
    return flat2.replace(/\[|\]/g,'').join('');
}

export const flat4 = function(arr){
    return JSON.parse(`[${JSON.stringify(flat2).replace(/\[|\]/g,'')}]`);
}

/**
 * 递归法
 * @param {} arr 
 */
export const flat3 = function(arr){
    let result = [];
    function flat(_arr){
        if(Array.isArray(_arr)){
            for(let i = 0 ; i< _arr.length;i++){
                flat(_arr[i])
            }
        }else{
            result.push(_arr);
        }
    }
    flat(arr);
    return result;
}




