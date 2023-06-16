import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { mongooseConnect } from "@/lib/db/mongoose";
import { Comment } from "@/models/Comment";
import Cors from 'cors'

const handle:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {method} = req

    const cors = Cors({
        methods: ["POST", "GET", "HEAD"]
    })

    if (method === "POST") {

        if (req.body.type === "GET") {
            await mongooseConnect();
            
            const {id} = req.body;
    
            const response = await Comment.find({postID: id});
    
            return res.status(200).json({message: "Successfully retireved", content: response})
        } else if (req.body.type === "POST") {
            const {comment, userID, postID} = req.body;
            if (comment.length > 0) {

                await mongooseConnect();

                const date = new Date();
                let currentDate = `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;
                const response = await Comment.create({userID, content: comment, date:currentDate, postID})

                return res.status(200).json({message: "Comment successful", content: response})
            } else {
                return res.status(400).json({error: "Comment too short for processing"})
            }

        } else {
            return res.status(400).json({error: "Invalid type"})
        }

    } else {
        return res.status(405).json({error: "Invalid method"})
    }
}

export default handle