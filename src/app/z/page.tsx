'use client';

import React from 'react';
import HoverCard from '../components/HoverCard';
import {
  BoltIcon,
  CubeIcon,
  Battery100Icon,
  ClockIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  AdjustmentsHorizontalIcon,
  DevicePhoneMobileIcon,
  SpeakerWaveIcon,
  RocketLaunchIcon,
  WifiIcon,
  SparklesIcon,
  FireIcon,
  WrenchIcon,
  CloudIcon,
  SpeakerXMarkIcon,
  FunnelIcon,
  CogIcon,
  CurrencyDollarIcon,
  ArrowPathRoundedSquareIcon,
  GlobeAltIcon,
  SunIcon,
  MoonIcon,
  TagIcon,
  GlobeAmericasIcon,
  CheckIcon,
  XMarkIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Head from 'next/head';

// Error Boundary Component
interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-white text-black px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Data arrays - Updated with Ryft Z specifications
  const specs = [
    {
      icon: <BoltIcon className="h-8 w-8 text-white" />,
      label: "Peak Power",
      value: "80 HP"
    },
    {
      icon: <Battery100Icon className="h-8 w-8 text-white" />,
      label: "Battery System",
      value: "6.5 kWh"
    },
    {
      icon: <ClockIcon className="h-8 w-8 text-white" />,
      label: "Range",
      value: "6+ Hours"
    },
    {
      icon: <ChartBarIcon className="h-8 w-8 text-white" />,
      label: "Torque",
      value: "938 Nm"
    },
    {
      icon: <CubeIcon className="h-8 w-8 text-white" />,
      label: "Weight",
      value: "110 kg"
    },
    {
      icon: <Cog6ToothIcon className="h-8 w-8 text-white" />,
      label: "Motor RPM",
      value: "14,200"
    }
  ];

const features = [
  {
    icon: <BoltIcon className="h-6 w-6 text-white" />,
    title: "Revolutionary Torque",
    value: "938 Nm Instant",
          details: "The Ryft Z delivers unprecedented 938 Nm of torque instantly from zero RPM, creating acceleration that defies physics.",
          deepDetails: "Unlike traditional combustion engines that require RPM buildup, the Ryft Z's electric motor provides maximum torque immediately. This revolutionary power delivery creates an acceleration curve that's impossible with internal combustion engines, delivering explosive performance that redefines what's possible on two wheels.",
    extra: "100+ customizable power maps"
  },
  {
    icon: <WifiIcon className="h-6 w-6 text-white" />,
    title: "Advanced Telemetry",
    value: "Real-time Data",
    details: "Comprehensive monitoring system tracks every aspect of performance, from motor temperature to battery optimization.",
    deepDetails: "The Ryft Z features an advanced telemetry system that monitors motor temperature, battery health, power delivery, and riding dynamics in real-time. This data is processed through sophisticated algorithms to optimize performance and prevent issues before they occur, ensuring maximum reliability and performance.",
    extra: "Cloud-based performance analytics"
  },
  {
    icon: <ShieldCheckIcon className="h-6 w-6 text-white" />,
    title: "Zero Maintenance",
    value: "Sealed System",
    details: "The Ryft Z's sealed electric drivetrain eliminates traditional maintenance requirements completely.",
    deepDetails: "With no oil changes, spark plugs, air filters, or transmission maintenance required, the Ryft Z redefines motorcycle ownership. The sealed motor and single-speed transmission have no moving parts that wear out, while the smart battery management system ensures optimal performance with zero user intervention.",
    extra: "3-year comprehensive warranty"
  },
  {
    icon: <SpeakerWaveIcon className="h-6 w-6 text-white" />,
    title: "Silent Dominance",
    value: "Whisper Performance",
    details: "Experience the full spectrum of performance without the noise pollution of traditional motorcycles.",
    deepDetails: "The Ryft Z operates in complete silence, allowing riders to experience the pure thrill of performance while respecting noise restrictions and environmental concerns. This silent operation opens up new riding opportunities in areas where traditional motorcycles are restricted.",
    extra: "Customizable sound profiles"
  },
  {
    icon: <RocketLaunchIcon className="h-6 w-6 text-white" />,
    title: "Sustainable Performance",
    value: "Zero Emissions",
    details: "Maximum performance with zero environmental impact, powered by clean renewable energy sources.",
    deepDetails: "The Ryft Z produces zero tailpipe emissions while delivering performance that exceeds traditional motorcycles. This sustainable approach to high-performance riding allows enthusiasts to enjoy maximum thrills while contributing to environmental conservation.",
    extra: "Solar charging compatible"
  },
  {
    icon: <AdjustmentsHorizontalIcon className="h-6 w-6 text-white" />,
    title: "Infinite Customization",
    value: "100+ Maps",
    details: "The Ryft Z offers unprecedented customization with over 100 different power maps.",
    deepDetails: "Choose from over 100 pre-programmed power maps or create your own custom configurations. Adjust torque curves, throttle response, power delivery, and riding characteristics through an intuitive interface. Save multiple profiles for different riding conditions and share configurations with other riders.",
    extra: "Professional tuning support"
  }
];

export default function ZPage() {
  const [showCTA, setShowCTA] = useState(false);
  const [activeTab, setActiveTab] = useState('Smart App');
  const [selectedCard, setSelectedCard] = useState<{ type: 'spec' | 'feature'; index: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(6); // Total images to load
  const [darkMode, setDarkMode] = useState(true);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ type: 'user' | 'ai'; message: string; timestamp: Date }>>([
    { type: 'ai', message: "Hello! I'm Ryft AI, your personal assistant for all things Ryft Z. How can I help you today?", timestamp: new Date() }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Simulate loading with progressive image loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    const handleScroll = () => {
      setShowCTA(window.scrollY > 400);
      setShowBackToTop(window.scrollY > 800);
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && selectedCard) {
      handleCloseModal();
    }
  };

  const handleCardClick = (type: 'spec' | 'feature', index: number) => {
    setSelectedCard({ type, index });
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = { type: 'user' as const, message, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "The Ryft Z features 80 HP and 938 Nm of instant torque, making it the most powerful electric motorcycle available.",
        "The Ryft Z has a 6.5 kWh battery that provides 6+ hours of continuous riding or a full MX race.",
        "The Ryft Z requires virtually no maintenance compared to traditional motorcycles - no oil changes, spark plugs, or transmission maintenance.",
        "The Ryft Z comes with a comprehensive 3-year warranty covering the entire system.",
        "The Ryft Z offers over 100 pre-programmed power maps for customizable performance.",
        "The Ryft Z weighs only 110kg with 310mm suspension travel for unmatched control and agility.",
        "Charging the Ryft Z takes 1-2 hours with rapid charging capabilities.",
        "The Ryft Z is designed for professional motocross racing with its revolutionary electric performance."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const aiMessage = { type: 'ai' as const, message: randomResponse, timestamp: new Date() };
      setChatMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(chatInput);
    }
  };

  return (
    <ErrorBoundary>
      <Head>
        <title>Ryft Z - World's Most Powerful Electric Motorcycle</title>
        <meta name="description" content="Ryft Z is the world's most powerful electric motorcycle with 80HP, 938 Nm torque, and 14,200 RPM. Redefining what's possible on two wheels." />
        <meta name="keywords" content="Ryft Z, electric motorcycle, 80HP, 938 Nm torque, motocross, electric dominance, revolutionary performance" />
        <meta name="author" content="Ryft" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ryft" />
        <meta name="twitter:creator" content="@ryft" />
        <meta name="twitter:title" content="Ryft Z - Electric Motorcycle" />
        <meta name="twitter:description" content="Ryft Z is an electric motorcycle that combines 80HP of pure electric fury with precision, speed, and silence. Discover the future of motorcycling with Ryft." />
        <meta name="twitter:image" content="https://ryft.com/og-image.jpg" />
        <meta property="og:title" content="Ryft Z - Electric Motorcycle" />
        <meta property="og:description" content="Ryft Z is an electric motorcycle that combines 80HP of pure electric fury with precision, speed, and silence. Discover the future of motorcycling with Ryft." />
        <meta property="og:image" content="https://ryft.com/og-image.jpg" />
        <meta property="og:url" content="https://ryft.com/z" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className={`min-h-screen flex flex-col font-['Inter',system-ui,sans-serif] overflow-x-hidden transition-colors duration-300 ${
        darkMode 
          ? 'bg-black text-white' 
          : 'bg-white text-gray-900'
      }`}>
        <main className="flex-1 relative">
          {/* Navigation Bar */}
          <nav className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
            darkMode 
              ? 'bg-black/90 backdrop-blur-md border-b border-gray-800' 
              : 'bg-white/90 backdrop-blur-md border-b border-gray-200'
          }`}>
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    darkMode ? 'bg-gray-800' : 'bg-gray-100'
                  }`}>
                    <BoltIcon className={`w-6 h-6 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`} />
                  </div>
                  <span className={`text-xl font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>Ryft</span>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="hidden md:flex items-center space-x-8"
                >
                  <a href="#specs" className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-black hover:text-gray-700'
                  }`}>Specs</a>
                  <a href="#features" className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-black hover:text-gray-700'
                  }`}>Features</a>
                  <a href="#gallery" className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-black hover:text-gray-700'
                  }`}>Gallery</a>
                  <a href="#contact" className={`transition-colors ${
                    darkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-black hover:text-gray-700'
                  }`}>Contact</a>
                </motion.div>

                {/* CTA Button */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                    darkMode 
                      ? 'bg-white text-black hover:bg-gray-100' 
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  Buy Now
                </motion.button>
              </div>
            </div>
          </nav>

        {/* Enhanced Loading Screen with Progress */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-8"
                />
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold tracking-tight"
                >
                  Ryft Z
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-400 mt-4"
                >
                  Loading the future...
                </motion.p>
                
                {/* Loading Progress Bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="w-64 h-2 bg-gray-700 rounded-full mt-6 mx-auto overflow-hidden"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>



        {/* Enhanced Back to Top Button */}
        <AnimatePresence>
          {showBackToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-40 bg-white/10 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Back to top"
            >
              <ChevronUpIcon className="h-6 w-6" />
            </motion.button>
          )}
        </AnimatePresence>

      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20 z-0"
          src="/Hero.mp4"
        autoPlay
        loop
        muted
        playsInline
          aria-hidden="true"
        />
        
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
          <motion.div
            style={{
              y: scrollY * 0.5,
              opacity: 0.1
            }}
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl"
          />
          <motion.div
            style={{
              y: scrollY * -0.3,
              opacity: 0.08
            }}
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full blur-2xl"
          />
          <motion.div
            style={{
              y: scrollY * 0.7,
              opacity: 0.06
            }}
            className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-red-500 to-orange-600 rounded-full blur-3xl"
          />
        </div>

        <section 
          className={`relative z-10 min-h-screen flex flex-col justify-center items-center px-6 pt-24 text-center transition-colors duration-300 ${
            darkMode ? 'bg-black text-white' : 'bg-white text-black'
          }`} 
          role="banner" 
          aria-labelledby="hero-title"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h1
              id="hero-title"
              className={`text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter drop-shadow-2xl font-['JetBrains_Mono',monospace] mb-4 transition-colors duration-300 ${
                darkMode ? 'text-white' : 'text-black'
              }`}
              style={{
                color: darkMode ? '#ffffff' : '#000000',
                textShadow: darkMode 
                  ? '0 0 30px rgba(255,255,255,0.3)'
                  : '0 0 30px rgba(0,0,0,0.3)'
              }}
              whileHover={{
                scale: 1.02,
                textShadow: darkMode 
                  ? "0 0 30px rgba(255,255,255,0.8)"
                  : "0 0 30px rgba(31,41,55,0.8)",
                transition: { duration: 0.3 }
              }}
        >
          Ryft Z
        </motion.h1>
            <motion.p
              className={`text-xl md:text-2xl lg:text-3xl font-medium tracking-wide transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-black'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              The World's Most Powerful Electric Motorcycle
            </motion.p>
          </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
            className={`text-xl md:text-2xl lg:text-3xl mt-6 max-w-4xl drop-shadow-md font-light leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}
            whileHover={{
              color: darkMode ? "#ffffff" : "#000000",
              textShadow: darkMode ? "0 0 20px rgba(255,255,255,0.5)" : "0 0 20px rgba(0,0,0,0.3)",
              transition: { duration: 0.3 }
            }}
          >
            The world's most powerful electric motorcycle. 80 HP, 938 Nm torque, 14,200 RPM — redefining what's possible on two wheels.
        </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`mt-8 flex flex-wrap justify-center gap-6 text-sm md:text-base transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}
          >
            {[
              { icon: <BoltIcon className="h-4 w-4 mr-2 text-yellow-400" />, text: "80 HP Peak Power" },
              { icon: <Battery100Icon className="h-4 w-4 mr-2 text-green-400" />, text: "6.5 kWh Battery" },
              { icon: <ChartBarIcon className="h-4 w-4 mr-2 text-blue-400" />, text: "938 Nm Torque" },
              { icon: <CubeIcon className="h-4 w-4 mr-2 text-purple-400" />, text: "110 kg Weight" }
            ].map((item, index) => (
              <motion.span 
                key={index}
                className={`flex items-center ${darkMode ? 'text-white' : 'text-black'}`}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                {item.icon}
                <span className={darkMode ? 'text-white' : 'text-black'}>{item.text}</span>
              </motion.span>
            ))}
          </motion.div>
      </section>

      <SectionImage src="/section1.jpg" />

        <SectionWrapper title="Specifications" darkMode={darkMode}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                                 className={`relative group cursor-pointer transition-all duration-300 ${
                   darkMode 
                     ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50' 
                     : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
                 } p-8 rounded-2xl border shadow-2xl hover:shadow-gray-500/20`}
                onClick={() => handleCardClick('spec', i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick('spec', i);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${spec.label}`}
              >
                {/* Hover Message */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold shadow-2xl border-2 border-white">
                    Click for more info
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className={`p-3 rounded-xl mr-4 transition-colors duration-300 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {spec.icon}
                  </div>
                                     <h4 className={`text-3xl font-bold transition-colors duration-300 ${
                     darkMode ? 'text-white' : 'text-black'
                   }`}>{spec.label}</h4>
                </div>
                
                                 <div className={`text-4xl md:text-5xl font-semibold mb-4 transition-colors duration-300 ${
                   darkMode ? 'text-gray-300' : 'text-black'
                 }`}>
                   {spec.value}
                 </div>
            </motion.div>
          ))}
        </div>
      </SectionWrapper>

      <SectionImage src="/section2.jpg" />

        <SectionWrapper title="Top Features" darkMode={darkMode}>
        <div className={`grid md:grid-cols-2 gap-8 transition-colors duration-300 ${
          darkMode ? 'text-gray-300' : 'text-black'
        }`}>
          {features.map((feature, i) => (
              <div key={i} className="group relative">
            <motion.div
                  initial={{ scale: 1, borderRadius: '8px' }}
                  whileHover={{ 
                    scale: 1.05,
                    borderRadius: '12px',
                    transition: { 
                      duration: 0.3, 
                      ease: "easeOut"
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCardClick('feature', i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleCardClick('feature', i);
                    }
                  }}
                  className={`relative w-full h-48 cursor-pointer z-10 overflow-hidden p-6 rounded-lg shadow-lg border transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black ${
                    darkMode 
                      ? 'bg-gradient-to-br from-[#181818] to-[#0a0a0a] border-gray-800 hover:shadow-2xl' 
                      : 'bg-gradient-to-br from-gray-100 to-white border-gray-300 hover:shadow-2xl'
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${feature.title}: ${feature.value}`}
                >
                  <div className="flex items-center mb-4 space-x-3">
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                        darkMode ? 'bg-white/20' : 'bg-gray-900/20'
                      }`}></div>
                      <motion.div 
                        className="relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 5 }}
                      >
                        {feature.icon}
                      </motion.div>
              </div>
                    <motion.span 
                      className={`text-xl font-bold transition-colors duration-300 ${
                        darkMode ? 'text-white group-hover:text-gray-200' : 'text-black group-hover:text-gray-800'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature.title}
                    </motion.span>
                  </div>
                  <div className="mb-3">
                    <motion.p 
                      className={`text-2xl font-black transition-colors duration-300 tracking-tight mb-2 ${
                        darkMode ? 'text-gray-300 group-hover:text-white' : 'text-black group-hover:text-gray-800'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature.value}
                    </motion.p>
                    <motion.p 
                      className={`transition-colors duration-300 leading-relaxed ${
                        darkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-700 group-hover:text-gray-900'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      {feature.details}
                    </motion.p>
                  </div>
                  <div className={`absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300 ${
                    darkMode ? 'bg-gradient-to-t from-transparent to-black' : 'bg-gradient-to-t from-transparent to-gray-900'
                  }`}></div>
                  {/* Enhanced Hover Message */}
                <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                  >
                    <div className="bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-bold shadow-2xl border-2 border-white transform hover:scale-105 transition-transform duration-200">
                      CLICK FOR MORE INFO
                    </div>
                </motion.div>
            </motion.div>
              </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionImage src="/section3.jpg" />

        <SectionWrapper title="Smart App & Warranty" darkMode={darkMode}>
          <div className="flex flex-col items-center justify-center w-full">
            {/* Enhanced Tab Navigation */}
            <div className="flex space-x-4 mb-12">
              {['Smart App', 'Warranty & Maintenance'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    activeTab === tab 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/50' 
                      : darkMode
                        ? 'bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 hover:from-gray-700 hover:to-gray-800'
                        : 'bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 hover:from-gray-300 hover:to-gray-400'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>

            {/* Enhanced Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full max-w-7xl"
            >
              {activeTab === 'Smart App' && (
                <div className="space-y-12">
                  {/* Hero Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                  >
                    <div className="relative inline-block mb-6">
                      <div className={`absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse transition-colors duration-300 ${
                        darkMode ? 'bg-white/10' : 'bg-gray-900/10'
                      }`}></div>
                      <DevicePhoneMobileIcon className={`relative h-20 w-20 mx-auto transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`} />
                    </div>
                    <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}>
                      The Ryft Smart App
                      <span className={`inline-block ml-4 px-4 py-2 text-sm font-semibold rounded-full ${
                        darkMode 
                          ? 'bg-blue-600 text-white border border-blue-400' 
                          : 'bg-blue-100 text-blue-800 border border-blue-300'
                      }`}>
                        Coming Soon
                      </span>
                    </h3>
                    <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Your bike's digital brain. Seamlessly sync with your Ryft Z to unlock unprecedented control, 
                      real-time insights, and personalized performance tuning. <span className="font-semibold text-blue-500">Available in 2026.</span>
                    </p>
                  </motion.div>

                  {/* Feature Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        icon: <AdjustmentsHorizontalIcon className="h-8 w-8" />,
                        title: "Performance Tuning",
                        description: "Fine-tune torque curves, throttle response, and regenerative braking for your riding style.",
                        value: "Custom Maps"
                      },
                      {
                        icon: <ChartBarIcon className="h-8 w-8" />,
                        title: "Real-time Analytics",
                        description: "Monitor battery health, motor temperature, and performance metrics in real-time.",
                        value: "Live Data"
                      },
                      {
                        icon: <WifiIcon className="h-8 w-8" />,
                        title: "Over-the-Air Updates",
                        description: "Receive firmware updates and new features automatically without visiting a dealer.",
                        value: "Auto Updates"
                      },
                      {
                        icon: <ShieldCheckIcon className="h-8 w-8" />,
                        title: "Security & Tracking",
                        description: "GPS tracking, geofencing, and anti-theft features to keep your bike safe.",
                        value: "GPS Lock"
                      }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={`p-8 rounded-2xl border transition-all duration-300 shadow-xl hover:shadow-2xl ${
                          darkMode
                            ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-gray-600'
                            : 'bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="flex items-center mb-6">
                          <div className={`p-3 rounded-xl mr-4 transition-colors duration-300 ${
                            darkMode ? 'bg-gray-700' : 'bg-gray-200'
                          }`}>
                            {feature.icon}
                          </div>
                          <h4 className={`text-2xl font-bold transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-black'
                          }`}>{feature.title}</h4>
                        </div>

                        <div className={`text-3xl font-semibold mb-4 transition-colors duration-300 ${
                          darkMode ? 'text-gray-300' : 'text-black'
                        }`}>
                          {feature.value}
                        </div>

                        <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{feature.description}</p>
                      </motion.div>
          ))}
        </div>

                  {/* Advanced Features */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="relative overflow-hidden"
                  >
                    {/* Background Glow Effect */}
                    <div className={`absolute inset-0 rounded-3xl blur-xl transition-colors duration-300 ${
                      darkMode 
                        ? 'bg-gradient-to-r from-gray-900/50 via-gray-800/30 to-gray-900/50' 
                        : 'bg-gradient-to-r from-gray-100/50 via-gray-200/30 to-gray-100/50'
                    }`}></div>
                    
                    {/* Main Container */}
                    <div className={`relative p-10 rounded-3xl border shadow-2xl backdrop-blur-sm transition-colors duration-300 ${
                      darkMode
                        ? 'bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 border-gray-700/50'
                        : 'bg-gradient-to-br from-white/80 via-gray-50/60 to-white/80 border-gray-300/50'
                    }`}>
                      {/* Header Section */}
                      <div className="text-center mb-10">
                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-colors duration-300 ${
                          darkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
                        }`}>
                          <SparklesIcon className={`h-8 w-8 transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-gray-700'
                          }`} />
                        </div>
                        <h4 className={`text-4xl font-black mb-3 tracking-tight transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>Advanced Features</h4>
                        <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          Revolutionary technology that sets the Ryft Z apart from any motorcycle ever built
                        </p>
                      </div>

                      {/* Features Grid */}
                      <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                          <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
                            darkMode
                              ? 'bg-black/20 border-gray-600/30 hover:border-gray-500/50'
                              : 'bg-white/50 border-gray-300/50 hover:border-gray-400/50'
                          }`}>
                            <div className="flex items-start space-x-4">
                              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 ${
                                darkMode ? 'bg-white' : 'bg-gray-700'
                              }`}></div>
                              <div>
                                <h5 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                  darkMode ? 'text-white group-hover:text-gray-200' : 'text-black group-hover:text-gray-800'
                                }`}>100+ Power Maps</h5>
                                <p className={`text-base leading-relaxed transition-colors duration-300 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Choose from over 100 pre-programmed power maps or create custom configurations for any riding condition</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
                            darkMode
                              ? 'bg-black/20 border-gray-600/30 hover:border-gray-500/50'
                              : 'bg-white/50 border-gray-300/50 hover:border-gray-400/50'
                          }`}>
                            <div className="flex items-start space-x-4">
                              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 ${
                                darkMode ? 'bg-white' : 'bg-gray-700'
                              }`}></div>
                              <div>
                                <h5 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                  darkMode ? 'text-white group-hover:text-gray-200' : 'text-black group-hover:text-gray-800'
                                }`}>Advanced Thermal Management</h5>
                                <p className={`text-base leading-relaxed transition-colors duration-300 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Sophisticated cooling system ensures optimal performance even under extreme conditions</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
                            darkMode
                              ? 'bg-black/20 border-gray-600/30 hover:border-gray-500/50'
                              : 'bg-white/50 border-gray-300/50 hover:border-gray-400/50'
                          }`}>
                            <div className="flex items-start space-x-4">
                              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 ${
                                darkMode ? 'bg-white' : 'bg-gray-700'
                              }`}></div>
                              <div>
                                <h5 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                  darkMode ? 'text-white group-hover:text-gray-200' : 'text-black group-hover:text-gray-800'
                                }`}>Professional Telemetry</h5>
                                <p className={`text-base leading-relaxed transition-colors duration-300 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Real-time monitoring of motor temperature, battery health, and performance metrics</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
                            darkMode
                              ? 'bg-black/20 border-gray-600/30 hover:border-gray-500/50'
                              : 'bg-white/50 border-gray-300/50 hover:border-gray-400/50'
                          }`}>
                            <div className="flex items-start space-x-4">
                              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 ${
                                darkMode ? 'bg-white' : 'bg-gray-700'
                              }`}></div>
                              <div>
                                <h5 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                  darkMode ? 'text-white group-hover:text-gray-200' : 'text-black group-hover:text-gray-800'
                                }`}>310mm Suspension Travel</h5>
                                <p className={`text-base leading-relaxed transition-colors duration-300 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Professional-grade suspension with 310mm travel front and rear for ultimate control</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
                            darkMode
                              ? 'bg-black/20 border-gray-600/30 hover:border-gray-500/50'
                              : 'bg-white/50 border-gray-300/50 hover:border-gray-400/50'
                          }`}>
                            <div className="flex items-start space-x-4">
                              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 ${
                                darkMode ? 'bg-white' : 'bg-gray-700'
                              }`}></div>
                              <div>
                                <h5 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                  darkMode ? 'text-white group-hover:text-gray-200' : 'text-black group-hover:text-gray-800'
                                }`}>Chromoly Steel Frame</h5>
                                <p className={`text-base leading-relaxed transition-colors duration-300 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Ultra-lightweight 6kg Chromoly steel frame providing perfect balance of strength and agility</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className={`p-6 rounded-2xl border transition-all duration-300 group ${
                            darkMode
                              ? 'bg-black/20 border-gray-600/30 hover:border-gray-500/50'
                              : 'bg-white/50 border-gray-300/50 hover:border-gray-400/50'
                          }`}>
                            <div className="flex items-start space-x-4">
                              <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 ${
                                darkMode ? 'bg-white' : 'bg-gray-700'
                              }`}></div>
                              <div>
                                <h5 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                                  darkMode ? 'text-white group-hover:text-gray-200' : 'text-black group-hover:text-gray-800'
                                }`}>Fully Adjustable Modes</h5>
                                <p className={`text-base leading-relaxed transition-colors duration-300 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>Completely customizable ride modes for any terrain, from track to trail</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === 'Warranty & Maintenance' && (
                <div className="space-y-12">
                  {/* Hero Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center mb-12"
                  >
                    <div className="relative inline-block mb-6">
                      <div className={`absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse transition-colors duration-300 ${
                        darkMode ? 'bg-white/10' : 'bg-gray-900/10'
                      }`}></div>
                      <ShieldCheckIcon className={`relative h-20 w-20 mx-auto transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`} />
                    </div>
                    <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}>
                      Comprehensive Protection
                    </h3>
                    <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Ride with confidence knowing your Ryft Z is backed by industry-leading warranty coverage 
                      and virtually maintenance-free operation.
                    </p>
                  </motion.div>

                  {/* Warranty & Maintenance Cards */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Warranty Card */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-8 rounded-2xl border shadow-2xl transition-colors duration-300 ${
                        darkMode
                          ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50'
                          : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-6">
                        <div className={`p-3 rounded-xl mr-4 transition-colors duration-300 ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <ShieldCheckIcon className="h-8 w-8 text-white" />
                        </div>
                        <h4 className={`text-3xl font-bold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>Warranty</h4>
                      </div>
                      
                      <div className="space-y-6">
                        <div className={`p-6 rounded-xl border transition-colors duration-300 ${
                          darkMode
                            ? 'bg-black/30 border-gray-600/30'
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          <h5 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-black'
                          }`}>Standard Coverage</h5>
                          <ul className={`space-y-2 transition-colors duration-300 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                              2-year comprehensive system warranty
                            </li>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                              Battery pack: 3-year coverage
                            </li>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                              Motor and electronics: 2-year coverage
                            </li>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                              Frame and structural components: 5-year coverage
                            </li>
                </ul>
              </div>

                        <div className={`p-6 rounded-xl border transition-colors duration-300 ${
                          darkMode
                            ? 'bg-black/30 border-gray-600/30'
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          <h5 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-black'
                          }`}>Extended Options</h5>
                          <ul className={`space-y-2 transition-colors duration-300 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                              Extended 3-year comprehensive warranty
                            </li>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                              Roadside assistance and towing
                            </li>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-green-400 mr-2" />
                              Loaner bike during service
                            </li>
                </ul>
              </div>
                      </div>
                    </motion.div>

                    {/* Maintenance Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-8 rounded-2xl border shadow-2xl transition-colors duration-300 ${
                        darkMode
                          ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50'
                          : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex items-center mb-6">
                        <div className={`p-3 rounded-xl mr-4 transition-colors duration-300 ${
                          darkMode ? 'bg-gray-700' : 'bg-gray-200'
                        }`}>
                          <WrenchScrewdriverIcon className="h-8 w-8 text-white" />
                        </div>
                        <h4 className={`text-3xl font-bold transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>Maintenance</h4>
                      </div>

                      <div className="space-y-6">
                        <div className={`p-6 rounded-xl border transition-colors duration-300 ${
                          darkMode
                            ? 'bg-black/30 border-gray-600/30'
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          <h5 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-black'
                          }`}>What You DON'T Need</h5>
                          <ul className={`space-y-2 transition-colors duration-300 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <li className="flex items-center">
                              <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
                              Oil changes or engine rebuilds
                            </li>
                            <li className="flex items-center">
                              <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
                              Spark plug replacements
                            </li>
                            <li className="flex items-center">
                              <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
                              Air filter maintenance
                            </li>
                            <li className="flex items-center">
                              <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
                              Transmission fluid changes
                            </li>
                            <li className="flex items-center">
                              <XMarkIcon className="h-5 w-5 text-red-400 mr-2" />
                              Exhaust system repairs
                            </li>
                          </ul>
                        </div>

                        <div className={`p-6 rounded-xl border transition-colors duration-300 ${
                          darkMode
                            ? 'bg-black/30 border-gray-600/30'
                            : 'bg-gray-100 border-gray-300'
                        }`}>
                          <h5 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                            darkMode ? 'text-white' : 'text-black'
                          }`}>Minimal Maintenance</h5>
                          <ul className={`space-y-2 transition-colors duration-300 ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-blue-400 mr-2" />
                              Tire pressure checks
                            </li>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-blue-400 mr-2" />
                              Brake pad inspection
                            </li>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-blue-400 mr-2" />
                              Chain lubrication (if applicable)
                            </li>
                            <li className="flex items-center">
                              <CheckIcon className="h-5 w-5 text-blue-400 mr-2" />
                              Annual system diagnostics
                            </li>
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>


              </div>
            )}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Interactive Specs Comparison */}
      <SectionWrapper title="Performance Comparison" darkMode={darkMode}>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              Compare Performance
            </h3>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              See how the Ryft Z stacks up against traditional motorcycles and other electric bikes.
            </p>
          </motion.div>

          {/* Interactive Comparison Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-6xl mx-auto"
          >
            <div className={`p-8 rounded-2xl border shadow-2xl transition-colors duration-300 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50'
                : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
            }`}>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { metric: "0-60 MPH", gas: "4.5s", ryft: "3.2s", unit: "seconds", advantage: "28% faster" },
                  { metric: "Peak Torque", gas: "45 lb-ft", ryft: "120 lb-ft", unit: "torque", advantage: "20x more" },
                  { metric: "Weight", gas: "130 kg", ryft: "110 kg", unit: "dry weight", advantage: "15% lighter" },
                  { metric: "Maintenance", gas: "$800/yr", ryft: "$50/yr", unit: "average cost", advantage: "94% less" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-6 rounded-xl border transition-all duration-300 ${
                      darkMode
                        ? 'bg-black/30 border-gray-600/30 hover:border-gray-500/50'
                        : 'bg-white/50 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-sm mb-2 transition-colors duration-300 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{stat.metric}</div>
                      <div className="flex justify-center items-center space-x-4 mb-2">
                        <div className={`font-bold text-lg transition-colors duration-300 ${
                          darkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{stat.gas}</div>
                        <div className={`text-sm transition-colors duration-300 ${
                          darkMode ? 'text-gray-500' : 'text-gray-500'
                        }`}>vs</div>
                        <div className={`font-bold text-xl transition-colors duration-300 ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>{stat.ryft}</div>
                      </div>
                      <div className={`text-xs mb-2 transition-colors duration-300 ${
                        darkMode ? 'text-gray-500' : 'text-gray-500'
                      }`}>{stat.unit}</div>
                      <div className="text-green-400 text-sm font-semibold">{stat.advantage}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionImage src="/section4.jpg" />

      {/* Enhanced Technical Deep Dives */}
      <SectionWrapper title="Technical Specifications" darkMode={darkMode}>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              Engineering Excellence
            </h3>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Detailed technical specifications and engineering insights behind the Ryft Z's revolutionary performance.
            </p>
          </motion.div>

          {/* Expandable Technical Sections */}
          <div className="max-w-6xl mx-auto space-y-6">
            {[
              {
                title: "Motor & Drivetrain",
                icon: <Cog6ToothIcon className="h-6 w-6" />,
                summary: "Advanced electric motor with direct drive transmission",
                details: [
                  "Brushless DC motor with permanent magnets",
                  "Single-speed direct drive transmission",
                  "No clutch, no gear shifting required",
                  "Sealed motor housing for protection",
                  "Advanced thermal management system"
                ]
              },
              {
                title: "Battery & Power Management",
                icon: <Battery100Icon className="h-6 w-6" />,
                summary: "High-capacity lithium-ion battery with smart management",
                details: [
                  "6.5 kWh lithium-ion battery pack",
                  "Advanced battery management system (BMS)",
                  "Rapid charging capability (1-2 hours)",
                  "Thermal monitoring and protection",
                  "Over 1000 charge cycles"
                ]
              },
              {
                title: "Frame & Suspension",
                icon: <CubeIcon className="h-6 w-6" />,
                summary: "Ultra-lightweight Chromoly steel frame with professional suspension",
                details: [
                  "Chromoly steel frame (6kg total weight)",
                  "310mm suspension travel front and rear",
                  "Fully adjustable suspension settings",
                  "Professional-grade components",
                  "Optimized geometry for all terrain"
                ]
              }
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border shadow-2xl hover:shadow-gray-500/20 transition-all duration-300 ${
                  darkMode
                    ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50'
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg mr-4 transition-colors duration-300 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    {section.icon}
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-black'
                    }`}>{section.title}</h4>
                    <p className={`text-sm transition-colors duration-300 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>{section.summary}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {section.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-start space-x-3">
                      <CheckIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className={`text-sm transition-colors duration-300 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Gallery */}
      <SectionWrapper title="Gallery" darkMode={darkMode}>
        <div className="space-y-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <CubeIcon className={`relative h-20 w-20 mx-auto transition-colors duration-300 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`} />
            </div>
            <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              Visual Excellence
            </h3>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Experience the Ryft Z from every angle. Each image captures the perfect blend of power, precision, and revolutionary design.
            </p>
          </motion.div>

          {/* Enhanced Gallery Grid with Lightbox */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                src: "/gallery1.jpg",
                alt: "Ryft Z Front View",
                title: "Front View",
                description: "Aggressive stance with revolutionary power",
                specs: "80 HP • 938 Nm • 110 kg"
              },
              {
                src: "/gallery2.jpg",
                alt: "Ryft Z Side Profile",
                title: "Side Profile",
                description: "110kg lightweight design with 310mm suspension",
                specs: "310mm Travel • Chromoly Frame • 6.5 kWh"
              },
              {
                src: "/gallery3.jpg",
                alt: "Ryft Z Rear View",
                title: "Rear View",
                description: "938 Nm torque delivery system",
                specs: "Direct Drive • Zero Maintenance • 14,200 RPM"
              }
            ].map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative overflow-hidden rounded-2xl shadow-2xl border border-gray-700 cursor-pointer"
                onClick={() => {
                  // Lightbox functionality would go here
                  console.log(`Opening lightbox for ${image.title}`);
                }}
              >
                <div className="relative h-80 overflow-hidden">
                  <Image 
                    src={image.src} 
                    alt={image.alt} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h4 className="text-xl font-bold text-white mb-2">{image.title}</h4>
                      <p className="text-gray-300 text-sm mb-3">{image.description}</p>
                      <div className="text-yellow-400 text-xs font-mono">{image.specs}</div>
                    </div>
                  </div>
                  
                  {/* Enhanced Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Click to Expand Indicator */}
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to Expand
                  </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ryft Z
                </div>
              </motion.div>
            ))}
          </div>

          {/* Gallery Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-4 mt-8"
          >
            {[1, 2, 3].map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-3 h-3 bg-gray-600 rounded-full hover:bg-white transition-colors duration-200"
              />
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Testimonials */}
      <SectionWrapper title="Rider Experiences" darkMode={darkMode}>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              What Riders Say
            </h3>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Real experiences from riders who've embraced the electric revolution.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Jake Wilson",
                role: "Professional MX Racer",
                content: "The Ryft Z is revolutionary. 938 Nm of instant torque changes everything about motocross. I can accelerate out of corners like never before, and the 110kg weight makes it incredibly agile.",
                rating: 5
              },
              {
                name: "Emma Rodriguez",
                role: "Enduro Champion",
                content: "Six hours of continuous riding on a single charge is incredible. The 100+ power maps let me customize the bike for any terrain. It's like having a different motorcycle for every condition.",
                rating: 5
              },
              {
                name: "David Thompson",
                role: "Track Day Instructor",
                content: "The 80 HP and 14,200 RPM motor deliver performance that exceeds any production motorcycle. The silence is surreal - you can hear the suspension working, the tires gripping. It's pure riding.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`p-8 rounded-2xl border shadow-2xl transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
                }`}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <BoltIcon key={i} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>
                <p className={`mb-6 italic leading-relaxed transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>"{testimonial.content}"</p>
                <div>
                  <div className={`font-semibold transition-colors duration-300 ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}>{testimonial.name}</div>
                  <div className={`text-sm transition-colors duration-300 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper title="Frequently Asked Questions" darkMode={darkMode}>
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h3 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-300 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              Common Questions
            </h3>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Everything you need to know about the Ryft Z electric motorcycle.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              {
                question: "How does the Ryft Z compare to traditional MX bikes?",
                answer: "The Ryft Z revolutionizes motocross with 80 HP and 938 Nm of instant torque, exceeding any production motorcycle. Unlike traditional bikes that require RPM buildup, the Ryft Z delivers maximum power immediately, creating acceleration that defies physics. The 110kg weight and 310mm suspension travel provide unmatched control and agility."
              },
              {
                question: "What's the charging time and range of the Ryft Z?",
                answer: "The Ryft Z features a 6.5 kWh battery that provides 6+ hours of continuous riding or a full MX race. Charging takes 1-2 hours with rapid charging capabilities. The intelligent battery management system optimizes power delivery based on riding conditions and terrain for maximum efficiency."
              },
              {
                question: "How many power maps does the Ryft Z have?",
                answer: "The Ryft Z offers over 100 pre-programmed power maps, allowing riders to customize torque curves, throttle response, and power delivery for any riding condition. You can create custom configurations and save multiple profiles for different terrains, from track to trail riding."
              },
              {
                question: "What maintenance is required for the Ryft Z?",
                answer: "The Ryft Z requires virtually no maintenance compared to traditional motorcycles. No oil changes, spark plugs, air filters, or transmission maintenance. The sealed electric motor and single-speed transmission have no moving parts that wear out, while smart diagnostics prevent issues before they occur."
              },
              {
                question: "Is the Ryft Z suitable for professional racing?",
                answer: "Absolutely. The Ryft Z is designed for professional motocross racing with its 80 HP output, 938 Nm torque, and 14,200 RPM motor. The 110kg weight, 310mm suspension travel, and Chromoly steel frame provide the performance and durability required for competitive racing at the highest levels."
              },
              {
                question: "What's included in the Ryft Z warranty?",
                answer: "The Ryft Z comes with a comprehensive 3-year warranty covering the entire system, with extended coverage for the battery pack and frame. The sealed electric drivetrain and advanced diagnostics ensure maximum reliability and minimal maintenance requirements."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`p-6 rounded-xl border shadow-xl transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/30 border-gray-700/50' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
                }`}
              >
                <h4 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-black'
                }`}>{faq.question}</h4>
                <p className={`leading-relaxed transition-colors duration-300 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>



      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Particle System Background */}
            <div className="absolute inset-0" aria-hidden="true">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: [0, 1, 0],
                    scale: [0, Math.random() * 2 + 1, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 15 + 12, // Much slower: 12-27 seconds instead of 8-18
                    repeat: Infinity,
                    delay: Math.random() * 8 // Longer delays: 0-8 seconds instead of 0-5
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.8)'
                  }}
                />
              ))}
            </div>

            {/* Light Trails */}
            <div className="absolute inset-0" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: -100,
                    y: Math.random() * window.innerHeight,
                    opacity: 0
                  }}
                  animate={{ 
                    x: window.innerWidth + 100,
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: 12, // Much slower: 12 seconds instead of 4
                    repeat: Infinity,
                    delay: i * 1.5, // Longer delays: 1.5s intervals instead of 1.0s
                    ease: "linear"
                  }}
                  className="absolute w-2 h-32 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                  style={{
                    filter: 'blur(2px)',
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              onClick={handleCloseModal}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleCloseModal();
                }
              }}
              className="absolute top-8 right-8 z-[110] bg-gradient-to-r from-white to-gray-200 text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 30px rgba(255,255,255,0.5)"
              }}
              aria-label="Close modal"
            >
              ✕
            </motion.button>

            {/* Modal Content with Enhanced Effects */}
            <motion.div
              initial={{ scale: 0.1, borderRadius: '50%', rotate: 180 }}
              animate={{ 
                scale: 1, 
                borderRadius: '0%', 
                rotate: 0
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              exit={{ 
                scale: 0.1, 
                borderRadius: '50%', 
                rotate: -180,
                transition: { 
                  duration: 3.0, // Much slower: 3.0 seconds instead of 2.0
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              className="w-full h-full bg-gradient-radial from-black via-[#000000ee] to-black flex items-center justify-center p-8 relative"
            >
              {/* Enhanced Gradient Layers */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-90" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black opacity-80" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" aria-hidden="true"></div>
              
              {/* Animated Light Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 0.8, 1.1, 1],
                    opacity: [0, 0.3, 0.1, 0.2, 0.1]
                  }}
                  transition={{ 
                    duration: 8, // Much slower: 8 seconds instead of 3
                    repeat: Infinity,
                    delay: i * 1.5 // Longer delays: 1.5s intervals instead of 0.5s
                  }}
                  className="absolute inset-0 border border-white rounded-full"
                  style={{
                    filter: 'blur(3px)',
                    transform: `scale(${1 + i * 0.3})`
                  }}
                  aria-hidden="true"
                />
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3, y: -100 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="relative z-10 max-w-5xl mx-auto text-center"
              >
                {selectedCard.type === 'spec' && (
                  <div className="space-y-10">
                    {/* Icon with Glow Effect */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
                      className="flex justify-center"
                      aria-hidden="true"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative z-10 scale-150">
                          {specs[selectedCard.index].icon}
                        </div>
                      </div>
                    </motion.div>

                    {/* Title with Typing Effect */}
                    <motion.h1
                      id="modal-title"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30, scale: 0.8 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      className="text-7xl md:text-8xl font-bold text-white drop-shadow-2xl"
                      style={{
                        textShadow: '0 0 30px rgba(255,255,255,0.5)',
                        background: 'linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradient 3s ease infinite'
                      }}
                    >
                      {specs[selectedCard.index].label}
                    </motion.h1>

                    {/* Value with Glow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      className="text-4xl md:text-5xl font-semibold text-gray-300 mb-10"
                      style={{
                        textShadow: '0 0 20px rgba(156, 163, 175, 0.8)'
                      }}
                    >
                      {specs[selectedCard.index].value}
                    </motion.div>


              </div>
            )}

                {selectedCard.type === 'feature' && (
                  <div className="space-y-10">
                    {/* Icon with Enhanced Glow */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
                      className="flex justify-center"
                      aria-hidden="true"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative z-10 scale-150">
                          {features[selectedCard.index].icon}
                        </div>
                      </div>
                    </motion.div>

                    {/* Title with Enhanced Effects */}
                    <motion.h1
                      id="modal-title"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30, scale: 0.8 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      className="text-7xl md:text-8xl font-bold text-white drop-shadow-2xl"
                      style={{
                        textShadow: '0 0 30px rgba(255,255,255,0.5)',
                        background: 'linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradient 3s ease infinite'
                      }}
                    >
                      {features[selectedCard.index].title}
                    </motion.h1>

                    {/* Value with Glow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      className="text-3xl md:text-4xl font-semibold text-gray-300 mb-10"
                      style={{
                        textShadow: '0 0 20px rgba(156, 163, 175, 0.8)'
                      }}
                    >
                      {features[selectedCard.index].value}
                    </motion.div>

                    {/* Deep Details */}
                    <motion.p
                      id="modal-description"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30, scale: 0.9 }}
                      transition={{ duration: 1.0, delay: 1.8 }}
                      className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-5xl mx-auto mb-10"
                      style={{
                        textShadow: '0 0 15px rgba(229, 231, 235, 0.3)'
                      }}
                    >
                      {features[selectedCard.index].deepDetails}
                    </motion.p>

                    {/* Extra Info with Glow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.8, delay: 2.0 }}
                      className="text-xl text-gray-400"
                      style={{
                        textShadow: '0 0 10px rgba(156, 163, 175, 0.5)'
                      }}
                    >
                      {features[selectedCard.index].extra}
          </motion.div>
        </div>
                )}
              </motion.div>
              
              {/* Additional Enhanced Layers */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40" aria-hidden="true"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Particle System Background */}
            <div className="absolute inset-0" aria-hidden="true">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                    scale: 0
                  }}
                  animate={{ 
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: [0, 1, 0],
                    scale: [0, Math.random() * 2 + 1, 0]
                  }}
                  transition={{ 
                    duration: Math.random() * 15 + 12, // Much slower: 12-27 seconds instead of 8-18
                    repeat: Infinity,
                    delay: Math.random() * 8 // Longer delays: 0-8 seconds instead of 0-5
                  }}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    filter: 'blur(1px)',
                    boxShadow: '0 0 10px rgba(255,255,255,0.8)'
                  }}
                />
              ))}
            </div>

            {/* Light Trails */}
            <div className="absolute inset-0" aria-hidden="true">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: -100,
                    y: Math.random() * window.innerHeight,
                    opacity: 0
                  }}
                  animate={{ 
                    x: window.innerWidth + 100,
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{ 
                    duration: 12, // Much slower: 12 seconds instead of 4
                    repeat: Infinity,
                    delay: i * 1.5, // Longer delays: 1.5s intervals instead of 1.0s
                    ease: "linear"
                  }}
                  className="absolute w-2 h-32 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"
                  style={{
                    filter: 'blur(2px)',
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
              onClick={handleCloseModal}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleCloseModal();
                }
              }}
              className="absolute top-8 right-8 z-[110] bg-gradient-to-r from-white to-gray-200 text-black w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 30px rgba(255,255,255,0.5)"
              }}
              aria-label="Close modal"
            >
              ✕
            </motion.button>

            {/* Modal Content with Enhanced Effects */}
            <motion.div
              initial={{ scale: 0.1, borderRadius: '50%', rotate: 180 }}
              animate={{ 
                scale: 1, 
                borderRadius: '0%', 
                rotate: 0
              }}
              transition={{ 
                duration: 1.5, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              exit={{ 
                scale: 0.1, 
                borderRadius: '50%', 
                rotate: -180,
                transition: { 
                  duration: 3.0, // Much slower: 3.0 seconds instead of 2.0
                  ease: [0.25, 0.46, 0.45, 0.94]
                }
              }}
              className="w-full h-full bg-gradient-radial from-black via-[#000000ee] to-black flex items-center justify-center p-8 relative"
            >
              {/* Enhanced Gradient Layers */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-90" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-black opacity-80" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" aria-hidden="true"></div>
              
              {/* Animated Light Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 0.8, 1.1, 1],
                    opacity: [0, 0.3, 0.1, 0.2, 0.1]
                  }}
                  transition={{ 
                    duration: 8, // Much slower: 8 seconds instead of 3
                    repeat: Infinity,
                    delay: i * 1.5 // Longer delays: 1.5s intervals instead of 0.5s
                  }}
                  className="absolute inset-0 border border-white rounded-full"
                  style={{
                    filter: 'blur(3px)',
                    transform: `scale(${1 + i * 0.3})`
                  }}
                  aria-hidden="true"
                />
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.3, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.3, y: -100 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="relative z-10 max-w-5xl mx-auto text-center"
              >
                {selectedCard.type === 'spec' && (
                  <div className="space-y-10">
                    {/* Icon with Glow Effect */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
                      className="flex justify-center"
                      aria-hidden="true"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative z-10 scale-150">
                          {specs[selectedCard.index].icon}
                        </div>
                      </div>
                    </motion.div>

                    {/* Title with Typing Effect */}
                    <motion.h1
                      id="modal-title"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30, scale: 0.8 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      className="text-7xl md:text-8xl font-bold text-white drop-shadow-2xl"
                      style={{
                        textShadow: '0 0 30px rgba(255,255,255,0.5)',
                        background: 'linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradient 3s ease infinite'
                      }}
                    >
                      {specs[selectedCard.index].label}
                    </motion.h1>

                    {/* Value with Glow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      className="text-4xl md:text-5xl font-semibold text-gray-300 mb-10"
                      style={{
                        textShadow: '0 0 20px rgba(156, 163, 175, 0.8)'
                      }}
                    >
                      {specs[selectedCard.index].value}
                    </motion.div>

                    
                  </div>
                )}

                {selectedCard.type === 'feature' && (
                  <div className="space-y-10">
                    {/* Icon with Enhanced Glow */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
                      className="flex justify-center"
                      aria-hidden="true"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative z-10 scale-150">
                          {features[selectedCard.index].icon}
                        </div>
                      </div>
                    </motion.div>

                    {/* Title with Enhanced Effects */}
                    <motion.h1
                      id="modal-title"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30, scale: 0.8 }}
                      transition={{ duration: 0.8, delay: 1.4 }}
                      className="text-7xl md:text-8xl font-bold text-white drop-shadow-2xl"
                      style={{
                        textShadow: '0 0 30px rgba(255,255,255,0.5)',
                        background: 'linear-gradient(45deg, #ffffff, #f0f0f0, #ffffff)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'gradient 3s ease infinite'
                      }}
                    >
                      {features[selectedCard.index].title}
                    </motion.h1>

                    {/* Value with Glow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.8 }}
                      transition={{ duration: 0.8, delay: 1.6 }}
                      className="text-3xl md:text-4xl font-semibold text-gray-300 mb-10"
                      style={{
                        textShadow: '0 0 20px rgba(156, 163, 175, 0.8)'
                      }}
                    >
                      {features[selectedCard.index].value}
                    </motion.div>

                    {/* Deep Details */}
        <motion.p
                      id="modal-description"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30, scale: 0.9 }}
                      transition={{ duration: 1.0, delay: 1.8 }}
                      className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-5xl mx-auto mb-10"
                      style={{
                        textShadow: '0 0 15px rgba(229, 231, 235, 0.3)'
                      }}
                    >
                      {features[selectedCard.index].deepDetails}
        </motion.p>

                    {/* Extra Info with Glow */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      transition={{ duration: 0.8, delay: 2.0 }}
                      className="text-xl text-gray-400"
                      style={{
                        textShadow: '0 0 10px rgba(156, 163, 175, 0.5)'
                      }}
                    >
                      {features[selectedCard.index].extra}
                    </motion.div>
        </div>
                )}
              </motion.div>
              
              {/* Additional Enhanced Layers */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-60" aria-hidden="true"></div>
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-40" aria-hidden="true"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-300 ${
          darkMode 
            ? 'bg-black/90 backdrop-blur-md border border-gray-800' 
            : 'bg-white/90 backdrop-blur-md border border-gray-200'
        }`}
      >
        <div className="flex items-center space-x-4 px-6 py-4 rounded-2xl shadow-2xl">
          {/* Light/Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? (
              <>
                <SunIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Light</span>
              </>
            ) : (
              <>
                <MoonIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Dark</span>
              </>
            )}
          </motion.button>

          {/* Ask a Question */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowChatbot(true)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Ask Question</span>
          </motion.button>

          {/* Buy Today */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/configurator'}
            className="flex items-center space-x-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 hover:from-blue-700 hover:to-purple-700 shadow-lg cursor-pointer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span className="text-sm font-medium">Buy Today</span>
          </motion.button>
        </div>
      </motion.div>

      {/* AI Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowChatbot(false)}
            />
            
            {/* Chatbot Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1 }}
              className={`relative w-full max-w-md h-[600px] rounded-2xl shadow-2xl overflow-hidden ${
                darkMode 
                  ? 'bg-gray-900 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-4 border-b ${
                darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-blue-600' : 'bg-blue-500'
                  }`}>
                    <BoltIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Ryft AI Assistant</h3>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Ask me anything about Ryft Z</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatbot(false)}
                  className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  <svg className={`w-5 h-5 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[480px]">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.type === 'user'
                        ? darkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-500 text-white'
                        : darkMode 
                          ? 'bg-gray-700 text-gray-200' 
                          : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user'
                          ? 'text-blue-100'
                          : darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}
              <div className={`p-4 border-t ${
                darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Ryft Z..."
                    className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button
                    onClick={() => handleSendMessage(chatInput)}
                    disabled={!chatInput.trim() || isTyping}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      chatInput.trim() && !isTyping
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : darkMode 
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>

      {/* Footer */}
      <footer className={`py-16 px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ryft</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Revolutionizing electric transportation with cutting-edge technology and sustainable design.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="/z" className="hover:text-white transition-colors">Ryft Z</a></li>
                <li><a href="/specs" className="hover:text-white transition-colors">Specifications</a></li>
                <li><a href="/cart" className="hover:text-white transition-colors">Shop</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/languages" className="hover:text-white transition-colors">Languages</a></li>
                <li><a href="/profile" className="hover:text-white transition-colors">Account</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t pt-8 text-center text-sm ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-600'}`}>
            <p>© 2024 Ryft. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </ErrorBoundary>
  );
}

// --------- Helper Components ---------

function SectionWrapper({ title, children, darkMode }: { title: string; children: React.ReactNode; darkMode: boolean }) {
  return (
    <section className={`relative z-10 py-20 px-6 md:px-20 text-center transition-colors duration-300 ${
      darkMode ? 'bg-[#0d0d0d] text-white' : 'bg-white text-black'
    }`}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
        className={`text-4xl font-bold mb-12 transition-colors duration-300 ${
          darkMode ? 'text-white' : 'text-black'
        }`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
      >
      {children}
      </motion.div>
    </section>
  );
}

function SectionImage({ src }: { src: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  return (
    <div className="w-full h-[300px] md:h-[500px] relative">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <CubeIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p>Image unavailable</p>
          </div>
        </div>
      )}
      <Image 
        src={src} 
        alt="Transition Image" 
        fill 
        className={`object-cover opacity-80 transition-opacity duration-500 ${imageLoaded ? 'opacity-80' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
        priority={false}
      />
    </div>
  );
}

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="overflow-hidden rounded-xl shadow-xl"
    >
      {!imageLoaded && !imageError && (
        <div className="w-full h-64 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      {imageError && (
        <div className="w-full h-64 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <CubeIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Image unavailable</p>
          </div>
        </div>
      )}
      <Image 
        src={src} 
        alt={alt} 
        width={600} 
        height={400} 
        className={`w-full h-auto object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </motion.div>
  );
}

// Performance optimization: Lazy load components
const LazySection = React.lazy(() => Promise.resolve({ 
  default: ({ children }: { children: React.ReactNode }) => <>{children}</> 
}));

// Enhanced scroll-triggered animations
const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
};


