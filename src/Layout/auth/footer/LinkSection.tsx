export default function LinkSection() {
  return (
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
  );
}
