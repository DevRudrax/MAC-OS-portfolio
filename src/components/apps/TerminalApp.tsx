import React, { useState, useEffect, useRef } from 'react';
import { SKILLS_DATA, SYSTEM_USER, PROJECTS } from '../../data/portfolioData';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [githubSkills, setGithubSkills] = useState<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const res = await fetch('https://api.github.com/users/DevRudrax');
        if (res.ok) {
          const data = await res.json();
          setGithubSkills(data);
        }
      } catch (err) {
        console.warn('GitHub API fetch failed', err);
      }
    };

    fetchGithubData();

    setHistory([
      {
        command: 'neofetch',
        output: (
          <div className="flex flex-col md:flex-row gap-6 py-2 text-xs">
            <div className="text-emerald-400 font-mono select-none overflow-x-auto">
              <pre className="text-[11px] leading-tight font-bold">{`
  _____  _    _ _____  _____            
 |  __ \\| |  | |  __ \\|  __ \\     /\\    
 | |__) | |  | | |  | | |__) |   /  \\   
 |  _  /| |  | | |  | |  _  /   / /\\ \\  
 | | \\ \\| |__| | |__| | | \\ \\  / ____ \\ 
 |_|  \\_\\\\____/|_____/|_|  \\_\\/_/    \\_\\
              `}</pre>
            </div>
            <div className="space-y-1 font-mono text-gray-300">
              <p><span className="font-bold text-blue-400">User:</span> {SYSTEM_USER.name} ({SYSTEM_USER.username})</p>
              <p><span className="font-bold text-blue-400">OS:</span> macOS Tahoe 15.2 (24C101)</p>
              <p><span className="font-bold text-blue-400">Host:</span> MacBook Pro M3 Max</p>
              <p><span className="font-bold text-blue-400">Shell:</span> zsh 5.9 (arm64-apple-darwin23.0)</p>
              <p><span className="font-bold text-blue-400">GitHub:</span> {SYSTEM_USER.githubUrl}</p>
              <p className="text-emerald-400 pt-1">Type <code className="text-amber-300">help</code> or <code className="text-amber-300">skills</code> to inspect profile skills.</p>
            </div>
          </div>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput('');

    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'clear':
        setHistory([]);
        return;

      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs text-gray-300">
            <p className="text-yellow-400 font-semibold">Available Terminal Commands:</p>
            <p><span className="text-emerald-400 w-24 inline-block font-mono">skills</span> - Displays technical skills & frameworks</p>
            <p><span className="text-emerald-400 w-24 inline-block font-mono">projects</span> - Lists pinned GitHub repositories</p>
            <p><span className="text-emerald-400 w-24 inline-block font-mono">whoami</span> - Shows system user info & bio</p>
            <p><span className="text-emerald-400 w-24 inline-block font-mono">contact</span> - Displays LinkedIn, GitHub, and email links</p>
            <p><span className="text-emerald-400 w-24 inline-block font-mono">neofetch</span> - System neofetch summary</p>
            <p><span className="text-emerald-400 w-24 inline-block font-mono">date</span> - Current date and time</p>
            <p><span className="text-emerald-400 w-24 inline-block font-mono">clear</span> - Clears the terminal output</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-blue-400 font-semibold">🛠️ Technical Skills & Stack:</p>
            <div>
              <span className="text-emerald-400 font-mono">Languages:</span> {SKILLS_DATA.languages.join(', ')}
            </div>
            <div>
              <span className="text-emerald-400 font-mono">Frameworks:</span> {SKILLS_DATA.frameworks.join(', ')}
            </div>
            <div>
              <span className="text-emerald-400 font-mono">AI / Machine Learning:</span> {SKILLS_DATA.ai_ml.join(', ')}
            </div>
            <div>
              <span className="text-emerald-400 font-mono">Tools & Databases:</span> {SKILLS_DATA.tools_databases.join(', ')}
            </div>
            {githubSkills && (
              <div className="mt-2 p-2 rounded bg-gray-900 border border-emerald-500/30 text-gray-300">
                <p className="text-emerald-300 font-semibold">Live GitHub Profile (@DevRudrax):</p>
                <p>Public Repos: {githubSkills.public_repos} | Followers: {githubSkills.followers} | Following: {githubSkills.following}</p>
              </div>
            )}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-purple-400 font-semibold">🚀 Featured Repositories (GitHub @DevRudrax):</p>
            {PROJECTS.map((p) => (
              <div key={p.id} className="border-l-2 border-purple-500 pl-3">
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-bold">
                  {p.name} ⭐ {p.stars}
                </a>
                <p className="text-gray-300 text-[11px]">{p.description}</p>
                <p className="text-gray-500 text-[10px]">{p.tags.join(' • ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="text-xs text-gray-300 space-y-1">
            <p className="text-emerald-400 font-semibold">{SYSTEM_USER.name} ({SYSTEM_USER.username})</p>
            <p>{SYSTEM_USER.bio}</p>
            <p className="text-gray-400">Location: {SYSTEM_USER.location}</p>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="text-xs text-gray-300 space-y-1 font-mono">
            <p className="text-cyan-400 font-semibold">📬 Quick Links:</p>
            <p>GitHub: <a href={SYSTEM_USER.githubUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">{SYSTEM_USER.githubUrl}</a></p>
            <p>LinkedIn: <a href={SYSTEM_USER.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-400 underline">{SYSTEM_USER.linkedinUrl}</a></p>
          </div>
        );
        break;

      case 'date':
        outputNode = <div className="text-xs text-gray-300 font-mono">{new Date().toString()}</div>;
        break;

      case 'sudo':
        outputNode = <div className="text-xs text-red-400 font-mono">Permission denied: You are running in interactive guest mode!</div>;
        break;

      default:
        outputNode = (
          <div className="text-xs text-red-400 font-mono">
            zsh: command not found: {cmd}. Type <span className="text-yellow-300 font-bold">help</span> for commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: input, output: outputNode }]);
  };

  return (
    <div className="flex h-full flex-col bg-black/90 p-4 font-mono text-sm text-green-400 selection:bg-green-500 selection:text-black">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-emerald-400 font-bold whitespace-nowrap">rudra@macbook-pro</span>
              <span className="text-gray-400 font-bold whitespace-nowrap">~ %</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-2">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleCommandSubmit} className="mt-3 flex items-center gap-2 border-t border-gray-800 pt-2 text-xs">
        <span className="text-emerald-400 font-bold whitespace-nowrap">rudra@macbook-pro</span>
        <span className="text-gray-400 font-bold whitespace-nowrap">~ %</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type command ('help', 'skills', 'projects')..."
          className="flex-1 bg-transparent text-white focus:outline-none font-mono"
          autoFocus
        />
      </form>
    </div>
  );
};
