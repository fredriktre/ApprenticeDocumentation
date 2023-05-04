import { mongooseConnect } from '@/lib/db/mongoose';
import { Post } from '@/models/Post';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    
    const { method } = req;
    await mongooseConnect();

    if (method === "GET") {
        if(req.query?.id) {
            const data = await Post.findOne({_id: req.query.id});
            res.status(200).json(data)
        } else {
            const data = await Post.find();
            res.status(200).json(data)
        }
    }

    if (method === "POST") {
        const { title, body } = req.body;

        const date = Date.now();
        await Post.create({ 
            title,
            updated: date,
            content: body
        })

        res.status(201).json("Published")
    }

    if (method === "PUT") {
        const date = Date.now();
        const {title,body,_id} = req.body;

        await Post.updateOne({_id}, {
            title,
            updated: date,
            content: body
        });

        res.status(201).json("Published");
    }

    if (method === "DELETE") {
        if (req.query?.id) {
            await Post.deleteOne({_id:req.query.id})
            res.status(202).json("Deleted");
        }
    }

}