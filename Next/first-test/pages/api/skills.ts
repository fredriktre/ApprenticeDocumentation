import type { NextApiRequest, NextApiResponse } from 'next'
import { mongooseConnect } from '@/lib/db/mongoose';
import { Skill } from '@/models/Skill';
import { ObjectId } from 'mongodb';


export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const { method } = req;
    await mongooseConnect();
    
    if (method === "POST") {

        if (req.body.type === "POST") {
            const {category, name, confidence} = req.body
            if (category) {
                if (name) {
                    if (confidence) {
                        const response = await Skill.create({
                            category,
                            name, 
                            confidence
                        })
                        res.status(200).json({
                            message: "Successfully created a licence.",
                            body: {
                                category: response.category,
                                name: response.name,
                                confidence: response.confidence,
                                _id: response._id
                            }
                        })
                    } else {
                        res.status(400).json({error: "need confidence number"})
                    }
                } else {
                    res.status(400).json({error: "need name"})
                }
            } else {
                res.status(400).json({error: "need category"})
            }                        
        } else if (req.body.type === "PUT") {
            const {category, name, confidence, _id} = req.body
            const id = new ObjectId(_id)
            const data = await Skill.findOne({_id: id})
            if (data) {
                try {
                    const response = await Skill.updateOne({_id: id}, {
                        category,
                        name, 
                        confidence
                    })

                    res.status(200).json({
                        comment: "Successfully changed Skill",
                        body: {
                            category: category,
                            name: name,
                            confidence: confidence,
                            _id: _id
                        },
                    })
                } catch (error) {
                    res.status(500).json({
                        comment: "Something went wrong",
                    })
                }
            }
        }

    } else if (method === "GET") {
        try {
            const resdata = await Skill.find()
            res.status(200).json({
                comment: "Successfully got Skill",
                body: resdata
            })
        } catch (error) {
            res.status(500).json({
                comment: "Something went wrong",
            })
        }
    } else {
        res.status(405).json({error: "method not allowed, use POST"})
    }

0}