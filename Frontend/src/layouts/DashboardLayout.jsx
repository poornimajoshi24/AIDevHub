import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { Sidebar } from '../components/sidebar/Sidebar';
import { Footer } from '../components/footer/Footer';
import { ModernBackground } from '../components/ui/ModernBackground';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative text-slate-100 bg-[#07090e] selection:bg-purple-500/30">
      <ModernBackground />
      <Navbar />
      <div className="flex flex-1 max-w-7xl w-full mx-auto relative z-10 pt-4 px-4 sm:px-6 lg:px-8 gap-6">
        <Sidebar />
        <main className="flex-1 min-w-0 pb-12">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
