import { useState } from 'react';
import XaleLogoImage from '../../assets/sidebar/xaleLogo.svg';
import { ApplicationIcon, DashboardIcon, LeadsIcon, RotateArrowIcon, StageManagementIcon, VisaIcon } from '../../utilities/icons';
import { Dropdown } from '../../components/common/Dropdowns/Dropdown';
import SideBarItem from '../../components/sidebar/SideBarItem';



export default function Sidebar() {
  const [isStagesOpen, setIsStagesOpen] = useState<boolean>(true);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(true);

  return (
    <div className="flex flex-col h-screen w-full border-r border-[#e6e8e7]">
      {/* Header Section - User Profile */}
      <div className="border-b border-[#e6e8e7] flex gap-2 items-center px-8 py-4 relative w-full">
        <div className="flex gap-2 items-center relative shrink-0">
        <div className="relative shrink-0 w-[40px] h-[40px] rounded-full bg-gradient-to-br from-[#051912] to-[#0a2e24] flex items-center justify-center">
        <img src={XaleLogoImage} alt="Xale Logo" className="w-[40px] h-[40px]" />
        </div>
          <div className="flex flex-col gap-1 items-start justify-center relative shrink-0">
            <div className="flex items-center justify-between not-italic relative shrink-0 te">
              <div className="flex flex-col h-6 justify-end leading-none relative shrink-0 text-[#051912] text-lg tracking-[-0.72px] w-[21px]">
                <p className="leading-normal">Hi,</p>
              </div>
              <p className="font-medium leading-normal relative shrink-0 text-lg whitespace-nowrap tracking-[-0.8px] text-[#051912]">
                Sarah Johnson
              </p>
            </div>
            <div className="flex items-center justify-between relative shrink-0 w-[152px]">
              <div className="flex flex-col justify-end leading-[1.35] not-italic relative shrink-0 text-[#505e59] text-sm whitespace-nowrap tracking-[-0.56px]">
                <p className="leading-[1.35] whitespace-pre">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="relative flex flex-col gap-1 items-start pb-0 pl-8 pr-4 pt-6 w-full flex-1 overflow-y-auto">
        {/* Active indicator bar */}
        <div className="absolute h-10 left-0.5 rounded-br-[20px] rounded-tr-[20px] top-[106px] w-2 bg-[#051912]" />
        
        {/* Dashboard Nav Item */}
        <SideBarItem text="Dashboard" icon={<DashboardIcon />} />


        {/* STAGES Section */}
        <div className="flex flex-col gap-1 items-start px-0 py-1 relative shrink-0 w-full">
          <div className="flex gap-2 items-center justify-center relative shrink-0 w-full">
            <p className="flex-1 font-medium leading-normal min-h-px min-w-px relative shrink-0 text-[#697571] text-xs tracking-[2.16px] uppercase">
              STAGES
            </p>
            <button
              onClick={() => setIsStagesOpen(!isStagesOpen)}
              className="flex items-center justify-center relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
            >
              <div className={`flex-none transition-transform duration-200 ${isStagesOpen ? 'rotate-180' : ''}`}>
                <RotateArrowIcon className="overflow-hidden relative w-6 h-6" />
              </div>
            </button>
          </div>

          {isStagesOpen && (
            <>
              {/* Leads - Active */}
              <div className="flex gap-2.5 h-11 items-center overflow-hidden px-3 py-2 rounded-xl shrink-0 w-full bg-[#f5f7f6]">
                <div className="flex gap-2 items-center justify-center p-0.5 relative shrink-0 w-5 h-5">
                  <LeadsIcon />
                </div>
                <p className="font-medium leading-normal relative shrink-0 text-base whitespace-nowrap tracking-[-0.32px] text-[#051912]">
                  Leads
                </p>
              </div>

              {/* Application */}
              <div className="flex gap-2.5 h-11 items-center overflow-hidden px-3 py-2 rounded-xl shrink-0 w-full">
                <div className="shrink-0 w-5 h-5">
                  <ApplicationIcon />
                </div>
                <p className="font-normal leading-normal relative shrink-0 text-[#505e59] text-base whitespace-nowrap tracking-[-0.32px]">
                  Application
                </p>
              </div>

              {/* Visa */}
              <div className="flex gap-2.5 h-11 items-center overflow-hidden px-3 py-2 rounded-xl shrink-0 w-full">
                <div className="shrink-0 w-5 h-5">
                  <VisaIcon />
                </div>
                <p className="font-normal leading-normal relative shrink-0 text-[#374741] text-base whitespace-nowrap tracking-[-0.32px]">
                  Visa
                </p>
              </div>
            </>
          )}
        </div>

        {/* ADMIN Section */}
        <div className="flex flex-col gap-1 items-start px-0 py-1 relative shrink-0 w-full">
          <div className="flex gap-2 items-center justify-center relative shrink-0 w-full">
            <p className="flex-1 font-medium leading-normal min-h-px min-w-px relative shrink-0 text-[#697571] text-xs tracking-[2.16px] uppercase">
              ADMIN
            </p>
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="flex items-center justify-center relative shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
            >
              <div className={`flex-none transition-transform duration-200 ${isAdminOpen ? 'rotate-180' : ''}`}>
                <RotateArrowIcon className="overflow-hidden relative w-6 h-6" />
              </div>
            </button>
          </div>

          {isAdminOpen && (
            <>
              {/* Stage management */}
             <SideBarItem text="Stage management" icon={<StageManagementIcon />} />  
            </>
          )}
        </div>

        <Dropdown />
      </div>
    </div>
  );
}

