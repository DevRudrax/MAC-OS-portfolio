import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { SiriMessage } from '../../types/macOS';
import { SYSTEM_USER, PROJECTS, SKILLS_DATA } from '../../data/portfolioData';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export const SiriApp: React.FC = () => {
  const [messages, setMessages] = useState<SiriMessage[]>([
    {
      id: '1',
      sender: 'siri',
      text: `Hello! I'm Siri, your AI Assistant. Ask me anything about Rudra Pratap Singh, his skills, or projects!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        handleSendMessage(transcript);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (err: any) => {
        console.warn('Speech recognition error:', err);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. You can type your query below!');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const speakText = (text: string) => {
    if (!soundEnabled || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const siriVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Siri') || v.lang === 'en-US');
    if (siriVoice) {
      utterance.voice = siriVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input.trim();
    if (!textToSend || loading) return;

    setInput('');
    const userMsg: SiriMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const systemPrompt = `You are Siri, the official AI assistant on Rudra Pratap Singh's macOS Portfolio.
Information about Rudra Pratap Singh:
- Name: Rudra Pratap Singh
- Role: Full Stack Engineer & AI Systems Architect
- GitHub: ${SYSTEM_USER.githubUrl}
- LinkedIn: ${SYSTEM_USER.linkedinUrl}
- Bio: ${SYSTEM_USER.bio}
- Technical Skills:
  - Languages: ${SKILLS_DATA.languages.join(', ')}
  - Frameworks: ${SKILLS_DATA.frameworks.join(', ')}
  - AI/ML: ${SKILLS_DATA.ai_ml.join(', ')}
  - Tools: ${SKILLS_DATA.tools_databases.join(', ')}
- Featured Projects:
${PROJECTS.map(p => `- ${p.name}: ${p.description} (URL: ${p.url})`).join('\n')}

Answer the user concisely, politely, and intelligently as Siri. Keep responses short and friendly (2-4 sentences max). Do not mention underlying LLMs or Gemini.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${systemPrompt}\n\nUser Question: ${textToSend}` }]
            }
          ]
        })
      });

      let aiResponseText = '';
      if (response.ok) {
        const data = await response.json();
        aiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      }

      if (!aiResponseText) {
        aiResponseText = `Rudra Pratap Singh is a Full Stack & AI Engineer skilled in ${SKILLS_DATA.frameworks.slice(0, 3).join(', ')}. Check his GitHub at ${SYSTEM_USER.githubUrl}!`;
      }

      const siriMsg: SiriMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'siri',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, siriMsg]);
      speakText(aiResponseText);
    } catch (err) {
      console.error('AI Assistant API call failed, using fallback response:', err);
      const fallbackText = `Rudra Pratap Singh is an accomplished Full Stack Developer specializing in React, TypeScript, and AI integrations. Check out his projects in the Desktop folders or Terminal!`;
      const siriMsg: SiriMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'siri',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, siriMsg]);
      speakText(fallbackText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-950 p-4 text-white">
      {/* Siri Orb Header Visualizer */}
      <div className="relative flex flex-col items-center justify-center border-b border-white/10 pb-4">
        <div className="relative h-20 w-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 blur-lg opacity-75 animate-siri-orb" />
          <img
            src="/assets/hd-siri-mac-os-apple-logo-icon-png-701751694972473qu0h3agddi.png"
            alt="Siri"
            className="relative z-10 h-16 w-16 rounded-full object-cover shadow-2xl"
          />
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-400 animate-spin" />
          <span className="text-xs font-semibold tracking-wider text-purple-300">
            {isListening ? 'Listening...' : isSpeaking ? 'Siri Speaking...' : 'Siri AI Assistant'}
          </span>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="ml-2 text-gray-400 hover:text-white cursor-pointer"
            title={soundEnabled ? 'Mute Speech' : 'Enable Speech'}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-green-400" /> : <VolumeX className="h-4 w-4 text-red-400" />}
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs shadow-md ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-white/10 text-gray-200 backdrop-blur-md rounded-bl-none border border-white/10'
              }`}
            >
              <p className="leading-relaxed">{msg.text}</p>
            </div>
            <span className="mt-1 text-[10px] text-gray-500 px-1">{msg.timestamp}</span>
          </motion.div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <div className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" />
            <div className="h-2 w-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
            <div className="h-2 w-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.4s]" />
            <span>Siri thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="mt-2 flex items-center gap-2 border-t border-white/10 pt-3">
        <button
          onClick={toggleListening}
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-all cursor-pointer ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isListening ? 'Stop Listening' : 'Voice Input'}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask Siri about Rudra Pratap Singh..."
          className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={loading || !input.trim()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-500 disabled:opacity-50 cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
