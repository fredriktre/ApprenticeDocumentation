import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/auth/session";
import { compare, hash } from "bcryptjs";

const registerRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    if (req.method !== "POST") return res.status(405).json({error: "Invalid Method"})
    
    return res.status(200).json({message: "successfull edit"})

}

export default withSessionRoute(registerRoute);