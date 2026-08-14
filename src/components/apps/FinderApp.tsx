import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Folder, ExternalLink, Star, GitFork, FileCode, Tag } from 'lucide-react';
import { PROJECTS as FALLBACK_PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/macOS';

interface FinderAppProps {
  selectedProject?: Project;
}

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

export const FinderApp: React.FC<FinderAppProps> = ({ selectedProject }) => {
  const [projectsList, setProjectsList] = useState<Project[]>(FALLBACK_PROJECTS);
  const [activeProject, setActiveProject] = useState<Project>(selectedProject || FALLBACK_PROJECTS[0]);

  useEffect(() => {
    const fetchRealGithubRepos = async () => {
      try {
        const res = await fetch('https://api.github.com/user/repos?type=owner&per_page=100', {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        let repos: any[] = [];
        if (res.ok) {
          repos = await res.json();
        } else {
          const fallbackRes = await fetch('https://api.github.com/users/DevRudrax/repos?sort=updated');
          if (fallbackRes.ok) {
            repos = await fallbackRes.json();
          }
        }

        if (Array.isArray(repos) && repos.length > 0) {
          // Filter ONLY non-forked original repos
          const originalOnly = repos.filter((r: any) => !r.fork && r.name !== 'DevRudrax' && r.name !== 'localrepo' && r.name !== 'devrudrax-portfolio' && r.name !== 'rudra-demo-project');
          
          if (originalOnly.length > 0) {
            const mapped: Project[] = originalOnly.map((r: any) => ({
              id: r.name,
              name: r.name.replace(/-/g, ' ').replace(/_/g, ' '),
              repoName: r.name,
              description: r.description || `Original repository ${r.name} created by Rudra Pratap Singh (@DevRudrax).`,
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              language: r.language || 'Code',
              tags: [r.language || 'GitHub', 'Original Repo'],
              url: r.html_url,
              readme: `# ${r.name} 🚀\n\n## Overview\n${r.description || 'Original GitHub Repository created by **Rudra Pratap Singh**.'}\n\n- **Repository**: [${r.html_url}](${r.html_url})\n- **Primary Language**: ${r.language || 'Python / TypeScript'}\n- **Open Issues**: ${r.open_issues_count || 0}\n\n---\n[View on GitHub](${r.html_url})`
            }));
            setProjectsList(mapped);
            if (!selectedProject) {
              setActiveProject(mapped[0]);
            }
          }
        }
      } catch (err) {
        console.warn('Using default original non-forked repos for DevRudrax:', err);
      }
    };

    fetchRealGithubRepos();
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      setActiveProject(selectedProject);
    }
  }, [selectedProject]);

  return (
    <div className="flex h-full w-full bg-gray-900 text-white select-none overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/10 bg-gray-950/70 p-3 space-y-4 text-xs">
        <div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2">iCloud</span>
          <div className="mt-1 space-y-0.5">
            <button className="flex w-full items-center gap-2 rounded-lg bg-blue-600/30 px-2 py-1.5 font-medium text-white">
              <Folder className="h-4 w-4 text-blue-400" />
              <span>Original Repos</span>
              <span className="ml-auto rounded-full bg-blue-500/30 px-1.5 py-0.2 text-[10px]">
                {projectsList.length}
              </span>
            </button>
            <a
              href="https://github.com/DevRudrax"
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-gray-400 hover:bg-white/10"
            >
              <FileCode className="h-4 w-4 text-purple-400" />
              <span>@DevRudrax</span>
            </a>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2">Tags</span>
          <div className="mt-1 flex flex-wrap gap-1 px-1">
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
              <Tag className="h-3 w-3 text-red-400" /> Python
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
              <Tag className="h-3 w-3 text-emerald-400" /> TypeScript
            </span>
            <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-gray-300">
              <Tag className="h-3 w-3 text-purple-400" /> AI / RAG
            </span>
          </div>
        </div>
      </div>

      {/* Middle List Panel */}
      <div className="w-56 border-r border-white/10 bg-gray-900/50 p-2 overflow-y-auto space-y-1">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-2 block mb-1">
          Original Repositories
        </span>
        {projectsList.map((project) => {
          const isSelected = activeProject.id === project.id;
          return (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`p-2.5 rounded-xl cursor-pointer transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-300 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs truncate capitalize">{project.name}</span>
                <span className="text-[10px] font-mono opacity-80">⭐ {project.stars}</span>
              </div>
              <p className="text-[10px] opacity-75 line-clamp-1 mt-0.5">{project.description}</p>
            </div>
          );
        })}
      </div>

      {/* Main Markdown View Panel */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between bg-gray-950/80">
        <div>
          {/* Header & GitHub Direct Link */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-4 mb-4 gap-2">
            <div>
              <h2 className="text-xl font-bold text-white capitalize">{activeProject.name}</h2>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-current" /> {activeProject.stars} stars
                </span>
                <span className="flex items-center gap-1 text-purple-400">
                  <GitFork className="h-3.5 w-3.5" /> {activeProject.forks} forks
                </span>
                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] text-blue-300 font-mono">
                  {activeProject.language}
                </span>
              </div>
            </div>

            <a
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:bg-blue-500 transition-all active:scale-95 cursor-pointer"
            >
              <span>View on GitHub</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Styled Markdown Content */}
          <div className="prose prose-invert max-w-none text-xs leading-relaxed text-gray-300">
            <ReactMarkdown>{activeProject.readme}</ReactMarkdown>
          </div>
        </div>

        {/* Bottom Direct Link Bar */}
        <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-mono">Repository: {activeProject.repoName}</span>
          <a
            href={activeProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium"
          >
            [View on GitHub]({activeProject.url})
          </a>
        </div>
      </div>
    </div>
  );
};
