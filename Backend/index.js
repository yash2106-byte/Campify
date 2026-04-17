import express from 'express'




const web = express()
const port = 3000






web.use(express.json())
web.listen(port,()=>{
    console.log(`the server is running ${port}`);
});