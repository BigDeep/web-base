```javascript
let foo = function (str) {
  let set = new Set();
  let rightKey = -1;
  let result = 0;
  for (let i = 0; i < str.length; i++) {
    if (i != 0) {
      set.delete(str[i - 1]);
    }
    if(set.has(str[rightKey+1])){
        continue;
    }
    while(rightKey+1 < str.length ; && !set.has(str[rightKey+1])){
        set.add(str[rightKey+1]);
        ++rightKey;
    }
    result = Math.max(result,rightKey-i+1);
  }
  return result;
};
```

```javascript
// 第一步构建HashSet
// 设立一个右指针从-1开始。因为要从0遍历。
// 如果i不是第一位的话。则清除上一次记录中set的第i-1位的元素。
```
