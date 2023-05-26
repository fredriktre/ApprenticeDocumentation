import { mongooseConnect } from '@/lib/db/mongoose';
import { Members } from '@/models/Members';
import { Request } from '@/models/Request';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const {method} = req

    if (method === "GET") {
        await mongooseConnect();

        const requests = await Request.find();

        if (requests) {
            res.status(200).json({message: "Successfully found requests", data: requests})
        }

    } else if (method === "POST") {

        if (req.body.type === "ACCEPT") {
            await mongooseConnect();

            const content = req.body.body

            const res1 = await Members.create({ 
                fullname: content.fullname,
                gender: content.gender,
                birthdate: content.birthdate,
                deathdate: content.deathdate,
                bornin: content.bornin,
                diedin: content.diedin,
                father: content.father,
                mother: content.mother,
                extrainfo: content.extrainfo,
                children: content.children,
                imageIds: content.imageIds
            })

            const res2 = await Request.findOneAndDelete({_id:req.body.body._id})

            return res.status(200).json({message: "successfully moved data"})

        } else if (req.body.type === "DELETE") {
            await mongooseConnect();

            const res = await Request.findOneAndDelete({_id:req.body.body._id})

            return res.status(200).json({message: "successfully deleted data"})
        }

    } else {
        res.status(405).json({message: "invalid method"})
    }
}