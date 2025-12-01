export interface HeadingGradientTextsProps {
  top: string;
  bottom: string;
  gradient?: string;
  style?: object;
  gradientClass?: string;
}

// 1. Add ": HeadingGradientTextsProps" after the destructured object
export default function HeadingGradientTextsGreen({
  top,
  bottom,
  gradient = "var(--gradient-text)",
  style = {},
  gradientClass = "",
}: HeadingGradientTextsProps) {
  return (
    <div className="text-center mb-10" style={style}>
      {/* 2. Fixed Tailwind syntax: use text-[var(...)] for arbitrary values */}
      <h2 className="text-h1-narrow font-medium text-var(--color-black-10) tracking-tight">
        {top}
      </h2>
      <h2
        className={`-mt-4 text-h1-narrow text-var(--color-black-10) bg-clip-text text-transparent text-nowrap ${gradientClass}`}
        style={{
          backgroundImage: gradient,
          animation: "bg-scale .5s ease forwards",
        }}
      >
        {bottom}
      </h2>
    </div>
  );
}
