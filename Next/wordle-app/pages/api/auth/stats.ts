import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Avatar } from "@/models/Avatar";
import { mongooseConnect } from "@/lib/db/mongoose";

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    const {method} = req
    
    if (method === "POST"){
        mongooseConnect();

        const {id} = req.body

        // const avatar = await Avatar.findOne({_id : id})

    } else {
        return res.status(405).json({error: "Method invalid"})
    }

}

export default handler