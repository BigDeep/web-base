Array.prototype.map = function(callback){
    if(typeof callback !== 'function'){
        throw new TypeError(calll + 'is no a function')
    }else{
        const obj = Object(this);
        let result = [];
        for(let i=0; i< obj.length ; i++){
            result.push(callback(obj[i],i,this));
        }
    }
    return result;
}