import React from 'react';
import { MapPin, ExternalLink, Briefcase } from 'lucide-react';
import { SYSTEM_USER } from '../../data/portfolioData';

export const ContactsApp: React.FC = () => {
  return (
    <div className="flex h-full w-full bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r border-white/10 bg-gray-950/60 p-4 space-y-3">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">All Contacts</h3>
        <div className="flex items-center gap-3 p-2 rounded-xl bg-blue-600/30 border border-blue-500/40 cursor-pointer">
          <img
            src={SYSTEM_USER.avatar}
            alt={SYSTEM_USER.name}
            className="h-10 w-10 rounded-full object-cover border border-white/20"
          />
          <div>
            <p className="text-xs font-bold text-white">{SYSTEM_USER.name}</p>
            <p className="text-[10px] text-gray-400 font-mono">Me & Portfolio</p>
          </div>
        </div>
      </div>

      {/* Main Profile Card (macOS Contacts Style) */}
      <div className="flex-1 p-6 overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Header Profile Section */}
          <div className="flex items-center gap-5 border-b border-white/10 pb-6">
            <img
              src={SYSTEM_USER.avatar}
              alt={SYSTEM_USER.name}
              className="h-20 w-20 rounded-full object-cover border-2 border-blue-400/50 shadow-xl"
            />
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">{SYSTEM_USER.name}</h2>
              <p className="text-xs text-blue-400 font-mono font-medium">{SYSTEM_USER.username}</p>
              <p className="mt-1 text-xs text-gray-300 flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5 text-purple-400" />
                Full Stack & AI Systems Engineer
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="h-3.5 w-3.5 text-red-400" />
                {SYSTEM_USER.location}
              </p>
            </div>
          </div>

          {/* Direct Social Links */}
          <div className="mt-6 space-y-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Connected Accounts</h4>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* LinkedIn Link */}
              <a
                href={SYSTEM_USER.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-blue-600/20 border border-blue-500/40 hover:bg-blue-600/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold">
                    in
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">LinkedIn Profile</p>
                    <p className="text-[10px] text-blue-300">Rudra Pratap Singh</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* GitHub Link */}
              <a
                href={SYSTEM_USER.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-700 text-white font-bold">
                    GH
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">GitHub Profile</p>
                    <p className="text-[10px] text-purple-300">@DevRudrax</p>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Bio & Skills Highlights */}
          <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-gray-300 space-y-2">
            <h4 className="font-semibold text-white">About</h4>
            <p className="leading-relaxed">{SYSTEM_USER.bio}</p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-center text-[11px] text-gray-500">
          macOS Contacts Card • Synchronized via iCloud
        </div>
      </div>
    </div>
  );
};
