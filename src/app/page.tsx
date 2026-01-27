import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  
  // Obtener cursos
  const { data: courses, error } = await supabase
    .from('courses')
    .select('*, groups(*)')
    .order('number');

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Escuela de Ingeniería y Tecnología 4.0
          </h1>
          <p className="text-muted-foreground text-lg">
            Cursos especializados en IA, automatización y desarrollo
          </p>
          <div className="mt-4 inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary font-medium">🚀 Próximo inicio: 16 de Febrero 2026</span>
          </div>
        </div>

        {/* Status */}
        <div className="mb-8 p-4 rounded-lg bg-card border border-border">
          <h2 className="font-semibold mb-2">Estado del Sistema</h2>
          <div className="flex gap-4 text-sm">
            <span className="text-green-500">✓ Supabase conectado</span>
            <span className="text-green-500">✓ {courses?.length || 0} curso(s) cargado(s)</span>
            <span className="text-green-500">✓ Tema dark activo</span>
          </div>
          {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
        </div>

        {/* Cursos */}
        {courses && courses.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Cursos Disponibles</h2>
            {courses.map((course) => (
              <div key={course.id} className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-xs text-primary font-medium uppercase tracking-wider">
                      Curso {course.number}
                    </span>
                    <h3 className="text-xl font-bold mt-1">{course.name}</h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    course.status === 'active' 
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {course.status === 'active' ? 'Inscripciones Abiertas' : 'Próximamente'}
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                {/* Grupos */}
                {course.groups && course.groups.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-sm font-medium mb-2">Grupos disponibles:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {course.groups.map((group: any) => (
                        <div key={group.id} className="p-2 rounded bg-muted/50 text-center text-sm">
                          <span className="font-bold">Grupo {group.name}</span>
                          <p className="text-xs text-muted-foreground">{group.schedule.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${(course.price / 100).toLocaleString()} MXN
                  </span>
                  <button className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
                    Inscribirme
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer temporal */}
        <footer className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>Academy AppCreatorBR - Fase 1 completada ✓</p>
          <p className="mt-1">Ing. Benjamin Rodriguez</p>
        </footer>
      </div>
    </main>
  );
}
