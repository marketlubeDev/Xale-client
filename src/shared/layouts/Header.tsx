// Search Icon Component
function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="#697571"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L16.65 16.65"
        stroke="#697571"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Notification Icon Component
function NotificationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        stroke="#051912"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
        stroke="#051912"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Support Icon Component
function SupportIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
        stroke="#051912"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18Z"
        fill="#051912"
      />
      <path
        d="M12 14V13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10"
        stroke="#051912"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  return (
    <div className="bg-white border-b border-[#e6e8e7] relative w-full">
      <div className="flex gap-5 items-center justify-end pl-5 pr-10 py-4 relative w-full">
        {/* Search Bar */}
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

