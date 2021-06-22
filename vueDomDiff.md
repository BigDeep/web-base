patch 函数(补丁函数);

- 当 vnode 不存在，但是 oldVnode 存在时需要: 移除 oldVnode
- 当 oldVnode 不存在，但是 vnode 存在时需要: 创建 vnode
- 当 vnode 和 oldVnode 均存在时，又分如下情况：

  1. 如果 vnode 和 oldVnode 是 **同一个** (通过 sameVnode()进行比对，后面会详细讲到这个方法)结点，则进行后续对比工作：通过调用 patchVnode（），这个方法右面也会详解
  2. 如果 vnode 和 oldVnode 是 **不是同一个** 结点，那么根据 vnode 创建新元素并挂载至 oldVnode 的父元素下，同时还需要销毁 oldVnode

- sameVnode 方法

```javascript
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)))
  );
}
```

1. key 值一样
2. tag 一样(node 的 tag，类似于 dom 元素的 tag，只不过这个 tag 是 vue 组件的最外层包裹 tag)
3. isComment 一样,这个不用太关注
4. sameInputType(), 专门针对表单输入项进行判断的：input 一样但是里面的 type 不一样算不同的 inputType

patchVnode

1. 如果新老节点引用一致，这直接返回，不用进行后续任何操作
2. 如果是静态节点，则进行赋值：vnode.componentInstance = oldVnode.componentInstance，然后返回
3. cbs.update[i](oldVnode, vnode),更新 oldVnode 的所有属性包括：attrs、class、domProps、events、style、ref、directives
4. 如果 oldVnode 和 vnode 都有 children, 且他们的 children 不是同一个则调用:updateChildren() 这个方法很重要，后面会讲到
5. 如果只有 vnode 定义了 children, 如果 oldVnode 定义了文本节点，那么将将当前 elm 的 textContent 设置为：'',同时调用 addVnodes 给当前 elm 新增 vnode.chidlren
6. 如果只有 oldVnode 定义了 children,那么移除 oldVnode.children
7. 如果只有 oldVnode 定义了 text 属性，那么将当前 elm 的 textContent 设置为：''
8. 如果 oldVnode.text 和 vnode.text 不相等，则将当前 elm 的 textContent 设置为：vnode.text

对比的总体思路就是：头对头，尾对尾，头对尾，尾对头

头对头：oldStartVnode 和 newStartVnode
尾对尾：oldEndVnode 和 newEndVnode
头对尾：oldStartVnode 和 newEndVnode
尾对头：oldEndVnode 和 newStartVnode

question: 为什么会有头对尾，尾对头这种对比？
answer: 这样可以更快的处理数组的 reverse()这种情况
如果以上 4 种情况都没有 get 到该怎么办？

else 1.为 oldCh 创建一个 key Map 2.在 key Map 中找到 newStartVnode.key 的 index（这里需要注意，如果我们编码时没有给出节点的 key，会走下面的第三步，直接创建新元素。很显然：元素的创建比移动操作更消耗性能） 3.如果没有找到 index 则认为 newStartVnode 是一个新元素，直接创建 4.如果找到了 index，通过 sameVnode()比对
4.1 比对成功：则继续调用`patchVnode()`同时在父节点下插入 newNode

4.2 比对失败：(虽然他们具有相同的 key,但不是同一个元素)，当新元素对待，直接创建
复制代码

1-5 是一个 while 循环，每一次循环都会缩小对比范围，直至所有子节点均对比完成。下面用一个例子来说明。
eg:

```html
<li v-for="letter in list" :key="letter">{{letter}}</li>
```

复制代码以下为 list 的数据结构：
before: ['A', 'B', 'C', 'D', 'E']
after: ['C', 'D', 'E', 'F', 'A', 'B']
以下为调用 updateChildren()中 while 循环后的每一次的结果：
round1:
["C", "A", "B", "D", "E"]
round2:
["C", "D", "A", "B", "E"]
round3:
["C", "D", "E", "A", "B"]
到这里子元素的位置已经调换完成了，但是实际上后面还需有，round4/5/6/7,但是子节点的位置已经和 round3 一致，都是
["C", "D", "E", "A", "B"]
question：既然到第三步就已经完成了，那为甚还会有多余的 4、5、6、7 步骤？
answer: while 循环的跳出依据是：oldChildren 循环完成且 newChildren 也循环完成，所以会出现如此现象。这样能保证两个 children 中的所有节点都遍历到
总结
到这里 vue dom diff 算法基本算讲完了，总结为如下几点：

列表中 key 值的正确设定可以提示 dom diff 的效率以及正确性
元素同级别对比时，文本节点的操作是最简便的，直接替换文本内容即可。其他节点需要通过 sameVnode()进行比对后操作
子元素列表进行对比时：头对头、尾对尾、头对尾、尾对头，依次缩小对比范围，直至两个列表都遍历完成

vue2 双向遍历
vue3 改了 Domdiff
