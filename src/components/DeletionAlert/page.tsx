import { X } from "lucide-react";
export default function DeletionAlert({
  handleDelete,
  setAlertOpen,
  text,
}: {
  handleDelete: () => void;
  setAlertOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" />
      <div className="flex flex-col relative bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            Delete {text}?
          </h2>
          <button
            type="button"
            onClick={() => setAlertOpen(false)}
            className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center px-6 py-5">
          <p className="text-slate-600 text-sm mb-6">Are you sure</p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setAlertOpen(false)}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              No
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
