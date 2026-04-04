'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, User, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  '🔍 Best jobs for me?',
  '📄 How to improve my resume?',
  '💰 What salary should I expect?',
  '🎯 What skills should I learn next?',
  '📍 Jobs near Coimbatore?',
];

const BOT_RESPONSES: Record<string, string> = {
  'best jobs': `Based on your profile analysis:\n\n🎯 **Top 3 AI-Matched Jobs:**\n\n1. **Senior Full-Stack Engineer** at TechCorp — 95% match\n   • Perfect skill alignment: React, Node.js, TypeScript\n   • Location: Bangalore (your preferred region)\n\n2. **AI/ML Engineer** at DataVerse — 88% match\n   • Strong Python skills detected\n   • Growing demand in Coimbatore\n\n3. **Frontend Architect** at DesignFlow — 82% match\n   • UI expertise matches well\n\n💡 *Upload your latest resume for more accurate matches!*`,
  'improve resume': `📄 **AI Resume Analysis & Tips:**\n\n✅ **Strengths:**\n• Technical skills well-documented\n• Good project descriptions\n\n⚠️ **Improvements Needed:**\n1. **Add quantifiable metrics** — "Improved load time by 40%"\n2. **Include ATS keywords** — Add: "CI/CD", "Agile", "Microservices"\n3. **Skills section** — Move it higher, add proficiency levels\n4. **Summary** — Add a 2-line professional summary\n\n🎯 **ATS Score:** 72/100 → Target: 85+\n\n*Would you like me to generate an optimized version?*`,
  'salary': `💰 **Salary Prediction for Your Profile:**\n\nBased on your skills, experience, and location:\n\n📊 **Estimated Range:** ₹15L - ₹24L/year\n\n**Breakdown:**\n• Base: ₹12L - ₹18L\n• Bonus: ₹2L - ₹4L\n• Stock/ESOP: ₹1L - ₹2L\n\n📈 **Market Comparison:**\n• Bangalore avg: ₹18L\n• Coimbatore avg: ₹14L\n• Remote avg: ₹20L\n\n*Tip: Highlighting React + TypeScript can increase offers by 15%*`,
  'skills': `🎯 **Recommended Skills to Learn:**\n\n**High Priority (trending in your field):**\n1. ⚡ **TypeScript** — 92% of new React jobs require it\n2. 🐳 **Docker + K8s** — Essential for senior roles\n3. ☁️ **AWS/GCP** — Cloud skills = +20% salary\n\n**Medium Priority:**\n4. 🤖 **LLM/AI Integration** — Rapidly growing demand\n5. 📊 **System Design** — Required for L5+ interviews\n\n**Suggested Courses:**\n• Frontend Masters: Advanced TypeScript\n• Udemy: Docker & Kubernetes Complete\n• AWS Certified Developer Associate\n\n*Focus on TypeScript first — highest ROI for your profile*`,
  'coimbatore': `📍 **Jobs Near Coimbatore:**\n\n🏙️ **Coimbatore Tech Hub — 1,240 active jobs**\n\n**Top Openings:**\n1. AI/ML Engineer — DataVerse AI — ₹15-25L\n2. Data Analyst — InsightPro — ₹8-14L\n3. Full-Stack Dev — CodeCraft — ₹12-20L\n\n📈 **Growth:** +25% YoY in tech jobs\n🏢 **Top Companies:** Zoho, Freshworks, Kovai.co\n\n**Nearby Cities:**\n• Chennai (500km) — 2,870 jobs\n• Bangalore (365km) — 5,420 jobs\n• Kochi (190km) — 890 jobs\n\n*Set Coimbatore as your preferred location for priority alerts!*`,
};

function matchResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('best job') || lower.includes('jobs for me')) return BOT_RESPONSES['best jobs'];
  if (lower.includes('resume') || lower.includes('improve')) return BOT_RESPONSES['improve resume'];
  if (lower.includes('salary') || lower.includes('expect') || lower.includes('pay')) return BOT_RESPONSES['salary'];
  if (lower.includes('skill') || lower.includes('learn')) return BOT_RESPONSES['skills'];
  if (lower.includes('coimbatore') || lower.includes('near')) return BOT_RESPONSES['coimbatore'];
  return `🤖 I can help you with:\n\n• Finding best-matched jobs\n• Resume analysis & improvement\n• Salary predictions\n• Skill recommendations\n• Location-based job search\n\nTry asking: *"What are the best jobs for me?"*`;
}

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '👋 Hi! I\'m your **AI Career Assistant**. I can help you find jobs, analyze your resume, predict salaries, and suggest career paths.\n\nWhat would you like to know?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = matchResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => { setIsOpen(true); setIsMinimized(false); }}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-lg hover:shadow-neon-cyan/30 transition-shadow group"
          >
            <Bot className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed z-50 right-6 glass-card overflow-hidden flex flex-col shadow-2xl ${
              isMinimized ? 'bottom-6 w-80 h-14' : 'bottom-6 w-96 h-[560px]'
            }`}
            style={{ maxHeight: 'calc(100vh - 100px)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-gradient-to-r from-neon-cyan/5 to-neon-purple/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Career Assistant</p>
                  <p className="text-[10px] text-neon-green flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        msg.role === 'assistant'
                          ? 'bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20'
                          : 'bg-white/10'
                      }`}>
                        {msg.role === 'assistant' ? (
                          <Sparkles className="w-3.5 h-3.5 text-neon-cyan" />
                        ) : (
                          <User className="w-3.5 h-3.5 text-foreground" />
                        )}
                      </div>
                      <div className={`max-w-[80%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                        msg.role === 'assistant'
                          ? 'bg-white/5 text-foreground'
                          : 'bg-neon-cyan/10 text-foreground'
                      }`}>
                        <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{
                          __html: msg.content
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        }} />
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <div className="flex gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-spin" />
                      </div>
                      <div className="bg-white/5 px-4 py-3 rounded-xl">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-neon-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <div className="w-2 h-2 bg-neon-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <div className="w-2 h-2 bg-neon-cyan/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Prompts */}
                {messages.length <= 2 && (
                  <div className="px-4 pb-2">
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => sendMessage(prompt.replace(/^[^\s]+\s/, ''))}
                          className="px-2.5 py-1 rounded-full bg-white/5 text-[11px] text-muted-foreground hover:text-neon-cyan hover:bg-neon-cyan/5 border border-white/5 hover:border-neon-cyan/20 transition-all"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-3 border-t border-white/5 shrink-0">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about jobs, resume, salary..."
                      className="flex-1 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm outline-none focus:border-neon-cyan/30 text-foreground placeholder:text-muted-foreground"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isTyping}
                      className="p-2.5 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple text-white disabled:opacity-50 hover:shadow-lg hover:shadow-neon-cyan/20 transition-all"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
