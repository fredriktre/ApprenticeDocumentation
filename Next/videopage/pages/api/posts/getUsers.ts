import { withSessionRoute } from "@/lib/auth/session";
import { User } from "@/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/db/mongoose";

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {method} = req

    if (method === "POST") {

        if (req.body.type === "GETLISTOFUSERS") {
            await mongooseConnect();
            
            const {ids} = req.body

            const userList = []

            for (let i = 0; i < ids.length; i++) {
                const response = await User.findOne({_id: ids[i]});
                userList.push({
                    id: response._id,
                    data: {
                        email: response.email,
                        name: response.username,
                    },
                    admin: response.admin,
                    avatar: response.avatar,
                })
            }

            
            return res.status(200).json({message: "Successfully retrieved users", content:userList})
        } else {
            return res.status(400).json({error: "Invalid type"})
        }

    } else {
        return res.status(405).json({error: "Invalid method"})
    }
}

export default handler