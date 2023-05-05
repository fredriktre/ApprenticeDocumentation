import { withSessionRoute } from "@/lib/auth/withSession";
import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import crypt from "bcryptjs"

const loginRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    
    if (req.method !== "POST") return res.status(405).json({error: "This method is not allowed"})
    
    mongooseConnect()

    const { email, password } = req.body

    const userData = await User.findOne({email});

    if (userData) {

        const hashMatch = await crypt.compare(password, userData.passcode)

        if (hashMatch) {

            let admin = true
            if (userData.securityLevel != "admin") {
                admin = false;
            }

            req.session.user = {
                id: userData._id,
                data: {
                    email: userData.email,
                    fullName: userData.fullName,
                },
                admin: admin
            }
            req.session.save().then(() => {
                return res.status(200).json({
                    message: "You have successfully logged in", 
                    details: `You have logged in with the email ${userData.email}, and you are ${admin ? "an admin" : "not an admin"}`
                })
            })

        } else {
            return res.status(400).json({error: "Password is wrong, try again."})
        }

    } else {
        return res.status(404).json({error: "Could not find user..."})
    }


}

export default withSessionRoute(loginRoute);
