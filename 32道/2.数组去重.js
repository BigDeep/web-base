export const unique = function(arr){
    return Array.from(...new Set(arr))
}

export const unique2 = function(arr){
    let result = [];
    arr.forEach(element => {
       if(result.indexOf(element === -1)){
        result.push(element);
       } 
    });
}

export const unique3 = function(arr){
    let result = [];
    arr.forEach(element => {
      if(!arr.includes(element)){
          result.push(element)
      }
    });
}

export const unique4 = function(arr){
    let hashMap = new Map();
    let result = [];
    for(let i = 0; i < arr.length ;i++){
        if(!hashMap.get(arr[i])){
            hashMap.set(arr[i],true);
            result.push(arr[i]);
        }
    }
    return result;
}

