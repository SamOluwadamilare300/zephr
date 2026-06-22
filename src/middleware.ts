import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "zephyr_admin";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin") && !req.nextUrl.pathname.startsWith("/admin/login")) {
    const cookie = req.cookies.get(COOKIE_NAME)?.value;
    if (!cookie || cookie !== process.env.ADMIN_PASSWORD) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
