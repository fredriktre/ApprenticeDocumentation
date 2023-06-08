import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Avatar } from "@/models/Avatar";
import { mongooseConnect } from "@/lib/db/mongoose";

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    const {method} = req
    
    if (method === "POST"){
        mongooseConnect();

        const {id} = req.body

        const avatar = await Avatar.findOne({_id : id})

        if (avatar) {
            return res.status(200).json({message: "successfully got avatar", data: avatar.URI});
        } else {
            return res.status(404).json({error: "could not find avatar"})
        }
    } else {
        return res.status(405).json({error: "Method invalid"})
    }

}

export default handler