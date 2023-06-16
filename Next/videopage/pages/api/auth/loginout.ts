import { withSessionRoute } from "@/lib/auth/session";
import { User } from "@/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import crypt from 'bcryptjs'
import { mongooseConnect } from "@/lib/db/mongoose";
import Cors from 'cors'

const loginoutRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {method} = req

    const cors = Cors({
        methods: ["POST", "GET", "HEAD"]
    })

    if (method === "POST") {

        if (req.body.type === "LOGIN") {
            await mongooseConnect();

            const {email, password} = req.body
            console.log(email);
            const userData = await User.findOne({email})

            if (userData) {

                const passMatch = await crypt.compare(password, userData.passcode)

                if (passMatch) {

                    req.session.user = {
                        id: userData._id,
                        data: {
                            email: userData.email,
                            name: userData.username,
                        },
                        admin: userData.admin,
                        avatar: userData.avatar
                    }
                    await req.session.save()
                    return res.status(200).json({message: "Successfully registered and logged in"})

                } else {
                    return res.status(400).json({error: "Wrong password"})
                }

            } else {
                return res.status(404).json({error: "Email not found"})
            }            

        } else if (req.body.type === "LOGOUT") {

            req.session.destroy();
            return res.status(200).json({message: "Logged out"})

        } else {
            return res.status(400).json({error: "Either lacks type or the type is invalid"})
        }

    } else {
        return res.status(405).json({error: "Invalid method"})
    }
}

export default withSessionRoute(loginoutRoute)