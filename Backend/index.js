import express from 'express'
import * as signup from "../Backend/src/controllers/Signup.controllers.js"
import * as login from "../Backend/src/controllers/login.controllers.js"

const web = express()
const port = 3000

web.use(express.json())
web.get('/',(req,res)=>{
    return res.json("your request has reached")
})
web.post('/signup',signup.PostSignup)
web.post('/login',login.postLogin)

web.listen(port,()=>{
    console.log(`the server is running ${port}`);
});