import db from "../index.js"
import userTable from "../db/schema.js"
import { eq } from "drizzle-orm";
import { createHmac } from 'crypto'; // to hash the password
import jwt from 'jsonwebtoken' // to generate web tokens

export const postLogin = async function (req,res) {
    const {Gmail,Password} = req.body.formdata;
    console.log(Gmail,Password)

    try {
        // if the user has not given any of this
        if (!Gmail){
            return res.status(400).json({"Error":"gmail is not defined"})
        }
        if (!Password){
            return res.status(400).json({"Error": "password is not defined"})
        }
        // this will serach for the user in the database if it doesnot exist then it will return
        const result = await db.select()
            .from(userTable)
            .where(eq(userTable.email,Gmail));
        
        if (result.length === 0){
            return res.status(404).json({"Error":"User not found pls register first"})
        }

        // user is not there so creating a new user
        const user = result[0]

        // hashing the password they have given in the same way in which i have hashed
        const hashedpassword = createHmac('sha256',user.salt)
            .update(Password)
            .digest('hex')
        // checking before hashed password with the present hashed password , if they matched then the user is a valid person
        if (hashedpassword === user.password){
            console.log("Password matched,creating token");

            // generating jwt tokens for the session based auth
            if (!process.env.JWT_TOKEN){
                console.log("jwt token is missing")
                return res.status(500).json({'Error':'Server configration is not wrking'})
            }

            // once generated putthing in the payload so that the browser can use this for futher request
            const token = jwt.sign(
                {email:user.email},
                process.env.JWT_TOKEN,
                {expiresIn:'7d'}
            )

            console.log("token created successfully")

            return res.status(200).json({
                status: "success",
                    token: token,
                    user: { 
                        email: user.email 
                    }
            })
            
        }
        return res.status(400).json({ error: "Invalid credentials" });
    
    } catch (error) {
        console.error("Login error:", error); 
        console.error("Error stack:", error.stack);
        return res.status(500).json({ error: "Internal Server Error" });
    }
    
}