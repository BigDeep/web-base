function Person(){
    this.kind="person"; 
}

Person.prototype.eat=function(food){
    console.log(this.name+" is eating "+food);
}


/**
 * 构造函数继承
 * 缺点；只能对构造函数内的属性和方法进行继承，无法继承对象原型上的方法。
 */

function Student(name){
    Person.apply(this);
    this.name = name;
}

var martin=new student("martin");
console.log(martin.kind); //person
martin.eat("apple"); //报错

/**
 * 原型实例继承
 * 缺点1：通过子类新建出来的实例 实际上指向的都是同一个原型对象，当一个发生变化的时候，另外一个也随之进行了变化，这就是使用原型链继承方式的一个缺点。
 * 缺点2： 创建子类时不能给超累传参。
 */
function Student(name){
    this.name = name;
}
Student.prototype = new Person();
Student.prototype.construct= Student;


/**
 * 原型直接继承
 * 缺点：我们可以看出，这种方式无法继承父类构造函数中的属性与方法，但是可以继承父类构造函数的原型对象。
 */
function Student(name){
    this.name = name;
}

student.prototype=person.prototype;
student.prototype.constructor=student; //注意这一行产生的变化


/**
 * Class 继承
 */
class Person {
    constructor(){
        this.kind="person"
    }
    eat(food){
        console.log(this.name+" "+food);
    }
}

class Student extends Person{
    constructor(name){
        super();
        this.name=name;
    }
}

/**
 * 结合优缺点去写一个组合继承
 */

function Person(){
    this.kind="person"; 
}

Person.prototype.eat=function(food){
    console.log(this.name+" is eating "+food);
}

function Student(name){
    Person.call(this);
    this.name = name;
}
Student.prototype = new Person();
Student.prototype.constructor = Student;



/**
 * Object.create 方式的浅拷贝继承。(引用数据类型共享)
 */
 let parent4 = {

    name: "parent4",

    friends: ["p1", "p2", "p3"],

    getName: function() {

      return this.name;

    }

  };
  let person4 = Object.create(parent4);

  // 之前在 new仿写的时候遇到过



/**
 * 
 */
 function Parent(name, age){
    this.name = name;
    this.age = age;
    console.log('parent')
}

Parent.prototype.getName = function(){
    return this.name;
}

function Child(name, age, grade){
    Parent.call(this, name, age);
    this.grade = grade;
}

function inherit(parent,child){
    var parent = Object.create(parent);
    for(let key in child.prototype){
        Object.defineProperty(obj, key, {
            value: child.prototype[key]
        })
    }
    child.prototype = parent;
    child.prototype.constructor = child
}
inherit(Parent,Child);


/**
 * 总结:1、构造器继承，无法继承原型链。
 *     2、原型链继承，实例化出来的对象指向同一个原型对象，如果对象中有引用属性，那么则会共享修改。
 *     3、组合试继承比较完善，但也有缺点是一个继承当中调用了两次父类的构造函数。
 *     4、组合寄生式，也要注意。如果子类prototype 直接指向父类实例，那么子类原型上的方法会被覆盖。
 * 
 */








