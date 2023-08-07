import { mongooseConnect } from '@/lib/db/mongoose';
import { Members } from '@/models/Members';
import { Request } from '@/models/Request';
import { ObjectId } from 'bson';
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

            const { fullname, gender, birthdate, deathdate, bornin, diedin, father, mother,
             extrainfo, children, imageIds } = req.body.body;

            let fatherID;
            let motherID;
            const childrenIds:any[] = []

            if (father._id.length > 0) {
                fatherID = new ObjectId(father._id)
            } else {
                const fres = await Members.create({
                    fullname: father.fullname,
                    gender: father.gender,
                    birthdate: father.birthdate,
                    deathdate: father.deathdate,
                    bornin: father.bornin,
                    diedin: father.diedin,
                    father: father.father,
                    mother: father.mother,
                    extrainfo: father.extrainfo,
                    children: father.children,
                    imageIds: father.imageIds
                })
                fatherID = fres._id
            }

            if (mother._id.length > 0) {
                motherID = new ObjectId(mother._id)
            } else {
                const mres = await Members.create({
                    fullname: mother.fullname,
                    gender: mother.gender,
                    birthdate: mother.birthdate,
                    deathdate: mother.deathdate,
                    bornin: mother.bornin,
                    diedin: mother.diedin,
                    father: mother.father,
                    mother: mother.mother,
                    extrainfo: mother.extrainfo,
                    children: mother.children,
                    imageIds: mother.imageIds
                })
                motherID = mres._id
            }
            
            for (let i = 0; i < children.length; i++) {
                if (children[i]._id.length > 0) {
                    childrenIds.push(new ObjectId(children[i]._id))
                } else {
                    const cres = await Members.create({
                        fullname: children[i].fullname,
                        gender: children[i].gender,
                        birthdate: children[i].birthdate,
                        deathdate: children[i].deathdate,
                        bornin: children[i].bornin,
                        diedin: children[i].diedin,
                        father: children[i].father,
                        mother: children[i].mother,
                        extrainfo: children[i].extrainfo,
                        children: children[i].children,
                        imageIds: children[i].imageIds
                    })
                    childrenIds.push(cres._id)
                }
            }

            const res1 = await Members.create({ 
                fullname,
                gender,
                birthdate,
                deathdate ,
                bornin,
                diedin,
                father: fatherID,
                mother: motherID,
                extrainfo,
                children: childrenIds,
                imageIds
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