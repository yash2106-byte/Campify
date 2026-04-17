import express from 'express'




const web = express()
const port = 3000


web.get('/',(req,res)=>{
    return res.json("your request has reached")
})



web.use(express.json())
web.listen(port,()=>{
    console.log(`the server is running ${port}`);
});