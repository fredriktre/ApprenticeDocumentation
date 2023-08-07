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
            await mongooseConnect();
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
        } else if (req.body.type === "SPECIFIC") {
            await mongooseConnect();
            const {father, mother, children} = req.body.data

            let fatherData;
            let motherData;
            const childrenData = [];

            if (father.length > 0) {
                fatherData = await Members.findOne({_id: father})
            } else {
                fatherData = ""
            }

            if (mother.length > 0) {
                motherData = await Members.findOne({_id: mother})
            } else {
                motherData = ""
            }
            
            if (children.length > 0) {
                for (let i = 0; i < children.length; i++) {
                    childrenData.push(await Members.findOne({_id: children[i]}))
                }
            }

            return res.status(200).json({message: "successfully searched", data: {
                father: fatherData,
                mother: motherData,
                children: childrenData,
            }})
        } else if (req.body.type === "PUT") {
            await mongooseConnect();
            
            const {inputs, _id} = req.body.body;

            const memberData = await Members.findOne({_id: _id});

            if (memberData) {
                const response = await Members.findOneAndUpdate({_id: _id}, {
                    fullname: inputs.fullname,
                    gender: inputs.gender,
                    birthdate: inputs.birthdate,
                    deathdate: inputs.deathdate,
                    bornin: inputs.bornin,
                    diedin: inputs.diedin,
                    father: inputs.father,
                    mother: inputs.mother,
                    extrainfo: inputs.extrainfo,
                    children: inputs.children,
                    imageIds: inputs.imageIds
                });
                if (response) {
                    return res.status(200).json({message: "update successful"})
                } else {
                    return res.status(500).json({error: "update unsuccessful"})
                }
            } else {
                return res.status(404).json({error: "could not find member"})
            }
        } else {
            return res.status(405).json({error: "type is invalid"})
        }

    } else {
        res.status(405).json({message: "invalid method"})
    }
}