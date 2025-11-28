import footerIllustration from "../../../assets/images/footer-illustration.svg";

function LayoutFooter() {
  return (
    <div className="w-full mt-auto relative z-0">
      {/* Illustration Image Section */}
      <div
        className="w-[80vw] mb-10 flex justify-center "
        style={{ margin: "0 auto", marginBottom: "3rem" }}
      >
        <img
          src={footerIllustration}
          alt="Footer Illustration"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Links Section */}
      <div className="flex justify-center space-x-6 pb-6 text-xs text-gray-500">
        <a
          href="#"
          className="hover:text-gray-900 hover:underline transition-colors"
        >
          Terms of use
        </a>
        <span className="text-gray-300">|</span>
        <a
          href="#"
          className="hover:text-gray-900 hover:underline transition-colors"
        >
          Privacy policy
        </a>
      </div>
    </div>
  );
}

export default LayoutFooter;
