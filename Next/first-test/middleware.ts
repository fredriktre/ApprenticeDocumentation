import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "./lib/auth/session";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);

  // do anything with session here:
  const { user } = session;

  console.log("from middleware", { user });
  
  if (user !== undefined) {
    if (!user.admin) {
      return NextResponse.redirect(new URL('/posts', req.url));
    }
  } else {
    return NextResponse.redirect(new URL('/posts', req.url));
  }

  return res;
};

export const config = {
  matcher: "/posts/admin/:path*",
};