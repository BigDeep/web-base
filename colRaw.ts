// interface result = {
//     col:number
//     raw:number
// }

const testFunc = function(str){
    const str2 = str.replace(/\d/g,'');
    const str1 = str.replace(/[A-Z]/g,'');
    var end = "Z".charCodeAt(0);
    var start = "A".charCodeAt(0);
    var round = end - start + 1;
    var col = 1;
    for(let i = 0 ;i < str2.length-1; i++){
        col += Math.pow(26,i+1);
        col += (str2[i].charCodeAt(0)- start) * 26;
    }
    col += (str2[str2.length-1].charCodeAt(0) - start)*1;
    return {
        raw: parseInt(str1),
        col:col
    }
}