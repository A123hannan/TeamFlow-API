import React from "react";

type Props = {
  fullName: string;
  email: string;
  id: number;
};

// Updated to darker, more vibrant shades (e.g., -600)
const colors = [
  "bg-amber-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-red-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-cyan-600",
  "bg-indigo-600",
];

function Page({ fullName, email, id }: Props) {
  const randomColor = colors[(id - 1) % colors.length];

  return (
    <div className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50/60 transition-colors">
      {/* Avatar Circle */}
      <div
        className={`w-8 h-8 text-xs rounded-full flex items-center justify-center font-semibold text-white shrink-0 ${randomColor}`}
      >
        {fullName
          .trim()
          .split(" ")
          .slice(0, 2)
          .map((word) => word[0].toUpperCase())
          .join("")}
      </div>

      {/* Text Info */}
      <div className="min-w-0 flex-1 flex flex-col justify-center">
        <p className="text-sm font-medium text-slate-900 truncate">
          {fullName}
        </p>
        <p className="text-xs text-slate-400 truncate">{email}</p>
      </div>
    </div>
  );
}

export default Page;
