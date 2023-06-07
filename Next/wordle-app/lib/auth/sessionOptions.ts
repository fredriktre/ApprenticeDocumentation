import type { IronSessionOptions } from "iron-session";

export const sessionOptions:IronSessionOptions = {
    password: {
        1: "!tw20sw31ls941329r199d303c1464227#36s",
        2: "!1i21de3ru21!318yl25s&16er23wi157i24x",
        3: "rkc26yt35rv10gm138o21k620e138o3yt130p",
        4: "sq66ix1#s29mk12mf23mq158i2th23q7311n3",
        5: "cxi4qo23#125b17i&30s212l512v731f!5xl7"
    },
    cookieName: "t_u_cookie",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    }
}