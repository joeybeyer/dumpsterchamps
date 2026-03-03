import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/navigation';
import { NextRequest, NextResponse } from 'next/server';

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Lowercase redirect for city slug URLs — preserves link equity from
  // external sites linking to capitalized versions like /dumpster-rental-Costa-Mesa-CA
  const pathname = request.nextUrl.pathname;
  if (pathname !== pathname.toLowerCase() && pathname.startsWith('/dumpster-rental-')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }

  return handleI18n(request);
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - _next (Next.js internals)
  // - Static files (images, fonts, etc.)
  // - robots.txt, sitemap.xml, favicon.ico
  matcher: [
    '/((?!api|_next|_vercel|images|.*\\..*|robots\\.txt|sitemap\\.xml|sitemap-\\d+\\.xml|favicon\\.ico).*)',
  ],
};
