import React from "react";
type props = {
  Icon: React.ElementType;
  number: number;
  title: string;
  subTitle: string;
};
function card({ Icon, number, title, subTitle }: props) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 hover:border-slate-200 transition-colors">
      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
        <Icon className="text-primary" />
      </div>
      <p className="text-2xl font-bold text-slate-900">{number}</p>
      <p className="text-xs font-medium text-slate-600 mt-0.5">{title}</p>
      <p className="text-xs text-slate-400 mt-0.5">{subTitle}</p>
    </div>
  );
}

export default card;
