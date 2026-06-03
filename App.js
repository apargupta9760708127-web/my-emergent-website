import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CubeGallery } from "@/components/CubeGallery";
import { PatternsSection } from "@/components/PatternsSection";
import { FlagsSection } from "@/components/FlagsSection";
import { TutorialsSection } from "@/components/TutorialsSection";
import { Footer } from "@/components/Footer";
import { CubeDetail } from "@/components/CubeDetail";
import { Toaster } from "@/components/ui/sonner";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <CubeGallery />
      <PatternsSection />
      <FlagsSection />
      <TutorialsSection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cube/:id" element={<CubeDetail />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
