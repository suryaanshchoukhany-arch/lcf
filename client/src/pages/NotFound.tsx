import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import { TiltedReflectiveCard } from "../components/TiltedReflectiveCard";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";

export default function NotFound() {
  const [, setLocation] = useLocation();

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#05070B] text-[#E8EDF7]">
      <Navigation />
      <div className="flex-1 flex items-center justify-center pt-24 pb-12">
        <TiltedReflectiveCard className="w-full max-w-md mx-4 !bg-[#09111F]/50 border-white/[0.04]">
          <div className="p-8 text-center flex flex-col items-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-[#2A5A9A]/10 blur-md" />
                <AlertCircle className="relative h-12 w-12 text-[#2A5A9A]" />
              </div>
            </div>

            <h1 className="text-5xl font-heading font-extrabold text-white mb-2 uppercase tracking-tighter">404</h1>

            <h2 className="text-base font-heading font-bold text-white mb-4 uppercase tracking-wider">
              Page Introuvable
            </h2>

            <p className="text-xs text-[#7A94AC] mb-8 leading-relaxed font-body">
              Désolé, la page que vous recherchez n'existe pas.
              <br />
              It may have been moved or deleted.
            </p>

            <Magnetic range={50} strength={0.35}>
              <button
                onClick={handleGoHome}
                className="btn-premium btn-sweep px-8 py-3.5 text-[9px] font-heading font-bold tracking-wider bg-[#2A5A9A] hover:bg-[#1E4A80] transition-colors inline-flex items-center gap-2 uppercase"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Go Home</span>
              </button>
            </Magnetic>
          </div>
        </TiltedReflectiveCard>
      </div>
      <Footer />
    </div>
  );
}
