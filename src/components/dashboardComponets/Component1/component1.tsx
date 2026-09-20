"use client";
import React, { useState } from "react";
import { RefreshCcw, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import AddCard from "@/src/components/Users/AddUserCard/card";
interface props {
  heading: string;
  subheading: string;
  button?: boolean;
  buttonText?: string;
}
function component1({ heading, subheading, button, buttonText }: props) {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  
  const handleRefresh = () => {
    router.refresh();
  };
  const handleClick = () => {
    if (!button) {
      handleRefresh();
    }
    setAddOpen(true);
  };

  return (
    <>
      <div className="mb-[24px] mt-[36px] flex flex-row  items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{heading}</h2>
          <p className="text-sm text-slate-500  mt-[2px]">{subheading}</p>
        </div>
        <button
          onClick={handleClick}
          className={`flex items-center gap-[8px] px-3 py-2 text-sm font-medium   border border-slate-200 rounded-lg  transition-colors cursor-pointer ${button ? "bg-primary text-white" : "bg-white hover:bg-slate-50 text-slate-600"}`}
        >
          {button ? (
            <>
              <Plus />
              {buttonText}
            </>
          ) : (
            <>
              <RefreshCcw />
              {"Refresh"}
            </>
          )}
        </button>
      </div>
      {addOpen ? <AddCard setAddOpen={setAddOpen} /> : ""}
    </>
  );
}

export default component1;
