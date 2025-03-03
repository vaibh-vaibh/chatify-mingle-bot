
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/50 px-6">
      <div className="text-center max-w-md animate-fade-in">
        <div className="w-20 h-20 mx-auto mb-6 bg-whatsapp/10 rounded-full flex items-center justify-center">
          <span className="text-4xl">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>
        <Button className="bg-whatsapp hover:bg-whatsapp-dark" asChild>
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
