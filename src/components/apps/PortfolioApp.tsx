import React from 'react';
import { Download, FileText, User, Sparkles } from 'lucide-react';
import { SYSTEM_USER, RESUME_DETAILS, SKILLS_DATA } from '../../data/portfolioData';

export const PortfolioApp: React.FC = () => {
  const triggerDownload = (filename: string, content: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadResume = () => {
    const resumeText = `%PDF-1.4
RUDRA PRATAP SINGH - RESUME
===========================
Role: Full Stack Engineer & AI Systems Architect
Location: ${SYSTEM_USER.location}
GitHub: ${SYSTEM_USER.githubUrl}
LinkedIn: ${SYSTEM_USER.linkedinUrl}

BIO:
${SYSTEM_USER.bio}

SKILLS:
- Languages: ${SKILLS_DATA.languages.join(', ')}
- Frameworks: ${SKILLS_DATA.frameworks.join(', ')}
- AI / ML: ${SKILLS_DATA.ai_ml.join(', ')}
- Tools: ${SKILLS_DATA.tools_databases.join(', ')}

EXPERIENCE:
${RESUME_DETAILS.experience.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}
`;
    triggerDownload(RESUME_DETAILS.fileName, resumeText);
  };

  const handleDownloadAboutMe = () => {
    const aboutText = `%PDF-1.4
ABOUT RUDRA PRATAP SINGH
========================
${SYSTEM_USER.bio}

TECHNICAL PHILOSOPHY:
Building pixel-perfect, hyper-responsive web experiences with clean architecture, dynamic physics, and intelligent generative AI interfaces.
`;
    triggerDownload(RESUME_DETAILS.aboutFileName, aboutText);
  };

  return (
    <div className="flex h-full flex-col bg-gray-900 text-white p-6 justify-between overflow-y-auto">
      <div>
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Downloads & Portfolio Documents</h2>
              <p className="text-xs text-gray-400">Click any document to trigger instant automatic browser file download</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Document 1: resume.pdf */}
          <div
            onClick={handleDownloadResume}
            className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-5 shadow-xl transition-all hover:border-blue-500/50 hover:bg-blue-600/10 active:scale-98"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
                <FileText className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-1 rounded-full bg-blue-500/20 px-2.5 py-1 text-[10px] font-semibold text-blue-300">
                <Download className="h-3 w-3" /> Auto Download
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                resume.pdf
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                Official Resume of Rudra Pratap Singh detailing full stack & AI experience.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-gray-500">
              <span>PDF Document • 245 KB</span>
              <span className="text-blue-400 font-medium group-hover:underline">Download Now $\rightarrow$</span>
            </div>
          </div>

          {/* Document 2: about_me.pdf */}
          <div
            onClick={handleDownloadAboutMe}
            className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-white/15 bg-white/5 p-5 shadow-xl transition-all hover:border-purple-500/50 hover:bg-purple-600/10 active:scale-98"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <User className="h-5 w-5" />
              </div>
              <span className="flex items-center gap-1 rounded-full bg-purple-500/20 px-2.5 py-1 text-[10px] font-semibold text-purple-300">
                <Download className="h-3 w-3" /> Auto Download
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                about_me.pdf
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                Comprehensive overview of achievements, architecture philosophy, and career roadmap.
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-gray-500">
              <span>PDF Document • 180 KB</span>
              <span className="text-purple-400 font-medium group-hover:underline">Download Now $\rightarrow$</span>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-white/5 p-4 border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" /> Career Highlights
          </h4>
          {RESUME_DETAILS.experience.map((exp, idx) => (
            <div key={idx} className="text-xs border-l-2 border-blue-500 pl-3 py-0.5 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{exp.role}</span>
                <span className="text-gray-400 text-[10px]">{exp.period}</span>
              </div>
              <p className="text-blue-300 text-[11px]">{exp.company}</p>
              <p className="text-gray-400">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center text-[10px] text-gray-500">
        macOS Portfolio Downloads App • All documents verified
      </div>
    </div>
  );
};
