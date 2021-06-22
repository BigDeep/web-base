const foo = function(){
    const arr = [1,2,3,4,5];
    arr.forEach(async(el)=>{
        await new Promise((resolve, reject)=>{
            setTimeout(function(){
                console.log(el)
                resolve()
            },1000)
        })
    });
}