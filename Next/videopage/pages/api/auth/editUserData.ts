import { User } from "@/models/User";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import crypt from 'bcryptjs'

const handle:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {

    const { method } = req

    if (method === "POST") {

        const { type } = req.body

        if (type === "HELPCHANGE") {
            const { email, password } = req.body
            console.log(password)
            const userData = await User.findOne({email: email});
            if (userData) {
                const newHash = await crypt.hash(password, 10)
                const response = await User.findOneAndUpdate({email: email}, {passcode:newHash})

                return res.status(200).json({message: "Successfully updated password", hash: newHash})
            } else {
                return res.status(404).json({error: "User not found"})
            }

        } else if (type === "CHANGE") {
            const { email, username, password, newpassword, id } = req.body

            if (id.length > 0) {
                const userData = await User.findOne({_id: id});
                
                const datatochange = {
                    email: userData.email,
                    username: userData.username,
                    passcode: userData.passcode,
                }

                if (userData) {
                    const checkPass = await crypt.compare(password, userData.passcode);
                    if (checkPass) {
                        if (email != userData.email) {
                            datatochange.email = email
                        }
    
                        if (username != userData.username) {
                            datatochange.username = username
                        }
                        
                        if (newpassword.length != 0) {
                            const hashed = await crypt.compare(newpassword, userData.passcode)
                            if (!hashed) {
                                datatochange.passcode = await crypt.hash(password, 10);
                            } 
                        }
    
                        const response = await User.findOneAndUpdate({ _id: id, }, datatochange)
                        
                        return res.status(200).json({message: "successful info change!"})
                    } else {
                        return res.status(400).json({error: "Wrong password"})
                    }
                }
            }

        } else {
            return res.status(400).json({error: "Type invalid"})
        }

    } else {
        return res.status(405).json({error: "Method invalid"})
    }

}

export default handle