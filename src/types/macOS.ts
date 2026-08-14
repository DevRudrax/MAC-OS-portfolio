import React from 'react';

export type Stage = 'lock' | 'login' | 'boot' | 'desktop';

export type AppId = 
  | 'terminal' 
  | 'siri' 
  | 'contacts' 
  | 'calculator' 
  | 'portfolio' 
  | 'finder' 
  | 'settings';

export interface WindowState {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  metadata?: Record<string, any>;
}

export interface Project {
  id: string;
  name: string;
  repoName: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  tags: string[];
  readme: string;
  url: string;
}

export interface SiriMessage {
  id: string;
  sender: 'user' | 'siri';
  text: string;
  timestamp: string;
}

export interface TerminalHistory {
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

export interface SystemUser {
  name: string;
  username: string;
  avatar: string;
  githubUrl: string;
  linkedinUrl: string;
  bio: string;
  location: string;
}
