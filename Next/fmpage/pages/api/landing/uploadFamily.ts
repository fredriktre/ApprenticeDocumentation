import { mongooseConnect } from '@/lib/db/mongoose';
import { Request } from '@/models/Request';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const {method} = req

    if (method === "POST") {
        await mongooseConnect();

        Request.create({
            email: req.body.email,
            fullname: req.body.fullname,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
            bornin: req.body.bornin,
            diedin: req.body.diedin,
            father: req.body.father,
            mother: req.body.mother,
            extrainfo: req.body.extrainfo,
            children: req.body.children,
            imageIds: req.body.imageIds
        });

        res.status(200).json({message: "success"})
    } else {
        res.status(405).json({message: "invalid method"})
    }
}