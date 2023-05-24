import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { withSessionRoute } from "@/lib/auth/session";

const logoutRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    if (req.method !== "POST") return res.status(405).json({error: "Invalid Method"})
    
    await req.session.destroy()
    return res.status(200).json({message: "successfull logout"})

}

export default withSessionRoute(logoutRoute);