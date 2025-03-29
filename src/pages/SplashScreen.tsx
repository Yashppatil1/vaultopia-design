
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VaultLogo from "@/components/VaultLogo";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-vault-dark">
      <div className="animate-fade-in">
        <div className="flex justify-center">
          <VaultLogo animated />
        </div>
        <h1 className="text-3xl font-bold mt-4 text-center text-white animate-pulse-slow">
          Secure Vault
        </h1>
        <p className="text-muted-foreground text-center mt-2 animate-fade-in">
          Your personal secure storage
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
