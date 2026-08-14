import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Terminal, MessageSquare, User, Calculator, Folder, FileText } from 'lucide-react';
import { AppId } from '../types/macOS';
import { PROJECTS } from '../data/portfolioData';

interface SpotlightModalProps {
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
}

export const SpotlightModal: React.FC<SpotlightModalProps> = ({ onClose, onOpenApp }) => {
  const [query, setQuery] = useState('');

  const apps = [
    { id: 'terminal', name: 'Terminal', desc: 'Interactive CLI & GitHub Skills', icon: Terminal },
    { id: 'siri', name: 'Siri AI Assistant', desc: 'Voice & Intelligence Assistant', icon: MessageSquare },
    { id: 'contacts', name: 'Contacts', desc: 'LinkedIn & GitHub profile cards', icon: User },
    { id: 'calculator', name: 'Calculator', desc: 'macOS Dark Calculator', icon: Calculator },
    { id: 'portfolio', name: 'Downloads & Resume', desc: 'Direct File Downloads', icon: FileText },
  ];

  const filteredApps = apps.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()) || a.desc.toLowerCase().includes(query.toLowerCase())
  );

  const filteredProjects = PROJECTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="fixed top-24 left-1/2 z-50 w-[550px] -translate-x-1/2 rounded-2xl macos-glass p-3 shadow-2xl backdrop-blur-3xl border border-white/20 text-white select-none"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-3 pb-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Spotlight Search apps, projects, skills..."
            className="flex-1 bg-transparent text-base text-white placeholder-gray-400 focus:outline-none"
            autoFocus
          />
          <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-gray-400 font-mono">ESC to close</span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto pt-2 space-y-3">
          {/* Applications */}
          {filteredApps.length > 0 && (
            <div>
              <span className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">Applications</span>
              <div className="mt-1 space-y-1">
                {filteredApps.map((app) => {
                  const Icon = app.icon;
                  return (
                    <div
                      key={app.id}
                      onClick={() => {
                        onOpenApp(app.id as AppId);
                        onClose();
                      }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer hover:bg-blue-600 hover:text-white transition-all group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/20">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">{app.name}</p>
                        <p className="text-[10px] text-gray-400 group-hover:text-white/80">{app.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* GitHub Projects */}
          {filteredProjects.length > 0 && (
            <div>
              <span className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider">GitHub Projects</span>
              <div className="mt-1 space-y-1">
                {filteredProjects.map((p) => (
                  <a
                    key={p.id}
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer hover:bg-purple-600 hover:text-white transition-all group"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300">
                      <Folder className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{p.name}</p>
                      <p className="text-[10px] text-gray-400 group-hover:text-white/80 truncate max-w-sm">{p.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};
