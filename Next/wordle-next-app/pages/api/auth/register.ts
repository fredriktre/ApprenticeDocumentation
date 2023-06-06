import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NamePieces, Characters } from "@/lib/samples";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral } from "@dicebear/collection";
import { Avatar } from "@/models/Avatar";

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const { method } = req

    if (method === "POST") {

        const avatar = await makeAvatar()

        const avatarRes = await Avatar.create({URI:avatar})

        if (avatarRes) {

            

            return res.status(200).json({message: "hi"})
        } else {
            return res.status(500).json({error: "Something went wrong when generating avatar"})
        }

    } else {
        return res.status(405).json({error: "method invalid"})
    }
}

async function makeAvatar() {
    let seed = "";
    seed = NamePieces[Math.floor(Math.random() * NamePieces.length)]
    for (let i = 0; i < 12; i++) {
        seed = `${seed}${Characters[Math.random() * Characters.length]}`
    }

    const r = Math.floor(Math.random() * 256) 
    const g = Math.floor(Math.random() * 256) 
    const b = Math.floor(Math.random() * 256) 
    const rgb = `${r}${g}${b}`
    
    const avatar = createAvatar(botttsNeutral, {
        seed:seed,
        backgroundColor: [rgb]
    })

    const avatarURI = await avatar.toDataUri()
    return avatarURI.toString()
}

export default handler;