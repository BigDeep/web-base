export const insertSort = function(arr){
    var result = [arr[0]];
    for(var i = 1 ; i < arr.length; i++){
        for(var j = result.length - 1 ; j >=0; j--){
            if(arr[i] < result[j]){
                result.splice(j,0,arr[i])
                break;
            }
            if(j == 0 ){
                result.push(arr[i])
            }
        }
    }
    return result
}