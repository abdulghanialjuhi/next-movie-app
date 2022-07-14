const dev = process.env.NODE_ENV !== 'production'

export const nextApi = dev ? 'http://localhost:3000' : 'https://next-movie-iz91wfaaq-abdulghanialjuhi.vercel.app'

export const server = dev ? 'http://127.0.0.1:5000' : 'https://next-movie-5kpanjoqg-abdulghanialjuhi.vercel.app'