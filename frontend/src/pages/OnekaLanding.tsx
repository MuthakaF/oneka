import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Terminal, FileText, Lock, Mail, Eye, EyeOff, Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import "./OnekaLanding.css";

const OnekaLogo = ({ className = "h-8", light = false }: { className?: string; light?: boolean }) => (
  <div className={`flex items-center gap-3 ${className} transition-all duration-300 group`}>
    <svg viewBox="0 0 100 100" className="h-full w-auto shrink-0 transition-transform group-hover:rotate-180 duration-700" fill="currentColor">
      <circle cx="50" cy="50" r="46" fill="none" stroke={light ? "#00FF94" : "currentColor"} strokeWidth="8" />
      <path d="M50 22 L82 75 L18 75 Z" fill={light ? "#00FF94" : "currentColor"} />
    </svg>
    <span className="text-2xl font-bold tracking-[0.15em] uppercase leading-none">
      Onek<span className={light ? "text-green-400" : "text-white"}>a</span>
    </span>
  </div>
);

// Authentication View with Signup and Login tabs
const AuthView = ({ onAuth, onBack }: { onAuth: () => void; onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    
    if (activeTab === 'signup') {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm password is required';
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        onAuth();
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="hero-glow opacity-30"></div>
      <div className="glass p-10 rounded-[3rem] w-full max-w-md border-white/10 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center mb-10">
          <OnekaLogo className="h-10 mb-4" light />
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">
            {activeTab === 'login' ? 'OAG Portal Access' : 'Create Account'}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button
            onClick={() => {
              setActiveTab('login');
              setErrors({});
            }}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors border-b-2 ${
              activeTab === 'login'
                ? 'border-green-400 text-white'
                : 'border-transparent text-zinc-500 hover:text-white'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => {
              setActiveTab('signup');
              setErrors({});
            }}
            className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-colors border-b-2 ${
              activeTab === 'signup'
                ? 'border-green-400 text-white'
                : 'border-transparent text-zinc-500 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {activeTab === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">Full Name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 px-4 text-sm focus:border-green-400 focus:outline-none transition-colors"
                placeholder="Your full name"
              />
              {errors.fullName && <p className="text-red-500 text-xs ml-4">{errors.fullName}</p>}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:border-green-400 focus:outline-none transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs ml-4">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:border-green-400 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs ml-4">{errors.password}</p>}
          </div>

          {activeTab === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-4">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-sm focus:border-green-400 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs ml-4">{errors.confirmPassword}</p>}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-400 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : activeTab === 'login' ? (
              <>Initiate Terminal Access</>
            ) : (
              <>Create Account</>
            )}
          </button>
        </form>

        <button
          onClick={onBack}
          className="w-full mt-8 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all"
        >
          ← Logout
        </button>

        <div className="mt-6 text-center">
          <p className="text-[9px] text-zinc-600 leading-relaxed">
            By accessing this system you agree to the Access to Information Act (2016) and Data Protection Act (2019) protocols.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Landing Page Component
export default function OnekaLanding({}: {}) {
  const [view, setView] = useState<'landing' | 'auth'>('landing');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`oneka-landing-root selection:bg-green-500/30 ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="scanline" />

      {view === 'landing' && (
        <>
          <nav className="fixed top-0 left-0 w-full z-50 py-6 px-6 glass border-b border-white/5 backdrop-blur-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <OnekaLogo className="h-8" />
              <div className="hidden md:flex items-center gap-8">
                <a href="#innovations" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition">Innovation</a>
                <a href="#impact" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition">Impact</a>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-zinc-700" />
                  )}
                </button>
                <button
                  onClick={() => setView('auth')}
                  className="bg-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-green-400 transition-all flex items-center gap-2 group shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  OAG Portal Access <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </nav>

          <main>
            <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20 overflow-hidden">
              <div className="hero-glow" />
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none grayscale contrast-125">
                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
              </div>

              <div className="relative z-10 max-w-5xl">
                <div className="flex justify-center mb-8">
                  <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">System Status: Operational</span>
                  </div>
                </div>

                <h1 className="text-5xl md:text-[7rem] font-black tracking-tighter mb-8 leading-[0.9] gradient-text italic">
                  Autonomous<br />Infrastructure Audit.
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                  Detecting "Ghost Projects" within 48 hours. Leveraging AI and Satellite Intelligence to safeguard Kenya's <span className="text-white font-medium">KES 750 Billion</span> annual infrastructure allocation.
                </p>

                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
                  <button
                    onClick={() => setView('auth')}
                    className="bg-white text-black px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center hover:bg-green-400 transition-all hover:scale-105 active:scale-95 group shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                  >
                    Launch Truth Engine <Terminal className="ml-3 w-4 h-4" />
                  </button>
                  <button className="glass px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest flex items-center justify-center hover:bg-white/10 transition group border-white/10">
                    Read Roadmap (v1.0) <FileText className="ml-3 w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-50">
                <div className="flex gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 animate-pulse">
                  <span>Scroll for Intelligence</span>
                  <span>↓</span>
                </div>
              </div>
            </section>

            <section id="impact" className="py-24 bg-black border-y border-white/5">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-4">The Problem Statement</h3>
                  <div className="text-2xl md:text-4xl font-bold text-white max-w-4xl mx-auto leading-tight">
                    <span className="text-red-500">30-40%</span> of infrastructure projects experience significant delays or exist only on paper.
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { label: "Annual Allocation", value: "KES 750B", sub: "At Risk" },
                    { label: "Audit Cycle", value: "48 Hours", sub: "Down from 24 Months" },
                    { label: "Cost Efficiency", value: "99%", sub: "Vs Traditional Audit" },
                    { label: "Target ROI", value: "130:1", sub: "Recovery Potential" }
                  ].map((stat, i) => (
                    <div key={i} className="p-8 glass rounded-3xl border-white/5 hover:border-white/20 transition group">
                      <div className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">{stat.label}</div>
                      <div className="text-4xl font-black font-mono text-white mb-2 group-hover:text-green-400 transition-colors">{stat.value}</div>
                      <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide">{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="innovations" className="py-40 bg-[#050505]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-20">
                  <div className="md:w-1/3">
                    <div className="sticky top-32">
                      <div className="inline-block px-3 py-1 rounded bg-green-500/10 border border-green-500/20 text-[9px] font-black text-green-400 uppercase tracking-[0.3em] mb-8">
                        Core Innovation
                      </div>
                      <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight">
                        Breakthrough<br />Capabilities.
                      </h2>
                      <p className="text-zinc-400 font-light leading-relaxed mb-8">
                        ONEKA AI consolidates fragmented government data to provide real-time project monitoring. We introduce three breakthrough capabilities to the Office of the Auditor General.
                      </p>
                      <div className="p-6 glass rounded-2xl border-l-4 border-green-500">
                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Target Partner</div>
                        <div className="flex items-center gap-3 text-white font-bold">
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h-6l3-7z" fill="currentColor" /></svg>
                          Kenya Office of the Auditor General (OAG)
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-12">
                    {[
                      {
                        title: "Interoperability Layer",
                        desc: "A concordance database unifying data from PPIP (Procurement), IFMIS (Finance), and KMHFL (Geolocation) using AI-powered entity resolution.",
                        icon: <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v18H3z" fill="currentColor" /></svg>
                      },
                      {
                        title: "Predictive Analytics",
                        desc: "Machine learning models trained on historical satellite archives (2020-2023) to predict project failures 12-18 months before traditional detection.",
                        icon: <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none"><path d="M12 3v18" stroke="currentColor" strokeWidth="2" /></svg>
                      },
                      {
                        title: "Satellite Verification",
                        desc: "Multi-layer analysis (Sentinel-1 SAR & Sentinel-2) providing immutable evidence of construction progress, penetrating cloud cover and smoke.",
                        icon: <svg className="w-6 h-6 text-green-400" viewBox="0 0 24 24" fill="none"><path d="M12 2l9 4-9 4-9-4 9-4z" fill="currentColor" /></svg>
                      }
                    ].map((item, i) => (
                      <div key={i} className="group relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
                        <div className="relative glass p-10 rounded-[2.5rem] border border-white/5 flex gap-8">
                          <div className="shrink-0 w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                            <p className="text-zinc-400 leading-relaxed font-light">{item.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <footer className="bg-black border-t border-white/5 pt-32 pb-12">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start mb-20">
                  <div className="mb-10 md:mb-0">
                    <OnekaLogo className="h-10 mb-8" />
                    <p className="text-zinc-500 max-w-sm font-light leading-relaxed text-sm">
                      Engineering radical transparency for the Republic of Kenya. Reactivating capital through autonomous geospatial auditing.
                    </p>
                  </div>
                  <div className="flex gap-12 md:gap-24">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">System</h4>
                      <ul className="space-y-4 text-xs text-zinc-500 font-bold">
                        <li><a href="#" className="hover:text-white transition">Dashboard</a></li>
                        <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                        <li><a href="#" className="hover:text-white transition">API Status</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-6">Legal</h4>
                      <ul className="space-y-4 text-xs text-zinc-500 font-bold">
                        <li><a href="#" className="hover:text-white transition">Article 229</a></li>
                        <li><a href="#" className="hover:text-white transition">Section 106B</a></li>
                        <li><a href="#" className="hover:text-white transition">Data Protection</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-700">
                  <p>© 2026 ONEKA AI DEVELOPMENT TEAM</p>
                  <p className="mt-4 md:mt-0">VERSION 1.0 (MVP)</p>
                </div>
              </div>
            </footer>
          </main>
        </>
      )}

      {view === 'auth' && <AuthView onAuth={() => navigate('/dashboard')} onBack={() => setView('landing')} />}
    </div>
  );
}
