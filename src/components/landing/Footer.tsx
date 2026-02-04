import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 md:py-12 border-t border-white/10 bg-black">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
        <div className="text-center md:text-left">
          <p className="text-xs md:text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Academy AppCreatorBR. Todos los derechos reservados.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Saltillo, Coahuila, México.
          </p>
        </div>
        
        <div className="flex gap-4 md:gap-6 text-sm md:text-base">
          <Link href="https://x.com/BenjaminRdzM10" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyan-400 transition-colors">
            Twitter
          </Link>
          <Link href="https://www.linkedin.com/in/alejandro-benjamin-rodriguez-mares-20b871236/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-purple-400 transition-colors">
            LinkedIn
          </Link>
          <Link href="https://github.com/BenjaminRM10" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
