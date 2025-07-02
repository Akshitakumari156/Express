const express=require("express")
const app=express();
app.use(express.json());
const jwt=require("jsonwebtoken");
const JWT_SECRET="akshitakumari"
const users=[];
app.post("/signup",function(req,res){
    const username=req.body.username;
    const password=req.body.password;
    for(let i=0;i<users.length;i++){
        if(users[i].username===username && users[i].password===password){
            res.json({
                message:"You are already signed up"
            })
            return;
        }
    }
    users.push({
        username:username,
        password:password
    })
    res.json({
        message:"You are signedup"
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
        },JWT_SECRET);
        res.json({
            message:token
        })
    }else{
        res.json({
            message:"Invalis password or username"
        })
    }
    console.log(users);
})
function auth(req,res,next){
    const token=req.headers.token;
    try{
        const decodedInformation=jwt.verify(token,JWT_SECRET)
        if(decodedInformation.username){
        req.username=decodedInformation.username;
        next();
        }else{
        res.json({
            message:"Invalid token"
        })
        }
    }catch(err){
        res.status(401).json({ message: "Invalid or missing token" });
    }
}
function logger(req,res,next){
    console.log(`${req.method} request came`);
    next();
}
app.get("/me",logger,auth,function(req,res){
    // res.json({
    //     username:req.username
    // })
    let foundUser=null;
    for(let i=0;i<users.length;i++){
    if(users[i].username===req.username){
        foundUser=users[i];
    }
    }
    res.json({
        username:foundUser.username,
        password:foundUser.password
    })
})
app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/index.html");
})
app.listen(3000);