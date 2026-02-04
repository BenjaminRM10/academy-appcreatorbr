"use client"

export function VideoSection() {
    return (
        <section id="video-demo" className="py-12 md:py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                        Descubre el Poder de la <span className="text-cyan-400">Saltillo Academy</span>
                    </h2>
                    <p className="text-gray-400 text-sm md:text-base">
                        Mira cómo puedes transformar tu carrera y dominar las herramientas que están cambiando el mundo.
                    </p>
                </div>

                <div className="relative aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-cyan-500/10">
                    <iframe
                        src="https://drive.google.com/file/d/1d7cIZBhjOEuDeOOb3SY4kP6xdtf5yhn9/preview"
                        className="absolute inset-0 w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
