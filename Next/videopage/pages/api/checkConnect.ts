import { User } from "@/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    return res.status(200).json({message: "Hello from backend!"})

}

export default handler