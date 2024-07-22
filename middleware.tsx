import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAccessCookieValid } from './app/_auth/auth_utils';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  let id_cookie = request.cookies.get('id_token');
  let access_cookie = request.cookies.get('access_token');

  if (request.nextUrl.pathname.startsWith('/home') ) return;
  if (request.nextUrl.pathname.startsWith('/login') ) return;

  // Decode access_cookie jwt and check if expired.
  if (!access_cookie || !isAccessCookieValid(access_cookie.value)) {
    console.warn('Access cookie expired or invalid');
    console.warn( 'Access cookie: ' + access_cookie?.value);
    console.warn( 'Requested URL: ' + request.nextUrl.pathname);
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next();
}


// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!.*(?:\.jpg|\.png|\.js|\.json|\.css|\.woff2|\.ttf)$)(?!\/(?:home|login|about)).*$)',
}