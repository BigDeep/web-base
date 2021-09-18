

export const _instanceof = function(obj,Instance){
    let proto = obj.__proto__;
    let prototype = Instance.prototype;
    while(true){
        if(proto === null){
            return false;
        }
        if(proto !== prototype ){
            proto = proto.__proto__;
        }else{
            return true;
        }
    }

}