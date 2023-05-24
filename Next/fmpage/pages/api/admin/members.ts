import { mongooseConnect } from '@/lib/db/mongoose';
import { Members } from '@/models/Members';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const {method} = req

    if (method === "GET") {
        await mongooseConnect();

        const members = await Members.find();

        if (members) {
            res.status(200).json({message: "Successfully found members", data: members})
        }

    } else if (method === "POST") {

        

    } else {
        res.status(405).json({message: "invalid method"})
    }
}