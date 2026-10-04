import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppLoader from "./components/AppLoader";
import CustomCursor from "./components/CustomCursor";
import GradientMeshBg from "./components/GradientMeshBg";

import { useEffect } from "react";
import HomePremium from "./pages/HomePremium";
import About from "./pages/About";
import Messages from "./pages/Messages";
import Competitions from "./pages/Competitions";
import Doorknobs from "./pages/Doorknobs";
import Gallery from "./pages/Gallery";
import Francomania from "./pages/Francomania";

// Apple-like smooth cubic-bezier easing
const APPLE_EASE = [0.25, 1, 0.5, 1] as const;

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.35, 
          ease: APPLE_EASE 
        }}
        className="min-h-screen flex flex-col"
      >
        <Suspense fallback={<div className="min-h-screen" />}>
          <Switch>
            <Route path={"/"} component={HomePremium} />
            <Route path="/about" component={About} />
            <Route path="/messages" component={Messages} />
            <Route path="/competitions" component={Competitions} />
            <Route path="/doorknobs" component={Doorknobs} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/francomania" component={Francomania} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <AppLoader />
          <CustomCursor />
          <GradientMeshBg />
          <ScrollToTop />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
