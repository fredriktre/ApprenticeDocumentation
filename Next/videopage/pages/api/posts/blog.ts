import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const handler:NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const {method} = req

    if (method === "POST") {

    } else {
        return res.status(405).json({error: "Method invalid"})
    }

}

export default handler