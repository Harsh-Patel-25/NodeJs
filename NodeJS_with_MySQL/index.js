const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const app = express();
const uuid = require("uuid");
const path = require("path");
const methodOverride= require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "",
});

connection.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
  } else {
    console.log("Connected to MySQL");
  }
});
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  connection.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.send("Some error in DB.");
    }
    let count = result[0]["count(*)"];
    res.render("home.ejs",{ count });
  });
});

app.get("/user", (req,res)=>{
  let q = `SELECT * FROM user`;
  connection.query(q, (err, users) => {
    if (err) {
      console.error(err);
      return res.send("Some error in DB.");
    }
    res.render("showusers.ejs",{ users });
  });
});

app.get("/user/:id/edit",(req,res)=>{
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  
  try{
    connection.query(q, [id], (err, result) => {
    if (err) throw err;
    console.log(result);
    let user = result[0];
    res.render("edit.ejs",{ user });
  });
  }catch(err){
    console.error(err);
    res.send("Some error in DB.");
  }
});

//EDIT user route 
app.patch("/user/:id",(req,res)=>{
  let { id } = req.params;
  let { password : formPass, username : newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try{
    connection.query(q, [id], (err, result) => {
    if (err) throw err;
    let user = result[0];
    if(formPass != user.PASSWORD){
      res.send("Incorrect password. Cannot edit user.");
    } else {
      let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = '${id}'`;
      connection.query(q2, (err, result) => {
        if (err) throw err;
        res.redirect(`/user`);
      });
    }
  });
  }catch(err){
    console.error(err);
    res.send("Some error in DB.");
  }
});

app.get("/user/new",(req,res)=>{
  res.render("new.ejs");
});

app.post("/user",(req,res)=>{
  let { username, email, password } = req.body;
  let id = uuid.v4();
  let q = `INSERT INTO user(id,username,email,password) VALUES ('${id}','${username}','${email}','${password}')`;
  connection.query(q, (err, result) => {
    if (err) {
      console.error(err);
      return res.send("Some error in DB.");
    }
    res.redirect(`/user`);
  });
});

app.get("/user/:id/delete",(req,res)=>{
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try{
    connection.query(q, [id], (err, result) => {
    if (err) throw err;
    let user = result[0];
    console.log(user);
    res.render("delete.ejs",{ user });
  });
  }catch(err){
    console.error(err);
    res.send("Some error in DB.");
  }
});

app.delete("/user/:id",(req,res)=>{
  let { id } = req.params;
  let { password : formPass } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try{
    connection.query(q, [id], (err, result) => {
      if (err) throw err;
      let user = result[0];
      if(formPass !== user.PASSWORD){
        res.send("Incorrect password. Cannot delete user.");
      } else {
        let q2 = `DELETE FROM user WHERE id = '${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.redirect(`/user`);
        });
      }
    });
  }catch(err){
    console.error(err);
    res.send("Some error in DB.");
  }
});


app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

//Four ways to use mysql
//1. Workbench
//2. MySQL package
//3. CLI :-  /c/xampp/mysql/bin/mysql -u root
//4. using .sql file

// let q = "INSERT INTO user(id,username,email,password) VALUES ?";
// let data = [];

// for (let i=0;i<=100;i++){
//   data.push(getRandomUser());//insert 100 random users in the database
// }

// connection.query(q, [data], (err, result) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result);
//   }
// });

// connection.end();
