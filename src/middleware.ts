import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCurrentUser } from './utils/getCurrentUser';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();

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
      '/my-properties',
      '/favorite-properties',
      '/agent-dashboard',
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

  if (!user) {
    if (!['/signup', '/login'].includes(pathname)) {
      return NextResponse.redirect(new URL('/signup', request.url));
    }
    return NextResponse.next();
  }

  const role = user.role as keyof typeof allowedPathsByRole; // Fix applied here
  const allowedPaths = allowedPathsByRole[role];

  if (!allowedPaths.includes(pathname)) {
    const response = NextResponse.redirect(new URL('/', request.url));
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/signup', '/login'],
};
