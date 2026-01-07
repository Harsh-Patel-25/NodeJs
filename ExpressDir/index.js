const express = require("express");
const app = express();

let port = 3000;

app.listen(port, ()=>{
    console.log(`app listening on ${port}`);
});

// app.use((req,res)=>{
//     console.log("request received");
//     res.send("<h1>Harsh Patel</h1>");
// });

app.get("/",(req,res)=>{
    res.send("Hello i am root.");
})
// app.get("/:username",(req,res)=>{
//     let {username} = req.params;
//     res.send(`Welcome to the page of @${username}.`);
// })
app.get("/search",(req,res)=>{
    let {q}= req.query; 
    if ( !q ) {
        res.send("Nothing searched.");
    }
    res.send(`search results for query : ${q}`);
})

// app.get("/apple",(req,res)=>{
//     res.send("You contected apple path.");
// })
// app.get("/banana",(req,res)=>{
//     res.send("You contected banan path.");
// })
// app.get("/grapes",(req,res)=>{
//     res.send("You contected grapes path.");
// })
// app.post("/",(req,res)=>{
//     res.send("you sent a post req to root.");
// })

//Path perameters