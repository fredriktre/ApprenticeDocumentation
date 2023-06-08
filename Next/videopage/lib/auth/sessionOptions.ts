import type { IronSessionOptions } from "iron-session";

export const sessionOptions:IronSessionOptions = {
    password: {
        1: "pzd35bw264220qp24p113bw28s1631334b119z1!",
        2: "4gx11jq6y4160z305f11k825ho33te36kt42u35l",
        3: "sf0334910wl13nr20x034sc16zn16r0242g17#!36e",
        4: "u7&11mj16jh32yq7pz2m34gk184h9vp24p2225",
        5: "pgd4r227uo4k627or13if5c233ho31pc282812g"
    },
    cookieName: "ttv_cookies",
    cookieOptions: {
        secure: process.env.NODE_ENV === "production" ? true : false
    }
}