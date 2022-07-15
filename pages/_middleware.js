import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req, res) {
  const { nextUrl: url, geo } = req;

  const country = geo.country || 'AE';
  const city = geo.city || 'Dubai';

  const cookie = JSON.stringify({
    country,
    city,
  });

  if (req.cookies['country']) {
    let mycookie = JSON.parse(req.cookies['country']);
    if (mycookie.country !== geo.country) {
      return NextResponse.next().cookie('country', cookie);
    } else {
      return NextResponse.next();
    }
  } else {
    return NextResponse.next().cookie('country', cookie);
  }
}
