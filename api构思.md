现存在的调用方式

apiUrl 
```
utils.jsonp({url:xxxxx,params:{}}).then(res=>{}).catch((err)=>{});
```

针对 api 再做一层分装。
直接维护一个文件。输出 api 到个业务组件中。


如果获取我的奖品的接口。
希望能够在业务方调用成为
封装多一层，有利于逻辑的复用。

```
api.getMyReward().then(res=>{}).catch(err=>{});
```

然后 hoo 的调用方式由于受到 ie 兼容的影响。暂时可能不会改成用 promise 的形式。
选用\$.Defered();


