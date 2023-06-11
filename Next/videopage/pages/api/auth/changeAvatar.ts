import { User } from "@/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Avatar } from "@/models/Avatar";
import { mongooseConnect } from "@/lib/db/mongoose";

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {method} = req

    if (method === "POST") {

        if (req.body.type === "GENERATE") {



        } else if (req.body.type === "WITHFILE") {
            

            
        }

    }

}