type ResourceStateProps = {
  message: string;
  error?: boolean;
};

export default function ResourceState({
  message,
  error = false,
}: ResourceStateProps) {
  return (
    <div
      role={error ? "alert" : "status"}
      className={`rounded-xl border px-4 py-6 text-sm ${
        error
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-slate-200 bg-white text-slate-500"
      }`}
    >
      {message}
    </div>
  );
}
