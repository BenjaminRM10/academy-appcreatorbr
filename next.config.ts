import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimización de imágenes - Next.js las convertirá automáticamente a WebP/AVIF
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 año de cache
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Habilitar compresión gzip/brotli
  compress: true,

  // Desactivar source maps en producción para reducir tamaño
  productionBrowserSourceMaps: false,

  // Optimización de paquetes
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
