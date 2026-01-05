// let args = process.argv; //we can use arguments fromm the terminal's command in node
// for(let i=2;i<args.length;i++){
//     console.log("Hello to",args[i])
// };

// let data = require("./math"); // requre is use to use another file's export data
//./ is current folders math file

// console.log(data);

//Data transfer from one directory to another
//When i need data of fruit folder
let info = require("./Fruits");
console.log(info);