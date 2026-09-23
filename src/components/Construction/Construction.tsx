import React from "react";
import { ConstructionIcon, X } from "lucide-react";

interface props {
  setConstructionOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
}

function Construction({ setConstructionOpen, title }: props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"></div>
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden p-6 text-center border border-slate-100">
        <div className="absolute top-4 right-4">
          <div>
            <button
              onClick={() => setConstructionOpen(false)}
              className="text-slate-400 hover:text-slate-600 cursor-pointer transition-colors rounded-md p-1 hover:bg-slate-100  transition-transform hover:rotate-90"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
          <ConstructionIcon size={18} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1.5">
          Under Construction
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          <span className="font-semibold text-slate-700">
            {title} &amp; Settings
          </span>{" "}
          is currently under construction and will be available soon!
        </p>
        <button
          onClick={() => setConstructionOpen(false)}
          type="button"
          className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default Construction;
