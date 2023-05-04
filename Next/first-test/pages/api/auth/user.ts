import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import crypt from "bcryptjs";

const handle = async (req:NextApiRequest, res:NextApiResponse) => {

    mongooseConnect();
    const { method } = req

    if (method === "GET") {
        const {email, password} = req.query
        if (email){
            if (password) {    
                const userInfo = await User.findOne({email});
                if (!!userInfo) {
                    const passMatches = await crypt.compare(password.toString(), userInfo.passcode)
                    if (passMatches) {

                        return res.status(200).json({message: "User was successfully logged in!", 
                        details: `User with email ${email} has been found, password matched, and the info has been sent to you.`,
                        body: {
                            _id: userInfo._id,
                            email,
                            fullName:userInfo.fullName,
                            securityLevel:userInfo.securityLevel
                        }})
    
                    } else {
                        return res.status(400).json({error: "Password is wrong", details: `The password you sent in does not match the password saved for the user. Please try something else`})
                    }
    
                } else {
                    return res.status(404).json({error: "User not found", details: `after searching the database with ${email}, we couldn't find the user. Please try another email`})
                }
            } else {
                return res.status(409).json({error: "Password not recieved", details: `You need to add a password to the get request`})
            }
        } else {
            return res.status(409).json({error: "Email not recieved", details: `You need to add an email to the get request`})
        }

    } else if (method === "POST") {

        const {email, fullName, password} = req.body
        console.log(req.body)
        
        const emailExists = User.findOne({email});
        if (!emailExists.email) {

            const hashedPass = await crypt.hash(password, 10)

            const data = {
                email,
                fullName,
                passcode:hashedPass,
                securityLevel:"none"
            }

            User.create(data).then((response:any) => {

                console.log(response)

                return res.status(201).json({message: "User was successfully registered", 
                details: `User with email ${email} and name ${fullName} has been registered as a user in our database`,
                body: {
                    email,
                    fullName,
                    securityLevel: "none"
                }})

            }).catch((error:any) => {
                return res.status(500).json({error: "Something went wrong when creating user", details: error})
            })

        } else {
            return res.status(403).json({error: "User already exists", details: `Email ${email} is already in our database.`})
        }

    // } else if (method === "PUT") {

    // } else if (method === "DELETE") {

    } else {
        return res.status(405).json({error: "Method not found", details: `${method} is not in use`})
    }
}

export default handle