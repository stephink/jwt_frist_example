require('dotenv').config()
const express=require('express')
const app=express()
app.use(express.json())

const jwt=require('jsonwebtoken')

const state=[
    {
        name:"stev",
        pass:"1234"
    },
    {
        name:"dev",
        pass:"321"
    }
]


app.get('/user',auth,(req,res)=>{
    res.send(state.filter(post=>post.name===req.user.name))
})

app.post('/login',(req,res)=>{
    const username=req.body.username;
    const user={name:username};
    const acces=jwt.sign(user,process.env.Access_token)
    res.json(acces)
})


function auth (req,res,next){
    const auth=req.headers['authorization']
    // res.send(auth)
    const token=auth && auth.split(' ')[1]
    if (token==null)return res.send("undefined")
    
    jwt.verify(token,process.env.Access_token,(err,user)=>{
        if(err) return req.send("no details")

        req.user=user
        next()
    })

}

app.listen(3000)
