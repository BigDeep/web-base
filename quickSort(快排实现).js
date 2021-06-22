export const quickSort = function(arr){
    if(arr.length <=1 ){
        return arr;
    }
    var standard = arr.splice(0,1)[0];
    var leftArr = [];
    var rightArr = [];
    for(var i = 0 ; i < arr.length ; i++){
        if(arr[i] < standard){
            leftArr.push(arr[i])
        }else{
            rightArr.push(arr[i])
        }
    }
    return quickSort(leftArr).concat([standard],quickSort(rightArr));
}