import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/auth/session";
import { compare, hash } from "bcryptjs";

const registerRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    if (req.method !== "POST") return res.status(405).json({error: "Invalid Method"})
    
    mongooseConnect()

    const {email, password} = req.body

    const UD = await User.findOne({email})

    if (!UD) return res.status(404).json({error: "User Doesn't Exists"})

    const hashcheck = await compare(password, UD.passcode)

    if (!hashcheck) return res.status(400).json({error: "Wrong password"})
    
    req.session.user = {
        id: UD._id,
        data: {
            email: UD.email,
            name: UD.name,
        },
        admin: UD.admin,
        avatarURI: UD.avatarURI
    }
    await req.session.save()
    return res.status(200).json({message: "successfull login"})

}

export default withSessionRoute(registerRoute);