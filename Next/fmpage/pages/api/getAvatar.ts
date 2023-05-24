import { mongooseConnect } from "@/lib/db/mongoose";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { Avatar } from "@/models/Avatar";


const getAvatarRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    if (req.method !== "POST") return res.status(405).json({error: "Invalid Method"})
    mongooseConnect();

    const {id} = req.body

    const AD = await Avatar.findOne({_id:id})

    if (!AD) return res.status(404).json({error: "could not find avatar"}) 

    return res.status(200).json({message: "successfully retrieved avatar", data: AD.URI})

}

export default getAvatarRoute;