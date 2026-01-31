import { NextRequest, NextResponse } from "next/server"
export function middleware(req: NextRequest) {
  if (!req.cookies.get("accessToken")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
}
