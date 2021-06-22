export const JSONP = function({
    url,
    params
}){
    const generateUrl = ()=>{
        let dataSrc = ''
    }
    for(let item in params){
        dataSrc += `${item}=${params[item]}`;
    }
}