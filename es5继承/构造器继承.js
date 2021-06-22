var Person = function(age,name){
    this.age = age;
    this.name = name;
}
Person.prototype.sayName = function(){
    console.log(this.name);
}

var Son = function(sex){
    Person.apply(this);
    this.sex = sex;
}

var son = new Son('sex');
son.sayName();