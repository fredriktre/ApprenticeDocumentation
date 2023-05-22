import { mongooseConnect } from '@/lib/db/mongoose';
import { Request } from '@/models/Request';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const {method} = req

    if (method === "POST") {
        await mongooseConnect();

        const { email, fullname, gender, birthdate, bornin, diedin, father, mother, extrainfo, children, imageIds } = req.body
        
        Request.create({
            email, 
            fullname, 
            gender, 
            birthdate, 
            bornin, 
            diedin, 
            father, 
            mother, 
            extrainfo, 
            children,
            imageIds
        })

        res.status(200)
    } else {
        res.status(405)
    }
}