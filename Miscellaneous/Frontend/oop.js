//Factory Function
function personMaker(name, age) {
  const person = {
    name: name,
    age: age,
    talk: function () {
      console.log(`Hello!,my name is ${this.name} `);
    },
  };
  return person;
}

// Constructors - doesn't return anything & start with capital
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.talk = function () {
  console.log(`Hello!,my name is ${this.name} `);
};

let p_1 = new Person("Harsh", 20);
let p_2 = new Person("Kirtan", 21);

let p1 = personMaker("Harsh", 20);
let p2 = personMaker("Kirtan", 25);

//class in js
class NewPerson {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk() {
    console.log(`Hello!,my name is ${this.name} `);
  }
}

let np1 = new NewPerson("Harsh", 20);
let np2 = new NewPerson("Kirtan", 21);

//Inheritance using class in js
class Public {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  talk() {
    console.log(`Hello!,my name is ${this.name} `);
  }
}

class Student extends Public {
  constructor(name, age, marks) {
    super(name, age);
    this.marks = marks;
  }
}
class Teacher extends Public {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
}

//EX 2
class Mammal { //Parent class
  constructor(name) {
    this.name = name;
    this.type = "Warm-Blooded";
  }
  eat() {
    console.log("Eats food");
  }
}

class Dog extends Mammal { // child class
    constructor(name) {
        super(name);
    }
    bark(){
        console.log("Woof Woof");
    }
    walk(){
        console.log("Walks on 4 legs");
    }
}

class Cat extends Mammal { // child class
    constructor(name) {
        super(name);
    }
    meow(){
        console.log("Meow Meow");
    }
}
