import React from "react";
import { LocationIcon, MailIcon, PhoneIcon } from "../../utilities/icons";

type BadgeTone = "info" | "warning" | "pending" | "neutral";

export type LeadCard = {
  name: string;
  role: string;
  campaign: string;
  timestamp: string;
  stage: string;
  email: string;
  phone: string;
  city: string;
  avatarInitials: string;
  reviewerInitial: string;
  badges: Array<{ label: string; tone: BadgeTone }>;
  
};

export type LeadCardProps = {
  lead: LeadCard;
};

const STAGE_COLORS: Record<string, string> = {
  Visa: "#1B21E4",
  Leads: "#156548",
  Student: "#F08614",
  Default: "#1B21E4",
};

const BADGE_STYLES: Record<BadgeTone, string> = {
  info: "bg-[#dfe8ff] text-[#335cff]",
  warning: "bg-[#ffece0] text-[#ff8447]",
  pending: "bg-[#ede6ff] text-[#5940c3]",
  neutral: "bg-[#e8f0ec] text-[#1e302a]",
};



export function LeadCard({
  lead,
}: LeadCardProps): React.ReactElement {
  const {
    name,
    role,
    campaign,
    timestamp,
    stage,
    email,
    phone,
    city,
    avatarInitials,
    reviewerInitial,
    badges,
  } = lead;

  const stageColor = STAGE_COLORS[stage] ?? STAGE_COLORS.Default;

  return (
    <div className="rounded-[22px] border border-[#dfe7e3] bg-white px-5 py-4 shadow-[0px_12px_24px_rgba(10,24,19,0.07)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#3bd8ff] bg-[#e1e4ea] text-[14px] font-medium text-[#051912]">
            {avatarInitials}
          </div>
          <div>
            <p className="text-[14px] font-medium tracking-[-0.56px] text-[#051912]">
              {name}
            </p>
            <p className="text-[12px] tracking-[-0.24px] text-[#697571]">
              {role} • {campaign}
            </p>
          </div>
        </div>
        <div className="text-right text-[12px] tracking-[-0.24px] text-[#697571]">
          <p>{timestamp}</p>
          <p className="font-medium" style={{ color: stageColor }}>
            {stage}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] tracking-[-0.56px] text-[#1e302a]">
        <div className="flex items-center gap-2">
          <MailIcon />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <LocationIcon />
          <span>{city}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {badges.map((badge) => (
          <span
            key={`${name}-${badge.label}`}
            className={`rounded-full px-3 py-1 text-[12px] font-medium ${BADGE_STYLES[badge.tone]}`}
          >
            {badge?.label}
          </span>
        ))}
        <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#e0ddff] text-[12px] font-medium text-[#4b3ca5]">
          {reviewerInitial}
        </div>
      </div>
    </div>
  );
}







export default LeadCard;

