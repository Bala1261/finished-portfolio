
import { FiDownload, FiArrowLeft, FiFileText, FiBriefcase, FiBook, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useBexoProfile } from '../../context/BexoProfileContext';

const ResumeViewerPage = () => {
  const { user, profile, educationEntries, experienceEntries, skillEntries } = useBexoProfile();
  const resumeUrl = user?.resumeUrl || "/resume.pdf";

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Header & Download Action */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
          <div>
            <Link to="/" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mb-2">
              <FiArrowLeft /> Back to Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {user?.name || "Solairaj R"} — Resume
            </h1>
            <p className="text-gray-400 text-sm mt-1">{profile?.headline || "Full Stack Developer"}</p>
          </div>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-sm shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 shrink-0"
          >
            <FiDownload /> Download PDF Resume
          </a>
        </div>

        {/* Themed Resume Document Container */}
        <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-10">
          
          {/* Summary / Objective */}
          <div>
            <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FiFileText /> Professional Summary
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {profile?.bio || "Motivated Computer Science student with hands-on experience building real-world web applications from scratch, including UI design, frontend and backend development, database modeling, deployment, and cloud hosting."}
            </p>
          </div>

          {/* Experience Section */}
          {experienceEntries && experienceEntries.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiBriefcase /> Experience & Track Record
              </h2>
              <div className="space-y-6 border-l-2 border-cyan-500/30 pl-4 sm:pl-6 ml-2">
                {experienceEntries.map((exp, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[25px] sm:-left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-slate-950"></div>
                    <h3 className="text-base sm:text-lg font-bold text-white">{exp.role}</h3>
                    <p className="text-cyan-300 text-xs sm:text-sm font-medium">{exp.company} • {exp.location}</p>
                    <span className="inline-block px-2 py-0.5 my-1 rounded text-[11px] bg-white/5 text-gray-400 border border-white/10">{exp.period}</span>
                    <p className="text-gray-300 text-sm mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {educationEntries && educationEntries.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiBook /> Education & Qualifications
              </h2>
              <div className="space-y-4">
                {educationEntries.map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h3 className="font-bold text-white text-sm sm:text-base">{edu.degree}</h3>
                      <span className="text-xs text-cyan-400 font-semibold px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20">{edu.year}</span>
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1">{edu.institution}</p>
                    {edu.description && <p className="text-gray-400 text-xs mt-2">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Skills Summary */}
          {skillEntries && skillEntries.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FiCheckCircle /> Technical Competencies
              </h2>
              <div className="flex flex-wrap gap-2">
                {skillEntries.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-800 border border-cyan-500/30 text-cyan-200 text-xs font-medium">
                    {skill.name || skill}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default ResumeViewerPage;