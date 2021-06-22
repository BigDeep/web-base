function Person(name,age,sex){
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.changeAge = ()=>{
        this.age++;
    }
}
Person.prototype.changeSex = function(sex){
    this.sex = sex
}

function Kid(name,age,sex,school){
    this.school = school;
    Person.call(this,name,age,sex)
}

Kid.prototype = new Person();
Kid.prototype.constructor = Kid;