import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from '@/lib/auth/session'
import { mongooseConnect } from '@/lib/db/mongoose';
import { User } from '@/models/User';
import crypt from 'bcryptjs'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req:NextApiRequest, res:NextApiResponse) {
    await mongooseConnect();
    
    const { method } = req

    if (method === "POST") {
        const {email, password} = req.body
        if (req.query.action === "register") {
            
            const checkMail = await User.findOne({email});

            if (!checkMail.email) {

                const hashed = await crypt.hash(password, 10);

                const data = {
                    email,
                    fullName: req.body.fullName,
                    passcode: hashed
                }

                await User.create(data).then((response:any) =>{

                    console.log(response.status)

                }).catch((error:any) => {
                    
                    return res.status(500).json({error: "Something went wrong during registering", details: error})

                })
            }
        }

        const Userinfo = await User.findOne({email})

        if (Userinfo) {
            const checkPass = await crypt.compare(password, Userinfo.passcode);

            if (checkPass) {
                let adminCheck = false;

                if (Userinfo.securityLevel === "admin"){
                    adminCheck = true
                }

                req.session.user = {
                    id: Userinfo._id,
                    data: {
                        email: Userinfo.email,
                        fullName: Userinfo.fullName,
                    },
                    admin: adminCheck
                }
                await req.session.save();

                if (req.query.action === "register") {
                    res.status(200).json({
                        message: "Registering and Login successfull",
                        details: "Registering has been successfull, and we logged you in while at it, which also went great!",
                    })
                } else {
                    res.status(200).json({
                        message: "Login successfull",
                        details: "The login has been successful!",
                    })
                }

            } else {
                return res.status(400).json(
                    {
                        error: "Wrong password", 
                        details: "The password you tried to use was not the correct one for this user. Try another one."
                    })
            }
        
        } else {
            return res.status(404).json({error: "User not found", details: "The user you tried to log into was not found."})
        }


    } else {
        res.status(405).json({
            error: "Method not allowed",
            details: `The method ${method} is not allowed, use "POST" instead.`
        })
    }

}