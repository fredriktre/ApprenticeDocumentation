import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/auth/session";
import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { animals } from "@/lib/samples";
import { alphabet } from "@/lib/samples";
import crypt from "bcryptjs"
import { createAvatar } from "@dicebear/core";
import * as avatarstyle from "@dicebear/bottts-neutral"
import { Avatar } from "@/models/Avatar";

const regiserRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const { method } = req
    console.log("hi")
    if (method === "POST") {
        await mongooseConnect();

        const {email, password} = req.body;
        let {username} = req.body

        const checkUser = await User.findOne({email})

        if (!checkUser) {

            if (username.length < 1) {
                username = `${animals[Math.floor(Math.random() * animals.length)]}-`
                for (let i = 0; i < 6; i++) {
                    username = `${username}${alphabet[Math.floor(Math.random() * alphabet.length)]}`
                }
            }

            const passcode = await crypt.hash(password, 10)

            const URI = await makeAvatar();
            const avatar = await Avatar.create({URI});
            const userData = await User.create({
                email,
                username,
                passcode,
                admin: false,
                avatar: avatar._id,
            })

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
            return res.status(400).json({error: "User already exists"})
        }

    } else {
        return res.status(405).json({error: "Invalid method"})
    }
}

async function makeAvatar() {
    let seed = "";
    seed = animals[Math.floor(Math.random() * animals.length)]
    for (let i = 0; i < 12; i++) {
        seed = `${seed}${alphabet[Math.random() * alphabet.length]}`
    }

    const r = Math.floor(Math.random() * 256) 
    const g = Math.floor(Math.random() * 256) 
    const b = Math.floor(Math.random() * 256) 
    const hex = `${r.toString(16)}${g.toString(16)}${b.toString(16)}`;

    const avatar = createAvatar(avatarstyle, {
        seed:seed,
        backgroundColor: [`${hex}`]
    })

    const avatarURI = await avatar.toDataUri()
    return avatarURI.toString()
}

export default withSessionRoute(regiserRoute)