import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getCurrentUser } from './utils/getCurrentUser';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser()

  if (user) {
    if (pathname === '/signup') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    // verify user role
    if (!pathname.includes(user.role)) {
      console.log('verify');
      const response = NextResponse.redirect(new URL('/', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response
    } else {
      return NextResponse.next()
    }
  } else {
    if (pathname !== '/signup') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/signup'],
}