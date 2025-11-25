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
            className="flex flex-col  items-start px-0 py-[1px] shadow-[0px_6px_10px_0px_rgba(30,48,42,0.02)] shrink-0"
          >
            <div className="flex gap-[12px] items-center shrink-0">
              <p className="text-h4 shrink-0 text-[var(--color-black-8)] whitespace-nowrap">
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
                    <TrendDownIcon className="size-[20px]" />
                  )}
                </div>
                <p
                  className="leading-[1.35] shrink-0 text-[13px] whitespace-nowrap tracking-[-0.56px] text-[var(--color-text-gray)]"
                >
                  {metric.change}
                </p>
              </div>
            </div>
            <div className="flex gap-[4px] items-center shrink-0">
              <p className="text-b4-med shrink-0 text-[var(--color-black-5)] whitespace-nowrap">
                {metric.label}
              </p>
            </div>
          </div>
          {index < metrics.length - 1 && (
            <div
              className="h-[32px] shrink-0 w-[1px] border-l border-[var(--color-border-divider)]"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default Metrics;

