import { mongooseConnect } from "@/lib/db/mongoose";
import { Thread } from "@/models/Thread";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const {method} = req;

    if (method === "GET") {
        await mongooseConnect();
        
        const threadData = await Thread.find();

        if (threadData) {
            res.status(200).json({message: "successfully retrieved threads", data: threadData})
        } else {
            res.status(404).json({error: "nothing found"})
        }
        
    } else if (method === "POST") {
        if (req.body.type === "SPECIFIC") {
            await mongooseConnect();
        } else if (req.body.type === "CREATE") {
            await mongooseConnect();
            
        } else if (req.body.type === "DELETE") {
            await mongooseConnect();

        } else {
            res.status(405).json({error: "Type invalid or non-existent"})
        }        
    } else {
        res.status(405).json({error: "Method invalid"})
    }
    

}

export default handler