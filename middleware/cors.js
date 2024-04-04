// import cors from 'cors'

// const ACCEPTED_ORIGINS = [
//   'http://localhost:8080',
//   'http://localhost:3000',
//   'https://movies.com',
//   'https://midu.dev',
//   'https://ecoplace.3.us-1.fl0.io',
//   'http://localhost:4321'
// ]

// export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
//   origin: (origin, callback) => {
//     if (acceptedOrigins.includes(origin)) {
//       return callback(null, true)
//     }

//     if (!origin) {
//       return callback(null, true)
//     }

//     return callback(new Error('Not allowed by CORS'))
//   },
//   credentials: true,
//   // Métodos HTTP permitidos
//   methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
//   // Cabeceras permitidas en las solicitudes
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
//   // Cabeceras expuestas en las respuestas al cliente
//   exposedHeaders: ['X-Auth-Token', 'Content-Type', 'Accept'],
//   // Configura el tiempo (en segundos) que el resultado de una solicitud preflight puede ser caché
//   maxAge: 86400, // 24 horas
// })