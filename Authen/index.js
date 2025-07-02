const express=require("express");
const app=express();

app.use(express.json())

const users=[];
app.post("/signup",function(req,res){
   const username=req.body.username;
   const password=req.body.password;
   
   if(users.find(u=>u.username===username)){
    res.json({
        meassage:"You are already signed up "
    })
    return;
   }
   users.push({
    username:username,
    password:password
   })

   res.json({
    meassage:"Hey! you have signed in"
   })
});

app.post("/signin",function(req,res){

});

app.listen(3000);