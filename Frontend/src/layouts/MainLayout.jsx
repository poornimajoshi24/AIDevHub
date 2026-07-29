import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';
import { ModernBackground } from '../components/ui/ModernBackground';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 bg-[#07090e] selection:bg-purple-500/30">
      <ModernBackground />
      <Navbar />
      <main className="flex-1 relative z-10 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
