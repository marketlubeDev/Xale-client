import { Link } from "react-router-dom";

export default function LinkSection() {
  return (
    <div className="flex justify-center space-x-6 pb-6 text-xs text-gray-500">
      <Link
        to="/terms-of-service"
        className="hover:text-gray-900 hover:underline transition-colors"
      >
        Terms of use
      </Link>
      <span className="text-gray-300">|</span>
      <Link
        to="/privacy-policy"
        className="hover:text-gray-900 hover:underline transition-colors"
      >
        Privacy policy
      </Link>
    </div>
  );
}
