const express=require("express");
const app=express();

const jwt=require("jsonwebtoken");
const JWT_SECRET="randomakshita"
app.use(express.json());

const users=[];

// function generateToken(){
//     let options=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','1','2','3','4','5','6','7','8','9','0']
//     let token="";
//     for(let i=0;i<32;i++){
//       token+=options[Math.floor(Math.random()*options.length)];
//     }
//     return token;
// }



app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;


     if(users.find(u=>u.username===username)){
        res.json({
            message:"You are already signedup"
        })
        return;
     }
    users.push({
        username:username,
        password:password
    })

    res.json({
        message:"You are signed up"
    })
    console.log(users);
})

app.post("/signin",function(req,res){
    const username=req.body.username;
    const password=req.body.password;

    let foundUser=null;
    for(let i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            foundUser=users[i];
            break;
        }
    }
    if(foundUser){
        const token=jwt.sign({
            username:username
        },JWT_SECRET); //convert their username over to a JWT
        // foundUser.token=token;
        res.json({
            message:token
        })
    }else{
        res.status(404).send({
            message:"Invalid username or password"
        })
    }
    console.log(users);
})

app.get("/",function(req,res){
    res.send("hello");
})

app.get("/me",function(req,res){
    const token=req.headers.token;//jwt
    const decodedInformation=jwt.verify(token,JWT_SECRET);//{username:"akshita"}

    const username=decodedInformation.username;
    let foundUser=null;
    for(let i=0;i<users.length;i++){
    if(users[i].username===username){
        foundUser=users[i];
    }
    }
    if(foundUser){
    res.json({
        username:foundUser.username,
        password:foundUser.password
    })
    }else{
    res.json({
        message:"Invalid token"
    })
    }
})
app.listen(3000);