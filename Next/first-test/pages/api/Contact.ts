import type { NextApiRequest, NextApiResponse } from 'next'
import { Contact } from '@/models/Contact'
import { mongooseConnect } from '@/lib/db/mongoose';


export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const { method } = req;
    await mongooseConnect();
    
    if (method === "POST") {

        const { title, sent, content } = req.body;

        await Contact.create( {
            title,
            sent,
            content
        } )

        res.status(200).json({
            comment: "Successfully recieved contactform",
        })
    } else {
        res.status(405)
    }

0}