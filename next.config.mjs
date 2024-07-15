/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    // Secreto para la firma de los jwonwebtokens (modo desarrollo)
    "SECRET": "aGVsbG8gd29ybGQ=",
    "WS_URL": "ws://localhost:3000/ws",
    // Token de sesion de usuario admin (uso interno de la aplicacion, por ejemplo obtener informacion sobre un usuario por ID, el servidor websocket requirere autenticacion por token de sesion de administrador)
    "ADMIN_TOKEN": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOjF9.rOZUJsf4tJ9BrpRODd5ARwclRZpGTS16uRxhvgIwWdY"
  }
};

export default nextConfig;
