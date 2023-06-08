import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Avatar } from "@/models/Avatar";
import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import crypt from "bcryptjs";
import { withSessionRoute } from "@/lib/auth/session";

const loginRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {method} = req
    if (method === "POST") {
        const {type} = req.body
        if (type === "LOGIN") {
            const {email, password} = req.body

            const userData = await User.findOne({email})
            if (userData) {
                const unhashed:boolean = await crypt.compare(password, userData.passcode) 
                if (unhashed) {

                    req.session.user = {
                        id: userData._id,
                        data: {
                            email: userData.email,
                            name: userData.name,
                        },
                        admin: userData.admin,
                        avatar: userData.avatar
                    }
                    await req.session.save()
                    return res.status(200).json({message: "Successfully logged in"})

                } else {
                    return res.status(400).json({error: "Password invalid"})
                }
            } else {
                return res.status(404).json({error: "Could not find email"})
            }

        } else if (type === "LOGOUT") {

            req.session.destroy();

            res.status(200).json({message: "loggedout"})

        } else {
            return res.status(404).json({error: "type invalid"})
        }
    } else {
        return res.status(405).json({error: "method invalid"})
    }
}

export default withSessionRoute(loginRoute);