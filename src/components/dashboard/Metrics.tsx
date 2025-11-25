import React from "react";
import { TrendUpIcon, TrendDownIcon } from "../../utilities/icons";

export interface Metric {
  value: string;
  change: string;
  label: string;
  isPositive: boolean;
}

export interface MetricsProps {
  metrics?: Metric[];
  className?: string;
}

const DEFAULT_METRICS: Metric[] = [
  {
    value: "2,480",
    change: "+8%",
    label: "Total Leads",
    isPositive: true,
  },
  {
    value: "182",
    change: "+12%",
    label: "New Leads (This Week)",
    isPositive: true,
  },
  {
    value: "18.4%",
    change: "-2.1%",
    label: "Avg. Conversion",
    isPositive: false,
  },
];

export function Metrics({
  metrics = DEFAULT_METRICS,
  className,
}: MetricsProps): React.ReactElement {
  return (
    <div
      className={`flex gap-[40px] items-center ${className || ""}`}
    >
      {metrics?.map((metric : Metric, index : number) => (
        <React.Fragment key={index}>
          <div
            className="flex flex-col gap-[10px] items-start px-0 py-[4px] shadow-[0px_6px_10px_0px_rgba(30,48,42,0.02)] shrink-0"
          >
            <div className="flex gap-[12px] items-center shrink-0">
              <p
                className="font-helvetica font-medium leading-[normal] shrink-0 text-[#374741] text-[24px] whitespace-nowrap tracking-[-0.72px]"
              >
                {metric.value}
              </p>
              <div
                className={`flex shrink-0 ${
                  index === 0 ? "items-end gap-[6px]" : index === 1 ? "items-center gap-[5px]" : "items-end gap-[6px]"
                }`}
              >
                <div className="shrink-0 size-[18px]">
                  {metric.isPositive ? (
                    <TrendUpIcon className="size-[20px]"/>
                  ) : (
                    <TrendDownIcon className="size-[20px]" color="#E63946" />
                  )}
                </div>
                <p
                  className="font-helvetica leading-[1.35] shrink-0 text-[13px] whitespace-nowrap tracking-[-0.56px] text-[#6F6F6F]"
                >
                  {metric.change}
                </p>
              </div>
            </div>
            <div className="flex gap-[4px] items-center shrink-0">
              <p
                className="font-helvetica font-medium leading-[normal] shrink-0 text-[#828c88] text-[14px] whitespace-nowrap tracking-[-0.42px]"
              >
                {metric.label}
              </p>
            </div>
          </div>
          {index < metrics.length - 1 && (
            <div
              className="h-[32px] shrink-0 w-[1px] border-l border-[#B4BAB8]"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Metrics;

