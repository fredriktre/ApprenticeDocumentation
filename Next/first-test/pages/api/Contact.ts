import type { NextApiRequest, NextApiResponse } from 'next'
import { Contact } from '@/models/Contact'
import { mongooseConnect } from '@/lib/db/mongoose';

interface Data {
    type: string,
    comment: string,
    body: string,
}

export default async function handle(req:NextApiRequest, res:NextApiResponse<Data>) {
    const { method } = req;
    await mongooseConnect();
    
    if (method === "POST") {

        const { title, sent, content } = req.body;

        const contactDoc = await Contact.create( {
            title,
            sent,
            content
        } )

        res.status(200).json({
            type: "POST",
            comment: "Successfully recieved contactform",
            body: contactDoc
        })
    }

0}