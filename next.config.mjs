/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    // Secreto para la firma de los jwonwebtokens (modo desarrollo)
    "SECRET": "aGVsbG8gd29ybGQ=",
    "WS_URL": "ws://localhost:3000/ws"
  }
};

export default nextConfig;
