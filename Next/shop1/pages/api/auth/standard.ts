import { mongooseConnect } from "@/lib/db/mongoose";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

const handle:NextApiHandler = async (req:NextApiRequest, res:NextApiResponse) => {
    const { method } = req;

    if ( method === "POST" ) {
        const { type } = req.body
        if ( type === "REGISTER" ){
            await mongooseConnect();

        }



    } else if ( method === "PUT" ) {
        await mongooseConnect();


    } else {
        res.status(405).json({error: "Invalid method"})
    }
}

export default handle;