
import Sidebar from './Sidebar';
import Header from './Header';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-[#eef3f1] overflow-hidden">
    
      <div className="w-[250px] border-r border-[#e6e8e7] bg-white flex-shrink-0">
        <Sidebar />
      </div>
      

      <div className="flex flex-col flex-1 overflow-hidden">

        <div className="flex-shrink-0">
          <Header />
        </div>

        <main className="flex-1 overflow-y-auto bg-[#eef3f1]">
          {children}
        </main>
      </div>
    </div>
  );
}

