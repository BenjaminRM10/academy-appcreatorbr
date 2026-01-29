import { StudentSidebar } from '@/components/student/StudentSidebar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { StudentNavbar } from '@/components/student/StudentNavbar'; // Keeping for mobile/header logic if needed, but likely replacing usage

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop Sidebar */}
      <StudentSidebar />

      {/* Main Content Area */}
      <div className="flex flex-col">
        {/* Mobile Header / Trigger */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-[280px]">
               {/* Mobile Sidebar Content - Reusing the navigation logic would be better extracted, 
                   but for now we can just mount the sidebar component inside or similar structure.
                   Since StudentSidebar has 'hidden md:block', we need a mobile version or 
                   adjust StudentSidebar to not be hidden if rendered here. 
                   
                   Let's create a specific mobile nav inside the sheet or update StudentSidebar to accept className.
               */}
               <div className="flex h-full flex-col gap-2">
                 <div className="flex h-14 items-center border-b px-6">
                    <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                        Academy
                    </span>
                 </div>
                 {/* Re-implementing links for mobile quickly to ensure it works without complex refactor */}
                 <nav className="grid gap-2 items-start px-4 text-sm font-medium">
                    <a href="/student/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary">Dashboard</a>
                    <a href="/student/clases" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary">Mis Clases</a>
                    <a href="/student/materiales" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary">Materiales</a>
                    <a href="/student/simuladores" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary">Simuladores</a>
                    <a href="/student/pagos" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary">Pagos</a>
                    <a href="/student/perfil" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary">Mi Perfil</a>
                 </nav>
               </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <span className="font-semibold">AppCreatorBR Academy</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
