import { eq, and } from "drizzle-orm";
import { randomBytes, createHmac } from "node:crypto"
import userTable from "../db/schema.js"
import db from "../index.js"


export const PostSignup = async function(req,res) {
    try{
        // get all the data from the request body
        const { formdata } = req.body
        // check if the Gmail and username is present in the request body
        if (!formdata.Gmail || !formdata.Username)
        {
            return res.status(400).json({"Error":"Gmail or username is missing"})
        }

        // run a query in the database to check that this Gmail is there or not
        const result = await db.select()
            .from(userTable)
            .where(eq(userTable.email, formdata.Gmail))
        
            // if it is not there then hash the passwrd and push all the data in the db
        if (result.length === 0)
        {
            const salt = randomBytes(256).toString('hex')
                const hashedpassword = createHmac('sha256', salt).update(formdata.Password).digest('hex')
                await db.insert(userTable).values({
                    name: formdata.Name,
                    email: formdata.Gmail,
                    password: hashedpassword,
                    salt: salt
                });
                return res.status(200).json({
                    status: "success"
            })
        }
        else {
                // User already exists
                return res.status(400).json({
                    error: "Email already exists"
                })
            }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
}