import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl;

    // 1. Handle singular to plural redirects for job routes (robust version)
    const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    if (normalizedPath.endsWith('-job') || normalizedPath === '/admin/job') {
        return NextResponse.redirect(new URL(normalizedPath + 's', request.url));
    }

    // 2. Protect /admin routes, but allow /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const session = request.cookies.get('admin_session');

        if (!session || session.value !== 'authenticated') {
            const loginUrl = new URL('/admin/login', request.url);
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images (public images)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
    ],
};
