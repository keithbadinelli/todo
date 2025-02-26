export const config = {
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT || '3001', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
}; 