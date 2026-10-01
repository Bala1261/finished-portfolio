import React from "react";

export const LeetCodeSkeleton: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 animate-pulse pointer-events-none">
      {/* Hero Stats Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-24 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
            <div className="h-3 bg-white/10 rounded w-2/3" />
            <div className="h-6 bg-white/20 rounded w-1/2" />
          </div>
        ))}
      </div>

      {/* Grid for main sections */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
        {/* Left Side: Heatmap + Monthly Chart */}
        <div className="md:col-span-8 flex flex-col gap-8 w-full">
          {/* Heatmap Card */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 h-[220px] flex flex-col justify-between">
            <div className="flex justify-between items-center pb-4 border-b border-white/5">
              <div className="h-4 bg-white/10 rounded w-1/4" />
              <div className="h-3 bg-white/10 rounded w-1/3" />
            </div>
            <div className="flex-1 flex flex-col justify-center gap-2 py-4">
              <div className="h-2 bg-white/10 rounded w-full" />
              <div className="h-12 bg-white/5 rounded w-full" />
            </div>
          </div>

          {/* Monthly Analytics Chart */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 h-[320px] flex flex-col justify-between">
            <div className="h-4 bg-white/10 rounded w-1/3 mb-6" />
            <div className="flex-1 flex items-end gap-2 pb-4">
              {Array.from({ length: 12 }).map((_, idx) => {
                const heights = ["h-16", "h-24", "h-36", "h-48", "h-20", "h-32", "h-40", "h-28", "h-12", "h-36", "h-52", "h-28"];
                return (
                  <div key={idx} className={`flex-1 ${heights[idx]} bg-white/10 rounded-t`} />
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 pt-2 border-t border-white/5">
              {Array.from({ length: 12 }).map((_, idx) => (
                <div key={idx} className="h-2 bg-white/5 rounded w-6" />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Difficulty breakdown + Contest Ratings */}
        <div className="md:col-span-4 flex flex-col gap-8 w-full">
          {/* Problem Difficulty Breakdown */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 h-[280px] flex flex-col justify-between">
            <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
            <div className="flex items-center gap-6 py-4">
              {/* Radial circle placeholder */}
              <div className="w-20 h-20 rounded-full border-4 border-white/10 flex items-center justify-center shrink-0">
                <div className="h-4 bg-white/20 rounded w-8" />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="h-3 bg-white/10 rounded w-full" />
                <div className="h-3 bg-white/10 rounded w-5/6" />
                <div className="h-3 bg-white/10 rounded w-4/5" />
              </div>
            </div>
          </div>

          {/* Contest Chart Placeholder */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-6 h-[260px] flex flex-col justify-between">
            <div className="h-4 bg-white/10 rounded w-2/3 mb-4" />
            <div className="flex-1 bg-white/5 border border-dashed border-white/10 rounded-lg flex items-center justify-center p-4">
              <div className="h-16 bg-white/10 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeetCodeSkeleton;
