
import { SearchIcon, NotificationIcon, SupportIcon } from "../../utilities/icons";

  

  
  export default function Header() {
    return (
      <div className="bg-white border-b border-[#e6e8e7] relative w-full">
        <div className="flex gap-5 items-center justify-end pl-5 pr-10 py-4 relative w-full">
   
          <div className="flex-1 flex flex-col gap-2 items-end justify-center min-h-px min-w-px relative shrink-0">
            <div className="border border-[#cdd1d0] h-[40px] relative rounded-xl shrink-0 w-full max-w-[451px]">
              <div className="flex gap-2 h-10 items-center overflow-hidden pl-4 pr-2 py-2 relative rounded-[inherit] w-full">
                <div className="flex gap-2 items-center justify-center p-[3px] relative shrink-0 w-6 h-6">
                  <SearchIcon />
                </div>
                <p className="flex-1 font-normal leading-normal min-h-px min-w-px relative shrink-0 text-[#697571] text-base tracking-[-0.32px]">
                  Quick search...
                </p>
                <div className="bg-[rgba(38,115,85,0.03)] border border-[#e6e8e7] relative rounded-lg shrink-0">
                  <div className="flex gap-1 items-center overflow-hidden px-1.5 py-1 relative rounded-[inherit]">
                    <p className="font-normal leading-normal relative shrink-0 text-sm text-[rgba(30,30,30,0.5)] whitespace-nowrap tracking-[-0.28px]">
                      ⌘K
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Right Side Icons */}
          <div className="flex gap-4 items-center justify-end relative shrink-0">
            {/* Notification Icon */}
            <button className="flex gap-2 items-center justify-center overflow-hidden px-4 py-2.5 relative rounded-xl shrink-0 w-11 hover:bg-gray-100 transition-colors">
              <div className="relative shrink-0 w-6 h-6">
                <NotificationIcon />
              </div>
            </button>
  
            {/* Support Icon */}
            <button className="flex gap-2 items-center justify-center overflow-hidden px-4 py-2.5 relative rounded-xl shrink-0 w-11 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col gap-2 items-center justify-center relative shrink-0 w-6 h-6">
                <SupportIcon />
              </div>
            </button>
  
            {/* User Avatar */}
            <div className="bg-[rgba(38,115,85,0.1)] relative rounded-full shrink-0 w-12 h-12 flex items-center justify-center">
              <p className="font-normal leading-6 not-italic text-[#051912] text-lg text-center tracking-[-0.36px]">
                SJ
              </p>
            </div>
          </div>

          
        </div>
      </div>
    );
  }
  
  