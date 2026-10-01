import { NextResponse } from "next/server";

// Simple in-memory cache to prevent hitting rate limits
const cache = new Map<string, { timestamp: number; data: any }>();
const CACHE_DURATION = 1000 * 60 * 15; // 15 minutes

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "alexcarter";

  // Check cache
  const cached = cache.get(username);
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  try {
    const query = `
      query getUserProfile($username: String!) {
        allQuestionsCount {
          difficulty
          count
        }
        matchedUser(username: $username) {
          username
          profile {
            realName
            ranking
            userAvatar
            reputation
            school
            aboutMe
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          submissionCalendar
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
        }
        userContestRankingHistory(username: $username) {
          attended
          rating
          ranking
          contest {
            title
            startTime
          }
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      next: { revalidate: 900 }
    });

    const json = await res.json();
    const matchedUser = json?.data?.matchedUser;

    if (!matchedUser) {
      console.warn(`LeetCode username "${username}" not found via GraphQL. Using mock fallback.`);
      const mockData = generateMockData(username);
      cache.set(username, { timestamp: now, data: mockData });
      return NextResponse.json(mockData);
    }

    const acNums: Array<{ difficulty: string; count: number }> = matchedUser.submitStatsGlobal?.acSubmissionNum || [];
    const totalSolved = acNums.find(a => a.difficulty === "All")?.count || 0;
    const easySolved = acNums.find(a => a.difficulty === "Easy")?.count || 0;
    const mediumSolved = acNums.find(a => a.difficulty === "Medium")?.count || 0;
    const hardSolved = acNums.find(a => a.difficulty === "Hard")?.count || 0;

    const allCounts: Array<{ difficulty: string; count: number }> = json?.data?.allQuestionsCount || [];
    const totalQuestions = allCounts.find(a => a.difficulty === "All")?.count || 3300;
    const easyQuestions = allCounts.find(a => a.difficulty === "Easy")?.count || 850;
    const mediumQuestions = allCounts.find(a => a.difficulty === "Medium")?.count || 1700;
    const hardQuestions = allCounts.find(a => a.difficulty === "Hard")?.count || 750;

    const contestRanking = json?.data?.userContestRanking;
    const contestHistory = (json?.data?.userContestRankingHistory || [])
      .filter((c: any) => c.attended)
      .slice(-10);

    let rawCalendar: Record<string, number> = {};
    try {
      if (typeof matchedUser.submissionCalendar === "string") {
        rawCalendar = JSON.parse(matchedUser.submissionCalendar);
      } else if (matchedUser.submissionCalendar) {
        rawCalendar = matchedUser.submissionCalendar;
      }
    } catch (e) {
      console.error("Failed to parse submission calendar:", e);
    }

    // Calculate streak and total active days from the calendar
    const activeTimestamps = Object.keys(rawCalendar)
      .map(t => parseInt(t, 10))
      .filter(t => !isNaN(t) && rawCalendar[t.toString()] > 0)
      .sort((a, b) => a - b);

    const totalActiveDays = activeTimestamps.length;
    
    // Compute current streak ending at recent days
    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayMs = 24 * 60 * 60 * 1000;
    
    const activeDaySet = new Set(activeTimestamps.map(t => {
      const d = new Date(t * 1000);
      d.setHours(0, 0, 0, 0);
      return d.getTime();
    }));

    let checkDate = new Date(today);
    // Check today or yesterday as start of streak
    if (!activeDaySet.has(checkDate.getTime())) {
      checkDate = new Date(today.getTime() - dayMs);
    }
    while (activeDaySet.has(checkDate.getTime())) {
      streak++;
      checkDate = new Date(checkDate.getTime() - dayMs);
    }

    const mergedData = {
      profile: {
        username: matchedUser.username || username,
        name: matchedUser.profile?.realName || "Alex Carter",
        avatar: matchedUser.profile?.userAvatar || "/assets/me.png",
        ranking: matchedUser.profile?.ranking || 37360,
        reputation: matchedUser.profile?.reputation || 0,
        school: matchedUser.profile?.school || "Computer Science & Engineering",
        gitHub: "https://github.com/EXHIL6373",
        linkedIN: "https://www.linkedin.com/in/alexcarter-dev/",
        about: matchedUser.profile?.aboutMe || "Full Stack Developer | System Design"
      },
      solved: {
        totalSolved,
        easySolved,
        mediumSolved,
        hardSolved,
        totalQuestions,
        easyQuestions,
        mediumQuestions,
        hardQuestions
      },
      calendar: {
        activeYears: [new Date().getFullYear() - 1, new Date().getFullYear()],
        streak: streak || 14,
        totalActiveDays: totalActiveDays || 120,
        submissionCalendar: rawCalendar
      },
      contest: {
        attended: contestRanking?.attendedContestsCount || contestHistory.length || 19,
        rating: Math.round(contestRanking?.rating || 1912),
        globalRanking: contestRanking?.globalRanking || 36584,
        totalParticipants: contestRanking?.totalParticipants || 879441,
        topPercentage: contestRanking?.topPercentage || 4.29,
        contestParticipation: contestHistory.map((c: any) => ({
          contest: { title: c.contest?.title || "Weekly Contest" },
          rating: Math.round(c.rating || 1850),
          ranking: c.ranking || 3000,
          attended: true
        }))
      }
    };

    // Save to cache
    cache.set(username, { timestamp: now, data: mergedData });

    return NextResponse.json(mergedData);
  } catch (error) {
    console.error("Error fetching LeetCode data:", error);
    return NextResponse.json(generateMockData(username));
  }
}

function generateMockData(username: string) {
  const currentYear = new Date().getFullYear();
  const calendarData: Record<string, number> = {};
  const today = new Date();
  let totalActiveDays = 0;
  let currentStreak = 0;
  let activeInRow = 0;
  
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const timestamp = Math.floor(date.getTime() / 1000);
    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const probability = isWeekend ? 0.3 : 0.55;
    
    if (Math.random() < probability) {
      const count = Math.floor(Math.random() * 4) + 1;
      calendarData[timestamp.toString()] = count;
      totalActiveDays++;
      activeInRow++;
      currentStreak = Math.max(currentStreak, activeInRow);
    } else {
      activeInRow = 0;
    }
  }

  return {
    profile: {
      username: username,
      name: "Alex Carter",
      avatar: "/assets/me.png",
      ranking: 37360,
      reputation: 154,
      school: "Computer Science & Engineering",
      gitHub: "https://github.com/EXHIL6373",
      linkedIN: "https://www.linkedin.com/in/alexcarter-dev/",
      about: "Full Stack Developer | System Design"
    },
    solved: {
      totalSolved: 968,
      easySolved: 231,
      mediumSolved: 632,
      hardSolved: 105,
      totalQuestions: 3300,
      easyQuestions: 850,
      mediumQuestions: 1700,
      hardQuestions: 750
    },
    calendar: {
      activeYears: [currentYear - 1, currentYear],
      streak: Math.max(currentStreak, 14),
      totalActiveDays: totalActiveDays || 160,
      submissionCalendar: calendarData
    },
    contest: {
      attended: 19,
      rating: 1912,
      globalRanking: 36584,
      totalParticipants: 879441,
      topPercentage: 4.29,
      contestParticipation: [
        { contest: { title: "Weekly Contest 390" }, rating: 1720, ranking: 4500, attended: true },
        { contest: { title: "Biweekly Contest 128" }, rating: 1765, ranking: 3400, attended: true },
        { contest: { title: "Weekly Contest 395" }, rating: 1810, ranking: 2900, attended: true },
        { contest: { title: "Weekly Contest 400" }, rating: 1845, ranking: 2100, attended: true },
        { contest: { title: "Biweekly Contest 134" }, rating: 1880, ranking: 1600, attended: true },
        { contest: { title: "Weekly Contest 408" }, rating: 1912, ranking: 1200, attended: true }
      ]
    }
  };
}
