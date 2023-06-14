import multiparty from 'multiparty'
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import fs from 'fs'
import mime from 'mime-types'
import { alphabet } from '@/lib/samples'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req:NextApiRequest, res:NextApiResponse) {
    const form = new multiparty.Form();
    const bucket:string = "treftravelvlog"

    const {fields, files}:any = await new Promise((resolve, reject) => {
        form.parse(req, async (err:any, fields:any, files:any) => {
            if (err) reject(err);
            resolve({fields, files})
        })
    })

    if (process.env.S3_ACCESS_KEY != undefined && process.env.S3_SECRET_ACCESS_KEY != undefined) {
        const client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
            }
        });
    
        const links = [];
        for (const file of files.file) {
            const id = await new Promise(resolve => {
                let response = ""
                
                for (let i = 0; i < 15; i++) {
                    response = `${response}${alphabet[Math.floor(Math.random() * alphabet.length - 1)]}`
                }
        
                resolve(response)
            })
            const ext = file.originalFilename.split('.').pop();
            const newFilename = `avatars/${id}.${ext}`;
            await client.send(new PutObjectCommand({
                Bucket: bucket,
                Key: newFilename,
                Body: fs.readFileSync(file.path),
                ContentType: mime.lookup(file.path) || "",
            }))        
            const link = `https://${bucket}.s3.amazonaws.com/${newFilename}`
            links.push(link)
        }
        
        return res.status(200).json({message:"success", data:{content:[...links]}})
    }
}

export const config = {
    api: {bodyParser: false}
}