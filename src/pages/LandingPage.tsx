import { useState } from "react";
import { Link } from "react-router-dom";
import XaleFooter from "../components/XaleFooter";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between max-w-[1200px] mx-auto relative z-20">
      <Link to="/" className="flex items-center gap-2.5">
        <img
          src="/assets/Logo.png"
          alt="Xale"
          className="h-8 w-8 rounded-full"
        />
        <span
          className="text-xl font-semibold tracking-tight"
          style={{ color: "var(--color-black-10)" }}
        >
          Xale
        </span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8">
        <a
          href="#features"
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--color-black-7)" }}
        >
          Features
        </a>
        <a
          href="#how-it-works"
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--color-black-7)" }}
        >
          How it Works
        </a>
        <a
          href="#industries"
          className="text-sm font-medium transition-colors"
          style={{ color: "var(--color-black-7)" }}
        >
          Industries
        </a>
      </div>

      <div className="hidden md:flex items-center gap-3">
        <Link
          to="/login"
          className="px-5 py-2.5 text-sm font-medium rounded-xl transition-all"
          style={{
            color: "var(--color-black-10)",
            border: "1px solid var(--color-border-primary)",
          }}
        >
          Log in
        </Link>
        <Link
          to="/sign-up"
          className="px-5 py-2.5 text-sm font-medium text-white rounded-xl transition-all"
          style={{
            background:
              "radial-gradient(239.95% 185.59% at 63.38% -7.95%, #319B72 0%, #102F23 33.08%, #319B72 97.6%)",
            borderBottom: "0.9px solid #218760",
            borderRight: "0.5px solid #218760",
            borderLeft: "0.5px solid #218760",
          }}
        >
          Get Started Free
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span
          className="block w-5 h-0.5 rounded-full transition-transform"
          style={{
            backgroundColor: "var(--color-black-10)",
            transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
          }}
        />
        <span
          className="block w-5 h-0.5 rounded-full transition-opacity"
          style={{
            backgroundColor: "var(--color-black-10)",
            opacity: menuOpen ? 0 : 1,
          }}
        />
        <span
          className="block w-5 h-0.5 rounded-full transition-transform"
          style={{
            backgroundColor: "var(--color-black-10)",
            transform: menuOpen
              ? "rotate(-45deg) translate(3px, -3px)"
              : "none",
          }}
        />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col items-center gap-4 py-6 md:hidden z-30"
          style={{
            backgroundColor: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--color-border-primary)",
          }}
        >
          <a
            href="#features"
            className="text-sm font-medium"
            style={{ color: "var(--color-black-7)" }}
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium"
            style={{ color: "var(--color-black-7)" }}
            onClick={() => setMenuOpen(false)}
          >
            How it Works
          </a>
          <a
            href="#industries"
            className="text-sm font-medium"
            style={{ color: "var(--color-black-7)" }}
            onClick={() => setMenuOpen(false)}
          >
            Industries
          </a>
          <div className="flex gap-3 mt-2">
            <Link
              to="/login"
              className="px-5 py-2.5 text-sm font-medium rounded-xl"
              style={{
                color: "var(--color-black-10)",
                border: "1px solid var(--color-border-primary)",
              }}
            >
              Log in
            </Link>
            <Link
              to="/sign-up"
              className="px-5 py-2.5 text-sm font-medium text-white rounded-xl"
              style={{
                background:
                  "radial-gradient(239.95% 185.59% at 63.38% -7.95%, #319B72 0%, #102F23 33.08%, #319B72 97.6%)",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28 text-center relative">
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8"
        style={{
          backgroundColor: "var(--color-bg-success-light)",
          color: "var(--color-success)",
          border: "1px solid var(--color-border-green)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: "var(--color-success)" }}
        />
        Now available for all industries
      </div>

      {/* Heading */}
      <h1
        className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] mb-6"
        style={{ color: "var(--color-black-10)" }}
      >
        Your leads deserve
        <br />
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage: "var(--gradient-text)",
            animation: "bg-scale .6s ease forwards",
          }}
        >
          a smarter CRM.
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
        style={{ color: "var(--color-black-6)" }}
      >
        Xale helps teams capture, nurture, and convert leads with powerful
        automations, WhatsApp integration, and role-based access — all in one
        platform built for scale.
      </p>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/sign-up"
          className="px-8 py-3.5 text-base font-medium text-white rounded-xl transition-all hover:shadow-lg"
          style={{
            background:
              "radial-gradient(239.95% 185.59% at 63.38% -7.95%, #319B72 0%, #102F23 33.08%, #319B72 97.6%)",
            borderBottom: "0.9px solid #218760",
            borderRight: "0.5px solid #218760",
            borderLeft: "0.5px solid #218760",
            boxShadow: "0 1px 1px 0 rgba(5, 25, 18, 0.20)",
          }}
        >
          Start for Free
        </Link>
        <a
          href="#features"
          className="px-8 py-3.5 text-base font-medium rounded-xl transition-all"
          style={{
            color: "var(--color-black-10)",
            border: "1px solid var(--color-border-primary)",
            backgroundColor: "white",
          }}
        >
          See Features
        </a>
      </div>

      {/* Hero visual — gradient glow */}
      <div
        className="mt-16 md:mt-20 mx-auto rounded-2xl overflow-hidden relative"
        style={{
          maxWidth: "960px",
          aspectRatio: "16/9",
          background:
            "linear-gradient(135deg, var(--color-bg-secondary) 0%, white 40%, var(--color-bg-success-light) 100%)",
          border: "1px solid var(--color-border-primary)",
          boxShadow:
            "0 24px 48px -12px rgba(5, 25, 18, 0.08), 0 0 0 1px rgba(5, 25, 18, 0.03)",
        }}
      >
        {/* Dashboard mockup */}
        <div className="absolute inset-4 md:inset-6 flex flex-col gap-4">
          {/* Top bar */}
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#da2a46" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#ff8447" }}
            />
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: "#156548" }}
            />
            <div
              className="flex-1 h-6 rounded-md ml-4"
              style={{ backgroundColor: "var(--color-bg-input)" }}
            />
          </div>

          <div className="flex-1 flex gap-4">
            {/* Sidebar mock */}
            <div
              className="hidden md:flex flex-col gap-2 w-48 rounded-xl p-3"
              style={{ backgroundColor: "var(--color-bg-green)" }}
            >
              {[
                "Dashboard",
                "Leads",
                "WhatsApp",
                "Reports",
                "Automation",
              ].map((item) => (
                <div
                  key={item}
                  className="h-8 rounded-lg px-3 flex items-center text-xs font-medium"
                  style={{
                    backgroundColor:
                      item === "Leads" ? "white" : "transparent",
                    color:
                      item === "Leads"
                        ? "var(--color-success)"
                        : "var(--color-black-6)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Content area */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "New Leads", value: "284" },
                  { label: "Follow-ups", value: "52" },
                  { label: "Converted", value: "38" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl p-3 md:p-4"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid var(--color-border-primary)",
                    }}
                  >
                    <div
                      className="text-xs mb-1"
                      style={{ color: "var(--color-black-5)" }}
                    >
                      {stat.label}
                    </div>
                    <div
                      className="text-lg md:text-2xl font-semibold"
                      style={{ color: "var(--color-black-10)" }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Table mock */}
              <div
                className="flex-1 rounded-xl"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--color-border-primary)",
                }}
              >
                <div className="flex flex-col gap-0">
                  {[1, 2, 3, 4].map((row) => (
                    <div
                      key={row}
                      className="flex items-center gap-3 px-4 py-3"
                      style={{
                        borderBottom:
                          row < 4
                            ? "1px solid var(--color-border-primary)"
                            : "none",
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-full"
                        style={{ backgroundColor: "var(--color-bg-input)" }}
                      />
                      <div
                        className="flex-1 h-3 rounded-full"
                        style={{
                          backgroundColor: "var(--color-bg-input)",
                          maxWidth: `${60 + row * 8}%`,
                        }}
                      />
                      <div
                        className="px-3 py-1 rounded-full text-[10px] font-medium"
                        style={{
                          backgroundColor:
                            row === 1
                              ? "var(--color-bg-success-light)"
                              : row === 2
                              ? "var(--color-badge-warning-bg)"
                              : row === 3
                              ? "var(--color-badge-info-bg)"
                              : "var(--color-bg-input)",
                          color:
                            row === 1
                              ? "var(--color-success)"
                              : row === 2
                              ? "var(--color-warning)"
                              : row === 3
                              ? "var(--color-info)"
                              : "var(--color-black-5)",
                        }}
                      >
                        {row === 1
                          ? "New"
                          : row === 2
                          ? "Follow-up"
                          : row === 3
                          ? "Interested"
                          : "Closed"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Lead Management",
    description:
      "Capture leads from Meta, WhatsApp, and custom sources. Track every interaction through a visual pipeline.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: "WhatsApp Integration",
    description:
      "Send messages, templates, and broadcasts directly from your CRM. Full chat history synced in real-time.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    title: "Custom Fields & Modules",
    description:
      "Tailor every field, stage, and workflow to match your industry — education, travel, production, and more.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Role-Based Access",
    description:
      "Fine-grained permissions per stage, source, and action. Control exactly what every team member can see and do.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Automations",
    description:
      "Auto-assign leads, trigger follow-up reminders, and sync sources — all running in the background.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: "Reports & Dashboard",
    description:
      "Real-time analytics on lead flow, conversions, team performance, and follow-up compliance.",
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28"
    >
      <div className="text-center mb-16">
        <h2
          className="text-3xl md:text-5xl font-medium tracking-tight mb-4"
          style={{ color: "var(--color-black-10)" }}
        >
          Everything you need to{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-text)" }}
          >
            close more deals
          </span>
        </h2>
        <p
          className="text-base md:text-lg max-w-lg mx-auto"
          style={{ color: "var(--color-black-6)" }}
        >
          A complete toolkit for modern sales teams — built to be flexible, fast,
          and ridiculously easy to use.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group rounded-2xl p-6 md:p-8 transition-all hover:-translate-y-1"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-border-primary)",
              boxShadow: "0 1px 2px 0 rgba(5, 25, 18, 0.04)",
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: "var(--gradient-icon)",
                color: "white",
              }}
            >
              {feature.icon}
            </div>
            <h3
              className="text-lg font-semibold mb-2 tracking-tight"
              style={{ color: "var(--color-black-10)" }}
            >
              {feature.title}
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-black-6)" }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Connect your lead sources",
    description:
      "Plug in Meta Ads, WhatsApp Business, website forms, or any custom source in minutes.",
  },
  {
    number: "02",
    title: "Configure your pipeline",
    description:
      "Set up stages, assign team members, define permissions, and tailor fields to your workflow.",
  },
  {
    number: "03",
    title: "Engage and convert",
    description:
      "Message leads on WhatsApp, set follow-up reminders, automate assignments, and watch conversions climb.",
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="w-full py-20 md:py-28"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-medium tracking-tight mb-4"
            style={{ color: "var(--color-black-10)" }}
          >
            Up and running in{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-text)" }}
            >
              three steps
            </span>
          </h2>
          <p
            className="text-base md:text-lg max-w-lg mx-auto"
            style={{ color: "var(--color-black-6)" }}
          >
            No complex setup. No consultants needed. Just sign up and go.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl p-8 relative"
              style={{
                backgroundColor: "white",
                border: "1px solid var(--color-border-primary)",
              }}
            >
              <span
                className="text-5xl font-bold block mb-4"
                style={{
                  backgroundImage: "var(--gradient-text)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: 0.25,
                }}
              >
                {step.number}
              </span>
              <h3
                className="text-lg font-semibold mb-2 tracking-tight"
                style={{ color: "var(--color-black-10)" }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-black-6)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const industries = [
  {
    name: "Education",
    description: "Universities, courses, student pipelines",
    emoji: "🎓",
  },
  {
    name: "Video Production",
    description: "Services, models, ambient tracking",
    emoji: "🎬",
  },
  {
    name: "Academy",
    description: "Programs, variants, enrollment flows",
    emoji: "📚",
  },
  {
    name: "Travel",
    description: "Services, variants, booking management",
    emoji: "✈️",
  },
  {
    name: "Real Estate",
    description: "Properties, viewings, client nurturing",
    emoji: "🏠",
  },
  {
    name: "Healthcare",
    description: "Patient leads, appointments, follow-ups",
    emoji: "🏥",
  },
];

function IndustriesSection() {
  return (
    <section
      id="industries"
      className="w-full max-w-[1200px] mx-auto px-6 py-20 md:py-28"
    >
      <div className="text-center mb-16">
        <h2
          className="text-3xl md:text-5xl font-medium tracking-tight mb-4"
          style={{ color: "var(--color-black-10)" }}
        >
          Built for{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-text)" }}
          >
            your industry
          </span>
        </h2>
        <p
          className="text-base md:text-lg max-w-lg mx-auto"
          style={{ color: "var(--color-black-6)" }}
        >
          Xale adapts to your niche with industry-specific modules, fields, and
          workflows out of the box.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {industries.map((industry) => (
          <div
            key={industry.name}
            className="rounded-2xl p-5 md:p-6 text-center transition-all hover:-translate-y-1"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--color-border-primary)",
              boxShadow: "0 1px 2px 0 rgba(5, 25, 18, 0.04)",
            }}
          >
            <div className="text-3xl mb-3">{industry.emoji}</div>
            <h3
              className="text-base font-semibold mb-1 tracking-tight"
              style={{ color: "var(--color-black-10)" }}
            >
              {industry.name}
            </h3>
            <p
              className="text-xs"
              style={{ color: "var(--color-black-5)" }}
            >
              {industry.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 pb-20 md:pb-28">
      <div
        className="rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 120%, #319B72 0%, #102F23 60%, #051912 100%)",
        }}
      >
        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
          Ready to grow your pipeline?
        </h2>
        <p className="text-base md:text-lg text-white/70 max-w-lg mx-auto mb-10">
          Join hundreds of teams already using Xale to convert more leads. Free
          to start, scales with you.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/sign-up"
            className="px-8 py-3.5 text-base font-medium rounded-xl transition-all"
            style={{
              backgroundColor: "white",
              color: "var(--color-black-10)",
            }}
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-3.5 text-base font-medium rounded-xl transition-all text-white/90"
            style={{ border: "1px solid rgba(255,255,255,0.25)" }}
          >
            Log in to Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col font-[var(--font-helvetica-neue)]"
      style={{ background: "var(--body-gradient)" }}
    >
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <IndustriesSection />
        <CTASection />
      </main>
      <XaleFooter />
    </div>
  );
}
