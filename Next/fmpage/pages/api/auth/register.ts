import alphabet from "@/lib/samples/alphabet";
import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import animals from "@/lib/samples/animals";
import { withSessionRoute } from "@/lib/auth/session";
import { createAvatar } from '@dicebear/core'
import { lorelei } from '@dicebear/collection'
const crypt = require('bcryptjs')

const registerRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    if (req.method !== "POST") return res.status(405).json({error: "Invalid Method"})
    
    mongooseConnect()

    const {email, password} = req.body
    let {name} = req.body

    const UD = await User.findOne({email})

    if (UD) return res.status(400).json({error: "User Already Exists"})
    if (password.length < 6) res.status(400).json({error: "Password too short"})

    if (name.length === 0) {
        name = `${animals[
                Math.floor(
                    Math.random() * animals.length - 1
                )
            ]
        }`
        for (let i = 0; i < 6; i++) {
            name = `${name}${
                alphabet[
                    Math.floor(
                        Math.random() * alphabet.length - 1
                    )
                ]
            }`
        }
    }

    const avatar = createAvatar(lorelei)
    const avatarURI:string = await (await avatar.toDataUri()).toString();

    const hashpass:string = await crypt.hash(password)

    const response:any = await User.create({
        email,
        name,
        passcode:hashpass,
        admin: false,
        avatarURI
    })

    req.session.user = {
        id: response._id,
        data: {
            email: response.email,
            name: response.name,
        },
        admin: response.admin
    }
    await req.session.save()
    return res.status(200).json({message: "successfull registration"})

}

export default withSessionRoute(registerRoute);