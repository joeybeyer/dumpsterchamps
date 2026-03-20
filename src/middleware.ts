import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/navigation';
import { NextRequest, NextResponse } from 'next/server';
import { cityRedirects } from './data/city-redirects';

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Lowercase redirect for ALL page URLs — preserves link equity from
  // external sites linking to capitalized versions
  const pathname = request.nextUrl.pathname;

  const redirectTo = cityRedirects[pathname] || cityRedirects[pathname.toLowerCase()];
  if (redirectTo) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTo;
    return NextResponse.redirect(url, 301);
  }

  if (pathname !== pathname.toLowerCase()) {
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
