import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Avatar } from "@/models/Avatar";
import { mongooseConnect } from "@/lib/db/mongoose";

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {method} = req

    if (method === "POST") {
        await mongooseConnect();

        const _id = req.body.id

        if (_id.length > 0) {

            const avatar = await Avatar.findOne({_id})

            if (avatar) {

                return res.status(200).json({message: "found avatar", avatar: avatar.URI})

            }

        } else {
            return res.status(400).json({error: "need an id"})
        }

    } else {
        return res.status(405).json({error: "Invalid method"})
    }
}

export default handler