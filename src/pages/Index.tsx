
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (loading) return;
    
    if (redirecting) return;
    
    setRedirecting(true);
    
    if (user) {
      // If authenticated, redirect to dashboard
      console.log("User is authenticated, redirecting to dashboard");
      navigate("/dashboard");
    } else {
      // If not authenticated, redirect to login
      console.log("User is not authenticated, redirecting to login");
      navigate("/login");
    }
  }, [navigate, user, loading, redirecting]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Loading...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your vault</p>
      </div>
    </div>
  );
};

export default Index;
