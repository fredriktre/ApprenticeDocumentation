import { mongooseConnect } from "@/lib/db/mongoose";
import { Vlog } from "@/models/Vlog";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import Cors from 'cors'

const handler:NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req

    const cors = Cors({
        methods: ["POST", "GET", "HEAD"]
    })

    if (method === "GET") {
        await mongooseConnect();

        const response = await Vlog.find();

        return res.status(200).json({message: "Successfully recieved vlog", content: response})
    } else if (method === "POST") {

        if (req.body.type === "POST") {
            const { title, desc, videoURL, thumbnailURL } = req.body

            if (title.length > 0) {
                if (videoURL.length > 0) {
                    if (thumbnailURL.length > 0) {

                        await mongooseConnect();

                        const date = new Date();
                        let currentDate = `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;

                        const response = await Vlog.create({
                            title: title,
                            desc: desc,
                            date: currentDate,
                            videoURL: videoURL,
                            thumbnailURL: thumbnailURL,
                        })

                        if (response) {
                            return res.status(200).json({message: "Successfully uploaded vlog"})
                        } else {
                            return res.status(500).json({error: "Something went wrong, please try again..."})
                        }

                    } else {
                        return res.status(400).json({error: "thumbnailURL invalid"})     
                    }
                } else {
                    return res.status(400).json({error: "videoURL invalid"})
                }
            } else {
                return res.status(400).json({error: "title invalid"})
            }
        } else if (req.body.type === "GETSPESIFIC") {

            const {id} = req.body;

            if (id.length > 0) {
                await mongooseConnect();

                const vlogData = await Vlog.findOne({_id: id})
                return res.status(200).json({message: "Succesfully retrieved", content: vlogData})
            } else {
                return res.status(400).json({error: "ID required"})
            }

        } else {
            return res.status(400).json({error: "Type invalid"})
        }

        
    } else {
        return res.status(405).json({error: "Method invalid"})
    }

}

export default handler