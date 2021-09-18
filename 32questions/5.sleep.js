
(async ()=>{
    console.log('sleep start');
    await sleep();
    console.log('sleep end')
  
})()

function sleep(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },ms);
    })
}