import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './utils/getCurrentUser';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

  // Define allowed paths by role
  const allowedPathsByRole: {
    user: string[];
    agent: string[];
    admin: string[];
  } = {
    user: [
      '/profile',
      '/my-properties',
      '/favorite-properties',
      '/user-dashboard',
    ],
    agent: [
      '/profile',
      '/agent-dashboard',
      '/my-properties',
      '/favorite-properties',
      '/agent-dashboard/properties-sold',
    ],
    admin: [
      '/profile',
      '/admin-dashboard',
      '/admin-dashboard/all-properties',
      '/admin-dashboard/all-products',
      '/admin-dashboard/all-users',
      '/admin-dashboard/all-orders',
      '/admin-dashboard/add-product',
    ],
  };

  // Redirect unauthenticated users to signup or login
  if (!user) {
    if (!['/signup', '/login'].includes(pathname)) {
      return NextResponse.redirect(new URL('/signup', request.url));
    }
    return NextResponse.next();
  }

  const role = user.role as keyof typeof allowedPathsByRole;

  // If the role is invalid or the path is not allowed for the user's role, redirect to home
  const allowedPaths = allowedPathsByRole[role] || [];
  const isAdminOrAgentPath =
    pathname.startsWith('/admin-dashboard') ||
    pathname.startsWith('/agent-dashboard');

  if (
    !allowedPaths.includes(pathname) ||
    (isAdminOrAgentPath && role === 'user')
  ) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile',
    '/signup',
    '/login',
    '/user-dashboard',
    '/my-properties',
    '/favorite-properties',
    '/agent-dashboard/:path*',
    '/admin-dashboard/:path*',
  ],
};
