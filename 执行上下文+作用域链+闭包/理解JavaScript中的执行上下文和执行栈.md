### 什么是执行上下文

- 简而言之，执行上下文就是 javascript 代码运行时的当前环境。

### 执行上下文类型

1. 全局执行上下文。
2. 函数上下文
3. Eval 执行上下文。（但是我们对 Eval 其实不太常用）

### 什么是执行栈

1. 执行栈，也就是在其它编程语言中所说的“调用栈”，是一种拥有 LIFO（后进先出）数据结构的栈，被用来存储代码运行时创建的所有执行上下文。
2. 当 JavaScript 引擎第一次遇到你的脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部。
3. 引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。

### 什么是执行流程。

这是整篇文章中最简单的部分。在此阶段，完成对所有这些变量的分配，最后执行代码。

注意 — 在执行阶段，如果 JavaScript 引擎不能在源码中声明的实际位置找到 let 变量的值，它会被赋值为 undefined。

### This 绑定：

- 在全局执行上下文中，this 的值指向全局对象。(在浏览器中，this 引用 Window 对象)。
- 在函数执行上下文中，this 的值取决于该函数是如何被调用的。如果它被一个引用对象调用，那么 this 会被设置成那个对象，否则 this 的值被设置为全局对象或者 undefined（在严格模式下）。例如：

```javascript
function foo() {
  console.log(this.bar);
}
var bar = "bar1";
var o2 = { bar: "bar2", foo: foo };
var o3 = { bar: "bar3", foo: foo };

foo(); // bar1
o2.foo(); // bar2
foo.call(o3); // bar3

var name = "Nicolas";
function Person() {
  this.name = "Smiley";
  this.sayName = function () {
    console.log(this);
    console.log(this.name);
  };
  setTimeout(this.sayName, 0); // 第二次输出
}

var person = new Person(); //window, Nicolas
person.sayName(); // Person , Smiley

function Person() {
  this.name = "Smiley";
  this.sayName = function () {
    console.log(this);
    console.log(this.name);
  };
}

let person = new Person();
person.sayName.call({ name: "Nicolas" }); //{name:"Nicolas"},Nicolas

function Person() {
  this.name = "Smiley";
  this.sayName = function () {
    console.log(this);
    console.log(this.name);
  };
}

let person = new Person();
let sayNameCopy = person.sayName;
sayNameCopy(); // window,undefined;

function Person() {
  this.name = "Smiley";
  this.sayName = () => {
    console.log(this);
    console.log(this.name);
  };
}

let person = new Person();
person.sayName.call({ name: "Nicolas" }); // Person Smiley
```

```javascript
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f();
}
checkscope(); // local scope;

// B---------------------------
var scope = "global scope";
function checkscope() {
  var scope = "local scope";
  function f() {
    return scope;
  }
  return f;
}
checkscope()(); // local scope;
```
