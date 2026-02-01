const express = require('express');
const { url } = require('inspector');
const app = express();
const port = 3000 ;
const path = require("path");
const {v4:uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");

app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));

let posts = [
    {
        id:uuidv4(),
        username:"bmw",
        content:"Made for rule.",
        image:"uploads/img1.jpg",
        date : "30/01/2026"
    },
    {
        id:uuidv4(),
        username:"lamborghini",
        content:"the naturalespirated power of v12",
        image:"uploads/img2.jpg",
        date : "08/01/2026"
    },
    {
        id:uuidv4(),
        username:"pagani",
        content:"Pagani never goes electric!",
        image:"uploads/img3.jpg",
        date : "15/01/2026"
    },
    {
        id:uuidv4(),
        username:"koenigsegg",
        content:"The fastest on the earth.",
        image:"uploads/img4.jpg",
        date : "20/01/2026"
    }
]


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.listen(port,()=>{
    console.log ("Listening to port 3000.");
}); 

app.post("/posts",(req,res)=>{
    let {username,content,image,date} = req.body;
    let id = uuidv4();
    posts.push({id,username,content,image,date});
    res.redirect("/posts");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>id===p.id);
    post.content = newContent;
    res.redirect("/posts");
    let newdate = req.body.date;
    post.date = newdate;
    let newimg = req.body.image;
    post.image = newimg;
});
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});