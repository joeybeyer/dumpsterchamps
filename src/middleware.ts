import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/navigation';

export default createMiddleware(routing);

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
