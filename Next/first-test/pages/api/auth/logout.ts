import { withSessionRoute } from "@/lib/auth/withSession";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const logoutRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    
    if (req.method !== "POST") return res.status(405).json({error: "This method is not allowed"})
    
    req.session.destroy();
    return res.status(200).json({message: "successfully logged out"})

}

export default withSessionRoute(logoutRoute);
