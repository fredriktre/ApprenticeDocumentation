import {DeleteObjectCommand, ListObjectsCommand, S3Client} from '@aws-sdk/client-s3'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const bucket:string = "fmpage"

    if (req.body.data) {
        if (process.env.S3_ACCESS_KEY != undefined && process.env.S3_SECRET_ACCESS_KEY != undefined) {
            const client = new S3Client({
                region: 'eu-north-1',
                credentials: {
                    accessKeyId: process.env.S3_ACCESS_KEY,
                    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
                }
            });
            const folderId = req.body.data[0].split("com/")[1].split("/")[0]

            for (let i = 0; i < req.body.data.length; i++) {
                const splitted = req.body.data[i].split("com/")
                const ids = splitted[1].split("/")

                const input = {
                    Bucket: bucket,
                    Key: `${ids[0]}/${ids[1]}`,
                }
                
                const command = new DeleteObjectCommand(input);
                const response = await client.send(command)
            }
    
            const listInput = {
                Bucket: bucket,
                Prefix: `${folderId}/`,
            }
    
            const listCommand = new ListObjectsCommand(listInput)
            const listResponse = await client.send(listCommand)
    
            if (listResponse.Contents?.length) {
                if (listResponse.Contents.length < 0) {
                    return res.status(200).json({message:"successfully deleted and folder deleted"})
                } else {
                    return res.status(200).json({message:"successfully deleted"})
                }
            } else {
                return res.status(200).json({message:"successfully deleted"})
            }
    
        }
    }
}