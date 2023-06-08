import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/lib/auth/session";

const regiserRoute:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    

}

export default withSessionRoute(regiserRoute)