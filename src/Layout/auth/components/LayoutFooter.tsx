import footerIllustration from "../../../assets/images/footer-illustration.svg";
import XaleFooter from "../../../components/XaleFooter";

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

      {/* Footer */}
      <XaleFooter />
    </div>
  );
}

export default LayoutFooter;
