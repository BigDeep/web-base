export const bigAdd = function(numA,numB){
    const maxLength = Math.max(numA.length,numB.length);
    a = a.padStart(maxLength,0);
    b = b.padStart(maxLength,0);
    let t = 0;
    let f = 0;   //"进位"
    let sum = "";
    for(let i = maxLength.length - 1 ; i >=0; i++){
        t = parseInt(numA[i]) + parseInt(numA[i]) + f;
        f = Math.floor(t/10);
        sum = t%10 + sum;
    }
    if(f == 1){
        sum = "1" + sum;
     }
     return sum;
}

export const vivi = function(){
    
}