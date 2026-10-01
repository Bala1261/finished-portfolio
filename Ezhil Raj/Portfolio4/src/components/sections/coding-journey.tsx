import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Award, Zap, Calendar, TrendingUp, Cpu, Flame, ChevronRight, BarChart2 } from "lucide-react";
import { config } from "@/data/config";
import { LeetCodeHeatmap } from "../ui/leetcode-heatmap";
import { LeetCodeSkeleton } from "../ui/leetcode-skeleton";

interface LeetCodeData {
  profile: {
    username: string;
    name: string;
    avatar: string;
    ranking: number;
    reputation: number;
    school: string;
    gitHub: string;
    linkedIN: string;
    about: string;
  };
  solved: {
    totalSolved: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    totalQuestions: number;
    easyQuestions: number;
    mediumQuestions: number;
    hardQuestions: number;
  };
  calendar: {
    activeYears: number[];
    streak: number;
    totalActiveDays: number;
    submissionCalendar: Record<string, number>;
  };
  contest: {
    attended: number;
    rating: number;
    globalRanking: number;
    totalParticipants: number;
    topPercentage: number;
    contestParticipation: Array<{
      contest: { title: string };
      rating: number;
      ranking: number;
      attended: boolean;
    }>;
  };
}

export const CodingJourneySection = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/leetcode?username=${config.leetcodeUsername}`);
        if (!res.ok) throw new Error("Failed to load LeetCode data");
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        console.error(err);
        setError("Could not load LeetCode statistics. Showing fallback data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute monthly analytics from submission calendar
  const monthlyStats = useMemo(() => {
    if (!data?.calendar?.submissionCalendar) return [];
    
    // Group submissions by month: "Jan", "Feb" etc. over the last 12 months
    const monthCounts: Record<string, number> = {};
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initialize last 12 months
    const today = new Date();
    const activeMonths: { label: string; key: string }[] = [];
    
    for (let i = 11; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const label = months[d.getMonth()];
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      activeMonths.push({ label, key });
      monthCounts[key] = 0;
    }

    Object.entries(data.calendar.submissionCalendar).forEach(([timestampStr, count]) => {
      const timestamp = parseInt(timestampStr, 10) * 1000;
      if (isNaN(timestamp)) return;
      const date = new Date(timestamp);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (monthCounts[key] !== undefined) {
        monthCounts[key] += count;
      }
    });

    return activeMonths.map(m => ({
      label: m.label,
      count: monthCounts[m.key] || 0
    }));
  }, [data]);

  // Compute monthly average problems and maximums
  const monthlyAnalyticsSummary = useMemo(() => {
    if (monthlyStats.length === 0) return { maxMonth: "None", avgPerMonth: 0 };
    let max = -1;
    let maxLabel = "";
    let total = 0;
    
    monthlyStats.forEach(m => {
      total += m.count;
      if (m.count > max) {
        max = m.count;
        maxLabel = m.label;
      }
    });
    
    return {
      maxMonth: maxLabel || "None",
      avgPerMonth: Math.round(total / monthlyStats.length)
    };
  }, [monthlyStats]);

  // SVG Contest line graph coordinates
  const contestChartData = useMemo(() => {
    if (!data?.contest?.contestParticipation || data.contest.contestParticipation.length === 0) return null;
    const ratings = data.contest.contestParticipation.map(p => p.rating);
    const minRating = Math.min(...ratings, 1500) - 50;
    const maxRating = Math.max(...ratings, 1500) + 50;
    const ratingRange = maxRating - minRating;

    const points = data.contest.contestParticipation.map((p, idx) => {
      const x = (idx / (data.contest.contestParticipation.length - 1)) * 500;
      // Invert Y axis since 0 is top
      const y = 200 - ((p.rating - minRating) / ratingRange) * 160 - 20;
      return { x, y, rating: Math.round(p.rating), contest: p.contest.title };
    });

    // Generate Path string: "M x0 y0 L x1 y1..."
    let pathD = "";
    let areaD = "";
    if (points.length > 0) {
      pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");
      areaD = `${pathD} L ${points[points.length - 1].x} 200 L ${points[0].x} 200 Z`;
    }

    return { points, pathD, areaD, minRating, maxRating };
  }, [data]);

  // Badge classification based on rating
  const ratingBadge = (rating: number) => {
    if (rating >= 2200) return { name: "Guardian", color: "text-amber-400 bg-amber-400/10 border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]" };
    if (rating >= 1850) return { name: "Knight", color: "text-purple-400 bg-purple-400/10 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]" };
    return { name: "Specialist", color: "text-sky-400 bg-sky-400/10 border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.2)]" };
  };

  return (
    <section id="coding-journey" className="relative w-full py-16 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 pointer-events-none overflow-visible">
      {/* Title block */}
      <Link href={"#coding-journey"} className="pointer-events-auto block w-fit mx-auto mb-10 md:mb-16">
        <h2
          className={cn(
            "bg-clip-text text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-center text-transparent font-display font-extrabold tracking-tight",
            "bg-gradient-to-b from-white via-white/95 to-slate-200 drop-shadow-[0_0_35px_rgba(255,255,255,0.6)]"
          )}
        >
          CODING JOURNEY
        </h2>
      </Link>

      <div className="max-w-7xl mx-auto pointer-events-auto">
        {loading ? (
          <LeetCodeSkeleton />
        ) : error || !data ? (
          <div className="text-center py-10 text-red-400 bg-red-950/20 border border-red-500/30 rounded-xl max-w-lg mx-auto">
            {error || "Could not retrieve statistics."}
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Hero Stats Panel */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {[
                {
                  label: "Total Problems Solved",
                  value: data.solved.totalSolved,
                  icon: <Cpu className="w-5 h-5 text-purple-400" />,
                  subtitle: `Active Days: ${data.calendar.totalActiveDays}`
                },
                {
                  label: "Global Ranking",
                  value: data.profile.ranking,
                  icon: <TrendingUp className="w-5 h-5 text-sky-400" />,
                  subtitle: `Reputation: ${data.profile.reputation}`
                },
                {
                  label: "Contest Rating",
                  value: data.contest.rating || "N/A",
                  icon: <Award className="w-5 h-5 text-amber-400" />,
                  subtitle: data.contest.rating ? `${ratingBadge(data.contest.rating).name} Tier` : "Unrated"
                },
                {
                  label: "Current Streak",
                  value: `${data.calendar.streak} Days`,
                  icon: <Flame className="w-5 h-5 text-orange-400" />,
                  subtitle: "Max Streak Activated"
                }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 hover:border-purple-500/30 rounded-xl p-4 flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400 font-medium">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      {typeof stat.value === "number" ? <AnimatedCounter value={stat.value} /> : stat.value}
                    </h3>
                    <span className="text-[10px] text-zinc-500 mt-1 block">{stat.subtitle}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full">
              
              {/* LEFT COLUMN: Heatmap + Monthly Chart */}
              <div className="md:col-span-8 flex flex-col gap-8 w-full">
                
                {/* Heatmap Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Contribution Heatmap
                  </h3>
                  <LeetCodeHeatmap
                    submissionCalendar={data.calendar.submissionCalendar}
                    totalActiveDays={data.calendar.totalActiveDays}
                    streak={data.calendar.streak}
                  />
                </motion.div>

                {/* Monthly Activity Analytics Chart */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <BarChart2 className="w-5 h-5 text-sky-400" />
                      Monthly Solve Frequency
                    </h3>
                    <div className="text-[10px] text-zinc-400 flex gap-3">
                      <span>Avg/Month: <strong className="text-white">{monthlyAnalyticsSummary.avgPerMonth}</strong></span>
                      <span>Peak Month: <strong className="text-white">{monthlyAnalyticsSummary.maxMonth}</strong></span>
                    </div>
                  </div>

                  <div className="h-44 flex items-end gap-2 border-b border-white/10 pb-2 relative select-none">
                    {monthlyStats.map((item, idx) => {
                      const maxCount = Math.max(...monthlyStats.map(m => m.count), 1);
                      const heightPercent = `${(item.count / maxCount) * 100}%`;
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group">
                          {/* Hover Tooltip showing actual solve count */}
                          <div className="absolute mb-[180px] bg-zinc-950 border border-sky-500/30 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none z-10">
                            {item.count} solved
                          </div>
                          
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: heightPercent }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05, duration: 0.8, ease: "easeOut" }}
                            className={cn(
                              "w-full rounded-t bg-gradient-to-t transition-all duration-300",
                              item.count === maxCount 
                                ? "from-sky-600/80 to-purple-500/90 shadow-[0_0_12px_rgba(168,85,247,0.3)]" 
                                : "from-purple-900/60 to-purple-600/70 group-hover:from-purple-800/80 group-hover:to-purple-500/80"
                            )}
                          />
                          <span className="text-[9px] text-zinc-500 mt-2 font-mono group-hover:text-white transition-colors">
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN: Difficulty Breakdown + Contest Chart */}
              <div className="md:col-span-4 flex flex-col gap-8 w-full">
                
                {/* Problems Solved Breakdown Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col justify-between"
                >
                  <h3 className="text-base sm:text-lg font-bold text-white mb-6">Difficulty Mastery</h3>
                  
                  <div className="flex flex-col gap-5">
                    {[
                      {
                        label: "Easy",
                        solved: data.solved.easySolved,
                        total: data.solved.easyQuestions,
                        color: "from-emerald-500 to-teal-400 bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      },
                      {
                        label: "Medium",
                        solved: data.solved.mediumSolved,
                        total: data.solved.mediumQuestions,
                        color: "from-amber-500 to-orange-400 bg-amber-500/10 text-amber-400 border-amber-500/20"
                      },
                      {
                        label: "Hard",
                        solved: data.solved.hardSolved,
                        total: data.solved.hardQuestions,
                        color: "from-rose-500 to-red-400 bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }
                    ].map((diff, idx) => {
                      const percent = `${(diff.solved / diff.total) * 100}%`;
                      return (
                        <div key={idx} className="flex flex-col gap-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-white">{diff.label}</span>
                            <span className="text-zinc-400 font-mono">
                              <strong className="text-white font-bold">{diff.solved}</strong> / {diff.total}
                            </span>
                          </div>
                          
                          {/* Custom Animated Progress Bar */}
                          <div className="w-full h-2 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: percent }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.1, ease: "easeOut" }}
                              className={`h-full rounded-full bg-gradient-to-r ${diff.color.split(" ")[0]} ${diff.color.split(" ")[1]}`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Contest Rating Chart Card */}
                {contestChartData && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-base sm:text-lg font-bold text-white">Contest Rating</h3>
                      {data.contest.rating && (
                        <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded border leading-none shrink-0", ratingBadge(data.contest.rating).color)}>
                          {ratingBadge(data.contest.rating).name.toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* SVG Line Graph */}
                    <div className="w-full h-36 relative select-none">
                      <svg
                        viewBox="0 0 500 200"
                        className="w-full h-full overflow-visible"
                        preserveAspectRatio="none"
                      >
                        {/* Area shading below curve */}
                        <defs>
                          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <path
                          d={contestChartData.areaD}
                          fill="url(#areaGradient)"
                          className="pointer-events-none"
                        />

                        {/* Line Curve */}
                        <path
                          d={contestChartData.pathD}
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className="drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]"
                        />

                        {/* Interactive Dot Anchors */}
                        {contestChartData.points.map((pt, idx) => (
                          <g key={idx} className="group/dot cursor-pointer">
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r="4"
                              fill="#c084fc"
                              stroke="#ffffff"
                              strokeWidth="1.5"
                              className="transition-transform duration-150 group-hover/dot:scale-150"
                            />
                            {/* Floating individual ratings tags on hover */}
                            <foreignObject
                              x={pt.x - 30}
                              y={pt.y - 28}
                              width="60"
                              height="22"
                              className="opacity-0 group-hover/dot:opacity-100 transition-opacity duration-150 pointer-events-none"
                            >
                              <div className="bg-zinc-950/90 border border-purple-400 text-[8px] font-bold text-white rounded text-center py-0.5 leading-none">
                                {pt.rating}
                              </div>
                            </foreignObject>
                          </g>
                        ))}
                      </svg>

                      {/* Top percentage banner */}
                      {data.contest.topPercentage > 0 && (
                        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-between text-[10px] text-zinc-500 border-t border-white/5 pt-2">
                          <span>Attended: <strong className="text-white">{data.contest.attended}</strong></span>
                          <span>Top <strong className="text-white">{data.contest.topPercentage}%</strong> Globally</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Profile Link Card */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-r from-purple-950/40 via-sky-950/20 to-black/40 border border-white/10 hover:border-purple-500/30 rounded-xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.3)] flex items-center justify-between group transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={data.profile.avatar} 
                      alt="LeetCode Avatar" 
                      className="w-10 h-10 rounded-lg object-cover border border-white/10 shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-white truncate max-w-[150px]">{data.profile.name}</span>
                      <span className="text-[10px] text-zinc-500">@{data.profile.username}</span>
                    </div>
                  </div>
                  <Link
                    href={`https://leetcode.com/u/${data.profile.username}`}
                    target="_blank"
                    className="flex items-center gap-1 text-[10px] bg-white text-black font-bold px-3 py-1.5 rounded-lg group-hover:bg-purple-400 group-hover:text-black transition-colors"
                  >
                    View Profile
                    <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </motion.div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Animated rolling counter component
const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 1500;
    const startTime = performance.now();

    const updateCount = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [value]);

  return <>{count.toLocaleString()}</>;
};

export default CodingJourneySection;
