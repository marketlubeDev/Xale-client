import React, { useRef, useState } from "react";

interface ImageUploadProps {
  label?: string;
  onFileSelect?: (file: File) => void;
  className?: string;
  width?: string;
  height?: string; // Added height prop
  acceptedFormats?: string; // e.g. ".png, .jpg, .jpeg, .webp"
}

export default function ImageUpload({
  label = "Company logo",
  onFileSelect,
  className = "",
  width = "45rem",
  height = "8rem", // Default to h-40 equivalent (160px)
  acceptedFormats = ".png, .jpg, .jpeg, .webp",
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    // Create a local preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    if (onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`w-full max-w-4xl ${className} mb-8`}
      style={{ minWidth: width }}
    >
      <label className="block text-sm font-medium text-emerald-950 mb-3">
        {label}
      </label>

      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ height: height }} // Applied dynamic height here
        className={`
          relative w-full
          flex flex-col items-center justify-center
          rounded-xl border-2 border-dashed
          transition-all duration-200 cursor-pointer
          bg-slate-50/50 hover:bg-emerald-50/30
          ${
            isDragging
              ? "border-emerald-500 bg-emerald-50"
              : "border-emerald-200/60" // Matches the subtle dashed line in image
          }
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedFormats}
          onChange={handleFileInput}
        />

        {preview ? (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg text-white font-medium">
              Click to change
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-4">
            {/* Upload Icon Container - Reduced margin bottom slightly */}
            <div className="w-10 h-10 mb-3 bg-emerald-100/50 rounded-xl flex items-center justify-center text-emerald-800">
              <UploadIcon />
            </div>

            {/* Main Text */}
            <p className="text-gray-700 font-medium mb-1 text-sm">
              Drag your image here or{" "}
              <span className="underline decoration-1 underline-offset-2">
                browse
              </span>
            </p>

            {/* Subtext */}
            <p className="text-[10px] text-gray-400 uppercase tracking-wide">
              PNG, JPG, JPEG, WEBP
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      width="20" // Slightly smaller icon to match reduced height
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 10L12.0002 7M12.0002 7L15 10M12.0002 7V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12V15C2 18.866 2 20.799 3.17157 22C4.34315 23.201 6.22876 23.201 10 23.201H14C17.7712 23.201 19.6569 23.201 20.8284 22C22 20.799 22 18.866 22 15V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 12V9C22 5.13401 22 3.20101 20.8284 2C19.6569 0.798993 17.7712 0.798993 14 0.798993H10C6.22876 0.798993 4.34315 0.798993 3.17157 2C2 3.20101 2 5.13401 2 9V12"
        stroke="currentColor"
        strokeOpacity="0"
        strokeWidth="1.5"
      />
      <path
        d="M21 15V16C21 19 19 21 16 21H8C5 21 3 19 3 16V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
