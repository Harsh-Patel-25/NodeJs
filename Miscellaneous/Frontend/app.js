let arr = [1, 2, 3];
let arr2 = [1, 2, 3];

arr.sayhello = () => {
  console.log("Hello!,I am an array");
};
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

//Constructors - doesn't return anything & start with capital
function Person(name, age) {
  this.name = name;
  this.age = age  ; 
}
Person.prototype.talk = function () {
  console.log(`Hello!,my name is ${this.name} `);
}

let p1 = new Person("Harsh",20);
let p2 = new Person("Kirtan",21);


// let p1 = personMaker("Harsh",20);
// let p2 = personMaker("Kirtan",25);
