import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";
import { sessionOptions } from "./lib/auth/session";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  // do anything with session here:
  const path = req.nextUrl.pathname;
  const { user } = session;
  
  if (user !== undefined) {
    if (path.includes("admin")) {
      if (!user.admin) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  } else {
  }

  return res;
};

export const config = {
  matcher: "/:path*",
};