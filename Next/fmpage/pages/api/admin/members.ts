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

        if (req.body.type === "POTENTIALS") {
            const {father, mother, children} = req.body.data

            const fatherData = {
                fullname: father,
                data: await Members.find({fullname: father})
            }
            const motherData = {
                fullname: mother,
                data: await Members.find({fullname: mother})
            }
            const childrenData = [];

            for (let i = 0; i < children.length; i++) {
                const childData = await Members.find({fullname: children[i]})
                if (childData) {
                    childrenData.push({
                        fullname: children[i],
                        data: childData
                    })
                } else {
                    childrenData.push({
                        fullname: children[i],
                        data: null
                    })
                }
            }

            return res.status(200).json({message: "successfully searched", data: {
                father: fatherData,
                mother: motherData,
                children: childrenData,
            }})
        }

    } else {
        res.status(405).json({message: "invalid method"})
    }
}