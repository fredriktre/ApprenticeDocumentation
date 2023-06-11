import {DeleteObjectCommand, ListObjectsCommand, S3Client} from '@aws-sdk/client-s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const bucket:string = "treftravelvlog"

    if (req.body.data) {
        if (process.env.S3_ACCESS_KEY != undefined && process.env.S3_SECRET_ACCESS_KEY != undefined) {
            const client = new S3Client({
                region: 'eu-north-1',
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
                }
            });

            for (let i = 0; i < req.body.data.length; i++) {
                const splitted = req.body.data[i].split("com/")

                const input = {
                    Bucket: bucket,
                    Key: `${splitted[1]}`,
                }
                
                const command = new DeleteObjectCommand(input);
                const response = await client.send(command)
            }
            return res.status(200).json({message:"successfully deleted"})
        }
    }
}