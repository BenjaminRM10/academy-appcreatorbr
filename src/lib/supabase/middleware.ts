import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protected routes - require authentication
  if (
    pathname.startsWith('/student') || 
    pathname.startsWith('/admin')
  ) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Admin Protection: Double check that /admin is only for admins
  if (user && pathname.startsWith('/admin')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      
      if (profile?.role !== 'admin') {
          // If not admin, kick back to student dashboard (or home)
          return NextResponse.redirect(new URL('/student/dashboard', request.url))
      }
  }

  // Auth routes (redirect if already logged in)
  if (pathname === '/login') {
    if (user) {
      // Check if user has a profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .single()
      
      if (profile) {
        // ADMIN BYPASS
        if (profile.role === 'admin') {
            return NextResponse.redirect(new URL('/admin/dashboard', request.url))
        }

        // Check enrollment status
        const { data: enrollment } = await supabase
          .from('enrollments')
          .select('payment_status')
          .eq('user_id', user.id)
          .single()
        
        if (enrollment?.payment_status === 'pending') {
          return NextResponse.redirect(new URL('/pago', request.url))
        }
        return NextResponse.redirect(new URL('/student/dashboard', request.url))
      } else {
        return NextResponse.redirect(new URL('/registro', request.url))
      }
    }
  }

  // If user is logged in, handle various redirects
  if (user) {
    // Skip API routes, static assets, auth routes
    if (
      pathname.startsWith('/api') ||
      pathname.startsWith('/auth') ||
      pathname.startsWith('/_next') ||
      pathname === '/'
    ) {
      return response
    }

    // Check if user has a profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('id', user.id)
      .single()

    // No profile? Redirect to registration (unless already there)
    if (!profile && pathname !== '/registro') {
      return NextResponse.redirect(new URL('/registro', request.url))
    }

    // Has profile? Check enrollment and payment status
    if (profile) {
      // ADMIN BYPASS: If admin, allow access to /admin/* and skip payment checks
      if (profile.role === 'admin') {
        if (pathname.startsWith('/admin')) {
            return response
        }
        // Admin can still see student pages, but skipping forced redirect for now
        // if they are just navigating around.
      }

      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('payment_status, status')
        .eq('user_id', user.id)
        .single()

      // Pending payment - redirect to /pago (unless already there or on success/cancel pages)
      // EXCEPTION: Admins are not forced to pay
      if (
        enrollment?.payment_status === 'pending' &&
        !pathname.startsWith('/pago') &&
        pathname !== '/registro' &&
        profile.role !== 'admin' // <-- ADMIN EXCEPTION
      ) {
        return NextResponse.redirect(new URL('/pago', request.url))
      }

      // If trying to access /pago but already paid, redirect to dashboard
      if (
        pathname === '/pago' &&
        enrollment?.payment_status === 'paid'
      ) {
        return NextResponse.redirect(new URL('/student/dashboard', request.url))
      }

      // If trying to access /registro but already has profile and enrollment
      if (pathname === '/registro' && enrollment) {
        if (enrollment.payment_status === 'pending') {
          return NextResponse.redirect(new URL('/pago', request.url))
        } else {
          return NextResponse.redirect(new URL('/student/dashboard', request.url))
        }
      }
    }
  }

  return response
}
