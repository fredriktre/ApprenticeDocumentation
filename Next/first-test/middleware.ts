import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getIronSession } from "iron-session/edge"
import { sessionOptions } from "./lib/auth/session";

const middleware = async (req:NextRequest) => {

    const res = NextResponse.next();
    const session = await getIronSession(req, res, sessionOptions)

    const { user } = session;



}

export default middleware