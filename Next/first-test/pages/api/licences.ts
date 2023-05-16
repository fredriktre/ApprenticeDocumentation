import type { NextApiRequest, NextApiResponse } from 'next'
import { mongooseConnect } from '@/lib/db/mongoose';
import { Licences } from '@/models/Licences';
import { ObjectId } from 'mongodb';


export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const { method } = req;
    await mongooseConnect();
    
    if (method === "POST") {

        if (req.body.type === "POST") {
            const {title, forsystem, time} = req.body
            if (title) {
                if (forsystem) {
                    if (time) {
                        const response = await Licences.create({
                            title: title,
                            forsystem: forsystem,
                            time: time,
                        })
                        res.status(200).json({
                            message: "Successfully created a licence.",
                            body: {
                                _id: response._id,
                                title: response.title,
                                forsystem: response.forsystem,
                                time: response.time
                            }
                        })
                    } else {
                        res.status(400).json({
                            comment: "You need a time",
                        })
                    }
                } else {
                    res.status(400).json({
                        comment: "You need a name for what the licence is for, or who gave it to you.",
                    })
                }
            } else {
                res.status(400).json({
                    comment: "You need a title",
                })
            }
        } else if (req.body.type === "PUT") {
            const {title, forsystem, time, _id} = req.body
            const id = new ObjectId(_id)
            const data = await Licences.findOne({_id: id})
            if (data) {
                try {
                    const response = await Licences.updateOne({_id: id}, {
                        title: title,
                        forsystem: forsystem,
                        time: time
                    })
                    res.status(200).json({
                        comment: "Successfully changed Licence",
                        body: {
                            title,
                            forsystem,
                            time,
                            _id
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
            const resdata = await Licences.find()
            res.status(200).json({
                comment: "Successfully got Licences",
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