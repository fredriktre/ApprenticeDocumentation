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
    password: {
        1: "&vk29sw251f5#o12v032pn9n029ox4eb7vc32oq0ek35ff7",
        2: "i#z186k8wh26rv37l015dx19ev23wp34nm14j#275m32ck25dl21",
        3: "kwj47t38h16iq3yg2z&161724hy26p423ku31bm32yd39f27",
        4: "i628zj50m3jb11wj27tl23q634#c30u&160j19!n20c&22tz31",
        5: "npn23zz34wq58b42#359431s0161!47f174v0un11c4368v35"
    },
    cookieName: "fredfolio_user_cookie",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    }
}

declare module "iron-session" {
    interface IronSessionData {
        user?: User
    }
}