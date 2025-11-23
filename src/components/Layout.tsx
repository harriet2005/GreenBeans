import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const isLandingPage = location.pathname === "/" || location.pathname === "/auth";

  if (isLandingPage) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <NavLink to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">GreenBeans</span>
            </NavLink>
            {!user && location.pathname === "/" && (
              <NavLink to="/auth">
                <Button>Sign In</Button>
              </NavLink>
            )}
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4">
            <SidebarTrigger />
            <div className="flex items-center gap-2 flex-1">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">GreenBeans</span>
            </div>
            {user && (
              <Button variant="outline" onClick={signOut}>
                Logout
              </Button>
            )}
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
