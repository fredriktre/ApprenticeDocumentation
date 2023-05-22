import { withIronSessionApiRoute } from "iron-session/next";
import {
    NextApiHandler,
} from "next"
// Not in github
import { sessionOptions } from "./sessionOptions";

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}

type User = {
    id: string
    data: {
        email: string,
        name: string,
    }
    admin: boolean
}

declare module "iron-session" {
    interface IronSessionData {
        user?: User
    }
}