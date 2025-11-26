import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import type { ReactNode } from 'react';
import { DropDownHamburgerIcon, SearchIcon, NotificationIcon, SupportIcon } from '../../utilities/icons';
import XaleLogoImage from '../../assets/sidebar/xaleLogo.svg';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-[var(--color-background-10)] overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--color-black-8)]/50 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block w-[250px] border-r border-[var(--color-border-primary)] bg-[var(--color-background-10)] flex-shrink-0">
        <Sidebar showHeader={true} />
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-screen w-[280px] bg-white border-r border-[#e6e8e7]
          transform transition-transform duration-300 ease-in-out
          lg:hidden
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Mobile Sidebar Header with Header Content */}
        <div className="flex flex-col h-full">
          {/* User Profile Section */}
          <div className="border-b border-[#e6e8e7] flex gap-2 items-center px-4 py-4 relative w-full">
            <div className="flex gap-2 items-center relative flex-1">
              <div className="relative shrink-0 w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[var(--color-black-10)] to-[var(--color-black-8)] flex items-center justify-center">
                <img src={XaleLogoImage} alt="Xale Logo" className="w-[40px] h-[40px]" />
              </div>
              <div className="flex flex-col gap-1 items-start justify-center relative shrink-0">
                <div className="flex items-center justify-between not-italic relative shrink-0">
                  <div className="flex flex-col h-6 justify-end leading-none relative shrink-0 text-[var(--color-black-8)] text-lg tracking-[-0.72px] w-[21px]">
                    <p className="leading-normal">Hi,</p>
                  </div>
                  <p className="font-medium leading-normal relative shrink-0 text-lg whitespace-nowrap tracking-[-0.8px] text-[var(--color-black-8)]">
                    Sarah Johnson
                  </p>
                </div>
                <div className="flex items-center justify-between relative shrink-0">
                  <div className="flex flex-col justify-end leading-[1.35] not-italic relative shrink-0 text-[#505e59] text-sm whitespace-nowrap tracking-[-0.56px]">
                    <p className="leading-[1.35] whitespace-pre">Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Header Actions in Mobile Sidebar */}
          <div className="border-b border-[#e6e8e7] px-4 py-3">
            <div className="flex gap-3 items-center justify-between">
              <button className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <SearchIcon size={20} />
              </button>
              <button className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <NotificationIcon size={20} />
              </button>
              <button className="flex items-center justify-center p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <SupportIcon size={20} />
              </button>
              <div className="bg-[rgba(38,115,85,0.1)] rounded-full w-10 h-10 flex items-center justify-center">
                <p className="font-normal text-[#051912] text-base tracking-[-0.36px]">
                  SJ
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <Sidebar showHeader={false} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Mobile Top Bar */}
        <div className="lg:hidden flex-shrink-0 bg-[var(--color-background-10)] border-b border-[var(--color-border-primary)] px-4 py-3">
          <div className="flex items-center gap-3">
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              aria-label="Toggle menu"
            >
              <DropDownHamburgerIcon size={24} />
            </button>

            {/* Logo */}
            <div className="relative shrink-0 w-[32px] h-[32px] rounded-full bg-gradient-to-br from-[var(--color-black-10)] to-[var(--color-black-8)] flex items-center justify-center">
              <img src={XaleLogoImage} alt="Xale Logo" className="w-[32px] h-[32px]" />
            </div>

            {/* User Info */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <p className="text-sm text-[var(--color-black-8)] tracking-[-0.28px]">Hi,</p>
              <p className="font-medium text-sm text-[var(--color-black-8)] tracking-[-0.28px] truncate">
                Sarah Johnson
              </p>
            </div>

            {/* User Avatar */}
            <div className="bg-[rgba(38,115,85,0.1)] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
              <p className="font-normal text-[#051912] text-sm tracking-[-0.36px]">
                SJ
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden lg:block flex-shrink-0">
          <Header />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-[#eef3f1]">
          {children}
        </main>
      </div>
    </div>
  );
}
