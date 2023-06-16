import { User } from "@/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Avatar } from "@/models/Avatar";
import { mongooseConnect } from "@/lib/db/mongoose";
import { createAvatar } from "@dicebear/core";
import * as avatarstyle from "@dicebear/bottts-neutral"
import { animals } from "@/lib/samples";
import { alphabet } from "@/lib/samples";
import Cors from 'cors'

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {method} = req

    const cors = Cors({
        methods: ["POST", "GET", "HEAD"]
    })

    if (method === "POST") {

        if (req.body.type === "GENERATE") {
            const {avatarID} = req.body
            const URI = await makeAvatar();
            const response = await Avatar.findOneAndUpdate({_id: avatarID}, {URI})
            return res.status(200).json({message: "Successfully generated new avatar"})
        } else if (req.body.type === "WITHFILE") {
            const {avatarID, file} = req.body
            const response = await Avatar.findOneAndUpdate({_id: avatarID}, {URI: file})
        
            return res.status(200).json({message: "Successfully uploaded new avatar"})
        } else {
            return res.status(400).json({error: "Invalid type"})
        }

    } else {
        return res.status(405).json({error: "Invalid method"})
    }

}

export default handler

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