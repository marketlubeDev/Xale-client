import { Link } from "react-router-dom";

export default function XaleFooter() {
  return (
    <div className="w-full border-t border-[var(--color-border-primary)]">
      <div
        className="flex flex-wrap justify-between items-center gap-4 mx-auto px-8 py-5"
        style={{ maxWidth: "1200px" }}
      >
        {/* Left: Logo + Copyright + Powered by */}
        <div className="flex items-center gap-2 text-xs text-[var(--color-black-5)]">
          <img
            src="/assets/Logo.png"
            alt="Xale"
            className="h-5 w-5 rounded-full"
          />
          <span>
            &copy; {new Date().getFullYear()} Xale. All rights reserved. &middot; Powered
            by{" "}
            <a
              href="https://marketlube.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--color-success)] hover:underline"
            >
              Marketlube
            </a>
          </span>
        </div>

        {/* Right: Legal links */}
        <div className="flex items-center gap-5 text-xs text-[var(--color-black-6)]">
          <Link
            to="/privacy-policy"
            className="hover:text-[var(--color-black-10)] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/terms-of-service"
            className="hover:text-[var(--color-black-10)] transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            to="/data-deletion"
            className="hover:text-[var(--color-black-10)] transition-colors"
          >
            Data Deletion
          </Link>
        </div>
      </div>
    </div>
  );
}
