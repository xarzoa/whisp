import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";

export default async function Middleware(req) {
  const url = req.nextUrl;
  const res = await updateSession(req);
  const user = res.data.user;
  if (url.pathname.startsWith("/auth") && user) {
    url.pathname = "/chats";
    return NextResponse.redirect(url, req.url);
  }
  if (url.pathname.startsWith("/profile") && !user) {
    url.pathname = "/auth";
    return NextResponse.redirect(url, req.url);
  }
  if (url.pathname.startsWith("/chat") && !user) {
    url.pathname = "/auth";
    return NextResponse.redirect(url, req.url);
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
