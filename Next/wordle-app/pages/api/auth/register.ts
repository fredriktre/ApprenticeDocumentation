import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { animals, alphabet } from "@/lib/samples";
import { createAvatar } from "@dicebear/core";
import * as botttsNeutral from '@dicebear/bottts-neutral'
import { Avatar } from "@/models/Avatar";
import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import crypt from "bcryptjs";
import { withSessionRoute } from "@/lib/auth/session";
import { Profanity, ProfanityOptions } from "@2toad/profanity";

const registerRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const poptions = new ProfanityOptions();
    const profanity = new Profanity
    poptions.wholeWord = true
    const { method } = req

    if (method === "POST") {
        mongooseConnect();
        const { email, password } = req.body;
        let username:string = req.body.username;

        if (username.length < 1) {
            username = `${animals[Math.floor(Math.random() * animals.length)]}-`
            for (let i = 0; i < 6; i++) {
                username = `${username}${alphabet[Math.floor(Math.random() * alphabet.length)]}`
            }
        } else if (profanity.exists(username) === true) {

        }
        const checkUsers = await User.findOne({email})
        if (!checkUsers) {
            const avatar:string = await makeAvatar();
            const avatarRes = await Avatar.create({URI:avatar})
            console.log(avatarRes)
            if (avatarRes) {
    
                const hashed = await crypt.hash(password, 10)  
    
                const response = await User.create({
                    email,
                    name:username,
                    passcode: hashed,
                    admin: false,
                    avatar: avatarRes._id
                })
    
                req.session.user = {
                    id: response._id,
                    data: {
                        email: response.email,
                        name: response.name,
                    },
                    admin: response.admin,
                    avatar: response.avatar
                }
                await req.session.save()
                return res.status(200).json({message: "Successfully registered and logged in"})
    
            } else {
                return res.status(500).json({error: "Something went wrong when generating avatar"})
            }
        } else {
            return res.status(400).json({error: "User already exists"})
        }

    } else {
        return res.status(405).json({error: "method invalid"})
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

    const avatar = createAvatar(botttsNeutral, {
        seed:seed,
        backgroundColor: [`${hex}`]
    })

    const avatarURI = await avatar.toDataUri()
    return avatarURI.toString()
}

export default withSessionRoute(registerRoute);