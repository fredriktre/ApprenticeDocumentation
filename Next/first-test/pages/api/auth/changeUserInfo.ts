import { withSessionRoute } from "@/lib/auth/withSession";
import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import crypt, { hash } from "bcryptjs"

const changeRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    
    if (req.method !== "POST") return res.status(405).json({error: "This method is not allowed"})
    
    mongooseConnect()

    const {oldEmail, email, fullName, password} = req.body

    if (email.length > 0 && fullName.length > 0) {
        console.log(oldEmail) 
        const userData = await User.findOne({email: oldEmail});
        console.log(userData) 
        if (userData) {
            if (password.length > 0) {
    
                const hashed = await crypt.hash(password, 10);
    
                const response = await User.updateOne({email}, {
                    email,
                    fullName,
                    passcode: hashed,
                    securityLevel: userData.securityLevel
                })
    
                let admin = true
                if (userData.securityLevel !== "admin") {
                    admin = false;
                }
    
    
                if (response) {
                    req.session.user = {
                        id: userData._id,
                        data: {
                            email,
                            fullName,
                        },
                        admin: admin
                    }
                    req.session.save().then(() => {
                        return res.status(200).json({
                            message: "You have successfully changed your user!",
                            body: {
                                id: userData._id,
                                data: {
                                    email,
                                    fullName,
                                },
                                admin: admin
                            }, 
                        })
                    })
                }
            } else {
                const response = await User.updateOne({email}, {
                    email,
                    fullName,
                    passcode: userData.passcode,
                    securityLevel: userData.securityLevel
                })
    
                let admin = true
                if (userData.securityLevel !== "admin") {
                    admin = false;
                }
    
    
                if (response) {
                    req.session.user = {
                        id: userData._id,
                        data: {
                            email,
                            fullName,
                        },
                        admin: admin
                    }
                    req.session.save().then(() => {
                        return res.status(200).json({
                            message: "You have successfully changed your user!", 
                        })
                    })
                }
            }
        } else {
            return res.status(500).json({error: "could not find user.... Somehow...."})
        }
    } else {
        return res.status(400).json({error: "User input data not there"})
    }

}

export default withSessionRoute(changeRoute);