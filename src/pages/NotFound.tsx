
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="rounded-full bg-vault-purple/10 p-4 mb-6">
        <AlertTriangle className="h-12 w-12 text-vault-purple" />
      </div>
      
      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
      <p className="text-muted-foreground mb-6 text-center">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link
        to="/dashboard"
        className="py-2 px-4 bg-vault-purple hover:bg-vault-purple-light text-white rounded-lg transition-all"
      >
        Return to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
