import multiparty from 'multiparty'
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import fs from 'fs'
import mime from 'mime-types'
import alphabet from '@/lib/alphabet'

export default async function handle(req,res) {
    const form = new multiparty.Form();
    const bucket = "fmpage"

    const {fields, files} = await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files})
        })
    })

    const client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    });

    const folderID = await new Promise(resolve => {
        let response = ""
        
        for (let i = 0; i < 6; i++) {
            response = `${response}${alphabet[Math.floor(Math.random() * alphabet.length - 1)]}`
        }

        resolve(response)
    })

    const links = [];
    for (const file of files.file) {
        const id = await new Promise(resolve => {
            let response = ""
            
            for (let i = 0; i < 6; i++) {
                response = `${response}${alphabet[Math.floor(Math.random() * alphabet.length - 1)]}`
            }
    
            resolve(response)
        })
        const ext = file.originalFilename.split('.').pop();
        const newFilename = `${folderID}/${id}-${Date.now()}.${ext}`;
        await client.send(new PutObjectCommand({
            Bucket: bucket,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ContentType: mime.lookup(file.path),
        }))        
        const link = `https://${bucket}.s3.amazonaws.com/${newFilename}`
        links.push(link)
    }

    return res.status(200).json({message:"success", data:{folderId: folderID, content:[...links]}})
}

export const config = {
    api: {bodyParser: false}
}