import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Topics from "./pages/Topics";
import Vocabulary from "./pages/Vocabulary";
import FlashCards from "./pages/Games/FlashCards";
import GuessWord from "./pages/Games/GuessWord";
import UnscrambleSentence from "./pages/Games/UnscrambleSentence";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/topics" element={<Categories />} />
              <Route path="/topics/:categoryId" element={<Topics />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/games/flashcards/:categoryId" element={<FlashCards />} />
              <Route path="/games/guess-word/:categoryId" element={<GuessWord />} />
              <Route path="/games/unscramble/:categoryId" element={<UnscrambleSentence />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
