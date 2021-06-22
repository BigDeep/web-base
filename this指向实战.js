// test1

function foo() { 
    console.log(this.bar); 
} 
var bar = "bar1"; 
var o2 = {bar: "bar2", foo: foo}; 
var o3 = {bar: "bar3", foo: foo}; 

foo();   // bar1           
o2.foo(); // bar2          
foo.call(o3); // bar3 


// test2 

var name = 'Nicolas';
function Person(){
    this.name = 'Smiley';
    this.sayName=function(){
        console.log(this); 
        console.log(this.name); 
    };
    setTimeout(this.sayName, 0);     // 第二次输出 window , Nicolas
}

var person = new Person();
person.sayName();		// 第一次输出 person Smiley


// test3
function Person() {
    this.name = "Smiley";
    this.sayName = function(){
      console.log(this);
      console.log(this.name); 
    };
  }
  
let person = new Person();
person.sayName.call({name: "Nicolas"}); // {name: "Nicolas"} Nicolas
  

// test4 

function Person() {
    this.name = "Smiley";
    this.sayName = function(){
      console.log(this);
      console.log(this.name); 
    };
  }
  let person = new Person();
  let sayNameCopy = person.sayName;
  window.sayNameCopy();  // window undefined


// test5

function Person() {
    this.name = "Smiley";
    this.sayName = ()=> {
      console.log(this);
      console.log(this.name); 
    };
  }
  
  let person = new Person();
  person.sayName.call({name: "Nicolas"}); // person Similey
  