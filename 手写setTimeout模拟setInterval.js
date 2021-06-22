function mySetInterval(fn,times){
    let timer = null;
    function interval(){
        fn();
        timer = setTimeout(interval,times);
    }
    interval();
    mySetInterval.cacel = clearTimeout(timer);
}

// 再次强调，定时器指定的时间间隔，表示的是何时将定时器的代码添加到消息队列，而不是何时执行代码。
// 所以真正何时执行代码的时间是不能保证的，取决于何时被主线程的事件循环取到，并执行。