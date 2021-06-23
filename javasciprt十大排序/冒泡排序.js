const bubbleSort = function(arr){
    var len = arr.length;
    for(var i = 0 ; i < len; i++){
        for(j = 0 ; j < len - 1 - i ; j++){
            if(a[j]> a[j+1]){
                var temp = a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
            }
        }
    }
}

const selectSort = function(arr){
    var len = arr.length;
    for(var i = 0; i < len - 1 ;i++){
        max = i;
        for(var j =i+1 ; j < len ;j++ ){
            if (arr[j] > arr[max]) {     //寻找最小的数
                max = j;                 //将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[max];
        arr[max] = temp;
    }
}
