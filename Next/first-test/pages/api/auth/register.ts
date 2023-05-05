import { withSessionRoute } from "@/lib/auth/withSession";
import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import crypt from "bcryptjs"

const registerRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    
    if (req.method !== "POST") return res.status(405).json({error: "This method is not allowed"})
    
    mongooseConnect()

    const {email, fullName, password} = req.body

    const userData = await User.findOne({email});
    console.log(userData);
    if (!userData) {

        const hashed = await crypt.hash(password, 10);

        User.create({
            email,
            fullName,
            passcode:hashed,
            securityLevel: "none"
        }).then((response:any) => {
            let checkAdmin = true;
            if (response.securityLevel !== "admin") {
                checkAdmin = false;
            }

            req.session.user = {
                id: response._id,
                data: {
                    email: response.email,
                    fullName: response.fullName,
                },
                admin: checkAdmin
            }
            req.session.save().then(() => {
                return res.status(200).json({message: "User successfully registered and logged in"})
            })
        })

    } else {
        console.log(userData)
    }
}

export default withSessionRoute(registerRoute);
