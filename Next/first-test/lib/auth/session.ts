import type { IronSessionOptions } from "iron-session";

type User = {
    id: string
    data: {
        email: string,
        fullName: string,
    }
    admin: boolean
}

export const sessionOptions:IronSessionOptions = {
    password: process.env.COOKIEPASS as string,
    cookieName: "fredfolio_user_cookie",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"
    }
}

declare module "iron-session" {
    interface IronSessionData {
        user?: User
    }
}