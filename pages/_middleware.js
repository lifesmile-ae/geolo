import { NextRequest, NextResponse } from 'next/server';
import countries from '../utils/countries';

// run only on homepage
export const config = {
  matcher: '/',
};

export async function middleware(req, res) {
  const { nextUrl: url, geo } = req;
  let mycookie = JSON.parse(req.cookies['country']);

  if (mycookie.country !== geo.country) {
    const country = geo.country || 'AE';
    const city = geo.city || 'Dubai';

    const countryInfo = countries.find((x) => x.cca2 === country);
    const currencyCode = Object.keys(countryInfo.currencies)[0];
    const currency = countryInfo.currencies[currencyCode];
    const languages = Object.values(countryInfo.languages).join(', ');
    const cookie = JSON.stringify({
      country,
      city,
      currencyCode,
      currencySymbol: currency.symbol,
      languages,
      name: currency.name,
    });
    return NextResponse.next().cookie('country', cookie);
  }
  return NextResponse.next();
}
