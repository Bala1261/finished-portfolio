import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface LeetCodeHeatmapProps {
  submissionCalendar: Record<string, number>;
  totalActiveDays: number;
  streak: number;
}

// Month labels definition
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const LeetCodeHeatmap: React.FC<LeetCodeHeatmapProps> = ({
  submissionCalendar,
  totalActiveDays,
  streak
}) => {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Group submissions by local YYYY-MM-DD date string
  const submissionsByDate = useMemo(() => {
    const grouped: Record<string, number> = {};
    if (!submissionCalendar) return grouped;

    Object.entries(submissionCalendar).forEach(([timestampStr, count]) => {
      const timestamp = parseInt(timestampStr, 10) * 1000;
      if (isNaN(timestamp)) return;
      const date = new Date(timestamp);
      // Format as YYYY-MM-DD using local time to match calendar dates correctly
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      grouped[dateStr] = (grouped[dateStr] || 0) + count;
    });

    return grouped;
  }, [submissionCalendar]);

  // Generate date grid for the last 365 days
  const calendarGrid = useMemo(() => {
    const grid: { date: Date; dateStr: string; count: number; dayOfWeek: number }[][] = [];
    const today = new Date();
    
    // Find the start date: 365 days ago, shifted back to the nearest Sunday
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 365);
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek); // Back to Sunday

    let currentWeek: typeof grid[0] = [];
    const tempDate = new Date(startDate);

    while (tempDate <= today || currentWeek.length > 0) {
      const year = tempDate.getFullYear();
      const month = String(tempDate.getMonth() + 1).padStart(2, "0");
      const day = String(tempDate.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      const count = submissionsByDate[dateStr] || 0;

      currentWeek.push({
        date: new Date(tempDate),
        dateStr,
        count,
        dayOfWeek: tempDate.getDay()
      });

      if (currentWeek.length === 7) {
        grid.push(currentWeek);
        currentWeek = [];
      }

      tempDate.setDate(tempDate.getDate() + 1);

      // Break safely if we overshoot today significantly
      if (tempDate > new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)) {
        break;
      }
    }

    return grid;
  }, [submissionsByDate]);

  // Determine contribution level for coloring (0 to 4)
  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 4) return 2;
    if (count <= 6) return 3;
    return 4;
  };

  const levelClasses = [
    "bg-white/[0.07] border-white/[0.08] hover:bg-white/15",
    "bg-purple-900/80 border-purple-500/50 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.25)] hover:bg-purple-800 hover:border-purple-400",
    "bg-purple-700/90 border-purple-400/60 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.35)] hover:bg-purple-600 hover:border-purple-300",
    "bg-purple-500 border-purple-300/80 text-white shadow-[0_0_12px_rgba(168,85,247,0.5)] hover:bg-purple-400",
    "bg-fuchsia-400 border-white text-white shadow-[0_0_15px_rgba(232,121,249,0.7)] hover:bg-fuchsia-300"
  ];

  // Helper to format date for tooltips: e.g. "Oct 24, 2025"
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  const monthLabels = useMemo(() => {
    const labels: { text: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    let lastLabeledWeek = -4;

    calendarGrid.forEach((week, weekIdx) => {
      // Find if this week contains the 1st of any month or begins a new month
      const firstDayOfWeek = week[0].date;
      const currentMonth = firstDayOfWeek.getMonth();
      
      if (currentMonth !== lastMonth) {
        if (weekIdx - lastLabeledWeek >= 2) {
          labels.push({
            text: MONTHS[currentMonth],
            weekIndex: weekIdx
          });
          lastLabeledWeek = weekIdx;
        }
        lastMonth = currentMonth;
      }
    });

    return labels;
  }, [calendarGrid]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Calendar Stats Summary */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-zinc-400 border-b border-white/10 pb-4 mb-2">
        <div className="flex gap-4">
          <div>
            <span className="font-bold text-white">{totalActiveDays}</span> Active Days
          </div>
          <div>
            <span className="font-bold text-white">{streak} Days</span> Current Streak
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-zinc-400 mr-1">Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-white/[0.07] border border-white/[0.08]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-purple-900/80 border border-purple-500/50 shadow-[0_0_6px_rgba(168,85,247,0.25)]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-purple-700/90 border border-purple-400/60 shadow-[0_0_8px_rgba(168,85,247,0.35)]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-purple-500 border border-purple-300/80 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-fuchsia-400 border border-white shadow-[0_0_12px_rgba(232,121,249,0.7)]" />
          <span className="text-[11px] text-zinc-400 ml-1">More</span>
        </div>
      </div>

      {/* Heatmap Grid Wrapper */}
      <div className="relative overflow-visible py-2 select-none">
        {/* Full Year Grid (Visible on Desktop/Tablet) */}
        <div className="hidden md:flex flex-col gap-1 w-full overflow-x-auto scrollbar-none pb-2">
          {/* Month Labels */}
          <div className="flex text-[10px] text-zinc-500 h-4 relative w-full mb-1">
            {monthLabels.map((label, idx) => (
              <span
                key={idx}
                className="absolute"
                style={{ left: `${(label.weekIndex / calendarGrid.length) * 100}%` }}
              >
                {label.text}
              </span>
            ))}
          </div>

          <div className="flex gap-1">
            {/* Day of Week Labels */}
            <div className="flex flex-col gap-[3px] text-[8px] text-zinc-600 justify-between h-[84px] pr-2 mt-[2px]">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Grid Cells */}
            <div className="flex gap-[3px]">
              {calendarGrid.map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const level = getLevel(day.count);
                    return (
                      <div
                        key={day.dateStr}
                        className={cn(
                          "w-2.5 h-2.5 rounded-[2px] border transition-all duration-150 cursor-pointer",
                          levelClasses[level]
                        )}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = e.currentTarget.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
                          if (parentRect) {
                            setHoveredDay({
                              date: day.dateStr,
                              count: day.count,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top - 38
                            });
                          }
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Condensed 5-Month Grid (Visible on Mobile) */}
        <div className="flex md:hidden flex-col gap-1 w-full">
          {/* Condensed Month Labels */}
          <div className="flex text-[10px] text-zinc-500 h-4 relative w-full mb-1">
            {monthLabels
              .filter(label => label.weekIndex >= calendarGrid.length - 20)
              .map((label, idx) => {
                const relativeWeek = label.weekIndex - (calendarGrid.length - 20);
                return (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `${(relativeWeek / 20) * 100}%` }}
                  >
                    {label.text}
                  </span>
                );
              })}
          </div>

          <div className="flex gap-1 justify-center">
            {/* Day of Week Labels */}
            <div className="flex flex-col gap-[3px] text-[8px] text-zinc-600 justify-between h-[84px] pr-2 mt-[2px]">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Grid Cells - show only the last 20 weeks */}
            <div className="flex gap-[3px] flex-1 justify-between">
              {calendarGrid.slice(-20).map((week, weekIdx) => (
                <div key={weekIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => {
                    const level = getLevel(day.count);
                    return (
                      <div
                        key={day.dateStr}
                        className={cn(
                          "w-2.5 h-2.5 rounded-[2px] border transition-all duration-150 cursor-pointer",
                          levelClasses[level]
                        )}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const parentRect = e.currentTarget.parentElement?.parentElement?.parentElement?.getBoundingClientRect();
                          if (parentRect) {
                            setHoveredDay({
                              date: day.dateStr,
                              count: day.count,
                              x: rect.left - parentRect.left + rect.width / 2,
                              y: rect.top - parentRect.top - 38
                            });
                          }
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom floating HTML Tooltip */}
        {hoveredDay && (
          <div
            className="absolute z-50 pointer-events-none bg-zinc-950/95 border border-purple-500/30 text-white rounded px-2.5 py-1 text-[10px] font-medium shadow-xl -translate-x-1/2 transition-all duration-100 backdrop-blur-md"
            style={{
              left: hoveredDay.x,
              top: hoveredDay.y
            }}
          >
            <div className="text-zinc-400 font-normal">{formatDate(hoveredDay.date)}</div>
            <div className="font-bold">
              {hoveredDay.count} {hoveredDay.count === 1 ? "submission" : "submissions"}
            </div>
            {/* Small triangle arrow pointer */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-zinc-950" />
          </div>
        )}
      </div>
    </div>
  );
};
