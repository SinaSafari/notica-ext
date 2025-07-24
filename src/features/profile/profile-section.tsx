export function ProfileSection() {
  return (
    <div className="flex w-full justify-between items-center h-20  ">
      <div className="flex items-center justify-end gap-4">
        <div className="w-12 h-12  bg-white shadow-lg ring-1 ring-black/20  border border-slate-300 backdrop-blur-sm rounded-lg grid place-items-center">
          12
        </div>
        <div className="w-12 h-12  bg-white shadow-lg ring-1 ring-black/20  border border-slate-300 backdrop-blur-sm rounded-lg grid place-items-center">
          12
        </div>
      </div>
      <div className="flex items-center justify-start">
        <p className="text-4xl text-blue-500 font-bold">نوتیکا</p>
        <img src="/logo.png" className="w-20 h-20" />
      </div>
    </div>
  );
}
