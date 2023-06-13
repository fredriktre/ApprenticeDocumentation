import { mongooseConnect } from "@/lib/db/mongoose";
import { Vlog } from "@/models/Vlog";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler:NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req

    if (method === "POST") {

        const { title, desc, videoURL, thumbnailURL } = req.body

        if (title.length > 0) {
            if (videoURL.length > 0) {
                if (thumbnailURL.length > 0) {

                    await mongooseConnect();

                    const response = await Vlog.create({
                        title: title,
                        desc: desc,
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

        
    } else {
        return res.status(405).json({error: "Method invalid"})
    }

}

export default handler