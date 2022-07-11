const dev = process.env.NODE_ENV !== 'production'

export const nextApi = dev ? 'http://localhost:3000' : 'www.web.com'

export const server = dev ? 'http://127.0.0.1:5000' : 'www.web.com'