import { mongooseConnect } from "@/lib/db/mongoose";
import { Blog } from "@/models/Blog";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler:NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req

    if (method === "GET") {
        await mongooseConnect();

        const response = await Blog.find();

        return res.status(200).json({message: "Successfully recieved blog", content: response})
    } if (method === "POST") {

        const {type} = req.body

        if (type === "POST") {
            const {title, content, imageLinks} = req.body.body

            console.log(title, content, imageLinks)

            await mongooseConnect();

            const date = new Date();
            let currentDate = `${date.getUTCDate()}-${date.getUTCMonth()}-${date.getUTCFullYear()}`;

            const response = await Blog.create({
                title: title,
                content: content,
                date: currentDate,
                imageLinks: imageLinks,
            })
            
            return res.status(200).json({message: "Succesfully posted"})
        } else if (type === "EDIT") {
            
            
            return res.status(200).json({message: "Succesfully edited"})
        } else if (type === "GETSPESIFIC") {
            
            const {id} = req.body;

            if (id.length > 0) {

                await mongooseConnect();

                const blogData = await Blog.findOne({_id: id})
                return res.status(200).json({message: "Succesfully retrieved", content: blogData})
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