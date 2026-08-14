import React, { useState, useEffect } from 'react';
import { Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { PROJECTS as FALLBACK_PROJECTS } from '../data/portfolioData';
import { Project } from '../types/macOS';

interface DesktopFoldersProps {
  onOpenProjectFolder: (project: Project) => void;
}

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";

export const DesktopFolders: React.FC<DesktopFoldersProps> = ({ onOpenProjectFolder }) => {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);

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
          // Fallback to unauthenticated endpoint
          const fallbackRes = await fetch('https://api.github.com/users/DevRudrax/repos?sort=updated');
          if (fallbackRes.ok) {
            repos = await fallbackRes.json();
          }
        }

        if (Array.isArray(repos) && repos.length > 0) {
          // Filter ONLY non-forked original repos (r.fork === false)
          const originalOnly = repos.filter((r: any) => !r.fork && r.name !== 'DevRudrax' && r.name !== 'localrepo' && r.name !== 'devrudrax-portfolio' && r.name !== 'rudra-demo-project');
          
          if (originalOnly.length > 0) {
            const mapped: Project[] = originalOnly.slice(0, 6).map((r: any) => ({
              id: r.name,
              name: r.name.replace(/-/g, ' ').replace(/_/g, ' '),
              repoName: r.name,
              description: r.description || `Original repository ${r.name} created by Rudra Pratap Singh (@DevRudrax).`,
              stars: r.stargazers_count || 0,
              forks: r.forks_count || 0,
              language: r.language || 'Code',
              tags: [r.language || 'GitHub', 'Original Repo'],
              url: r.html_url,
              readme: `# ${r.name} 🚀\n\n## Overview\n${r.description || 'Original GitHub Repository created by **Rudra Pratap Singh**.'}\n\n- **Repository**: [${r.html_url}](${r.html_url})\n- **Language**: ${r.language || 'TypeScript / Python'}\n- **Stars**: ${r.stargazers_count || 0}\n- **Forks**: ${r.forks_count || 0}\n\n---\n[View on GitHub](${r.html_url})`
            }));
            setProjects(mapped);
          }
        }
      } catch (err) {
        console.warn('Using default original non-forked repos for DevRudrax:', err);
      }
    };

    fetchRealGithubRepos();
  }, []);

  return (
    <div className="absolute top-10 right-6 z-10 flex flex-col items-end gap-6 select-none max-h-[85vh] overflow-y-auto pr-1">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08 * index }}
          onDoubleClick={() => onOpenProjectFolder(project)}
          onClick={() => onOpenProjectFolder(project)}
          className="group flex flex-col items-center gap-1 cursor-pointer w-24 p-2 rounded-xl hover:bg-white/10 transition-all active:scale-95"
        >
          {/* macOS Folder Icon */}
          <div className="relative flex h-14 w-16 items-center justify-center rounded-lg bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg border border-blue-300/40 group-hover:scale-105 transition-transform">
            <Folder className="h-10 w-10 text-white drop-shadow-md" />
            {project.stars > 0 && (
              <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-700 text-[9px] font-bold text-white shadow">
                {project.stars}
              </div>
            )}
          </div>

          {/* Folder Label */}
          <span className="text-center text-xs font-medium text-white drop-shadow-md line-clamp-2 px-1 rounded group-hover:bg-blue-600/80 capitalize">
            {project.name}
          </span>
        </motion.div>
      ))}
    </div>
  );
};
