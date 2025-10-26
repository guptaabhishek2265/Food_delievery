export const getCookieOptions = () => ({
    httpOnly: true,
    maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? "None" : "Strict"
})