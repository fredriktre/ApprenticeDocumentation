import { withSessionRoute } from "@/lib/auth/withSession";
import { mongooseConnect } from "@/lib/db/mongoose";
import { User } from "@/models/User";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import crypt from "bcryptjs"

const deleteRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    
    if (req.method !== "POST") return res.status(405).json({error: "This method is not allowed"})
    
    mongooseConnect();

    const {email, fullName, password} = req.body

    const userData = await User.findOne({email});    
}

export default withSessionRoute(deleteRoute);
