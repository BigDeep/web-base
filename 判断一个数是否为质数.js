/**
 * 直接法
 * @param {number} num 
 * @returns 
 */
const check = function(num){
    var target = num - 1;
    for(let i=2;i<target;i++){
        if(num % i === 0){
            return true;
        }
    }
    return false;
}

/**
 * 改良法
 */

const check2 = function(num){
    var target = Math.sqrt(num);
    for(let i = 2 ;i < target ;i++ ){
        if(num % i === 0){
            return false;
        }
    }
    return true;
}