import React from "react";
type props = {
  text: string;
  number: number;
};
function card({ text, number }: props) {
  return (
    <div
      className={`${text === "Total" ? "bg-slate-50" : text === "Completed" ? "bg-green-50" : "bg-amber-50"} rounded-xl border border-slate-100 p-4 text-center`}
    >
      <p
        className={`text-2xl font-bold ${text === "Total" ? "text-slate-900" : text === "Completed" ? "text-green-700" : "text-amber-700"} `}
      >
        {number}
      </p>
      <p className="text-xs text-slate-500 mt-0.5">{text}</p>
    </div>
  );
}

export default card;
