import db from "../index.js"
import userTable from "../db/schema.js"
import { eq } from "drizzle-orm";
import { createHmac } from 'crypto';
import jwt from 'jsonwebtoken'

export const postLogin = async function (req,res) {
    const {Gmail,Password} = req.body;

    try {
        if (!Gmail|| !Password){
            return res.status(400).json({"Error": "Gmail or Password is not defined"})
        }

        const result = await db.select()
            .from(userTable)
            .where(eq(userTable.email,Gmail));
        
        if (result.length === 0){
            return res.status(404).json({"Error":"User not found pls register first"})
        }

        const user = result[0]

        const hashedpassword = createHmac('sha256',user.salt)
            .update(Password)
            .digest('hex')

        if (hashedpassword === user.password){
            console.log("Password matched,creating token");

            if (!process.env.JWT_TOKEN){
                console.log("jwt token is missing")
                return res.status(500).json({'Error':'Server configration is not wrking'})
            }

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