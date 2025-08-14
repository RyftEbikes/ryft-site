'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, BoltIcon, PaperAirplaneIcon, XMarkIcon, LightBulbIcon, CogIcon, BookOpenIcon } from '@heroicons/react/24/outline';

interface ActionBarProps {
  darkMode?: boolean;
  onDarkModeToggle?: (darkMode: boolean) => void;
}

interface ChatMessage {
  type: 'user' | 'ai';
  message: string;
  timestamp: Date;
  quickActions?: string[];
}

export default function ActionBar({ darkMode = true, onDarkModeToggle }: ActionBarProps) {
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { 
      type: 'ai', 
      message: "Hello! I'm Ryft AI, your intelligent assistant powered by Google's Gemini AI. I can help you with ANYTHING - from Ryft products to science, history, math, creative writing, current events, technology, health, cooking, travel, and much more! What would you like to explore today?", 
      timestamp: new Date(),
      quickActions: ['Ryft Products', 'Ask Anything', 'Learn Something', 'Creative Help']
    },
    {
      type: 'ai',
      message: "🚀 Welcome to Ryft! I'm here to help you with absolutely anything you're curious about. Whether you want to know about our Ryft Z motorcycle, company story, or ask me about any topic under the sun - I'm your go-to AI assistant!\n\n💡 **What I can do**:\n• Ryft company & products\n• Science, math, history, philosophy\n• Creative writing & brainstorming\n• Current events & technology\n• Health, cooking, travel advice\n• Homework help & problem-solving\n• And much more!\n\nI'm powered by advanced AI to give you the best possible answers on any topic!",
      timestamp: new Date(),
      quickActions: ['Ryft Z Info', 'Company Story', 'Ask Anything', 'Learn Something']
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentContext, setCurrentContext] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // Enhanced AI responses with context awareness and generative capabilities
  const getAIResponse = async (userMessage: string, context: string): Promise<{ message: string; quickActions?: string[] }> => {
    const message = userMessage.toLowerCase();
    
    // Handle specific question patterns first
    if (message.includes('what does ryft stand for') || message.includes('what is ryft') || message.includes('ryft meaning')) {
      return {
        message: "Ryft stands for 'Revolutionary Youth For Tomorrow' - representing our mission as young innovators to create the future of electric transportation. The name reflects our commitment to revolutionizing mobility while being forward-thinking and youth-driven.",
        quickActions: ['Company Story', 'Our Mission', 'Founding Vision', 'Learn More']
      };
    }
    
    if (message.includes('pricing') || message.includes('price') || message.includes('cost')) {
      return {
        message: "The Ryft Z electric motorcycle pricing starts at $12,999 for the base model. We offer various financing options and packages:\n\n• Base Model: $12,999\n• Premium Package: $15,999\n• Ultimate Package: $18,999\n\nAll models include our standard warranty and roadside assistance. Would you like to discuss financing options or schedule a consultation?",
        quickActions: ['Financing Options', 'Schedule Consultation', 'Compare Models', 'Order Now']
      };
    }
    
    if (message.includes('ryft z details') || message.includes('specifications') || message.includes('specs')) {
      return {
        message: "The Ryft Z Electric Motorcycle - Complete Specifications:\n\n🚀 Performance:\n• 0-60 mph: 3.2 seconds\n• Top Speed: 120 mph\n• Range: 200+ miles\n• Power: 80 kW (107 hp)\n• Torque: 240 Nm\n\n🔋 Battery:\n• Capacity: 15.6 kWh\n• Type: Lithium-ion\n• Charge Time: 4-6 hours\n• Fast Charge: 80% in 2 hours\n\n⚡ Features:\n• Smart connectivity\n• GPS navigation\n• Mobile app control\n• LED lighting system\n• Regenerative braking",
        quickActions: ['Pricing', 'Test Ride', 'Order Now', 'Compare Models']
      };
    }
    
    if (message.includes('test ride') || message.includes('schedule') || message.includes('demo')) {
      return {
        message: "Great choice! You can schedule a test ride of the Ryft Z in several ways:\n\n• Call us: +1 (704) 349-7066\n• Email: testride@ryftebikes.com\n• Online booking: ryftebikes.com/testride\n\nWe offer test rides at our showroom and can also arrange mobile demos. What's your preferred date and time?",
        quickActions: ['Book Online', 'Call Now', 'Email Request', 'Showroom Location']
      };
    }
    
    if (message.includes('mission') || message.includes('vision') || message.includes('purpose') || message.includes('goal') || 
        message.includes('our mission') || message.includes('ryft mission')) {
      return {
        message: "Our Mission at Ryft is to revolutionize electric transportation and make sustainable mobility accessible to everyone. We believe in:\n\n🌱 **Sustainability**: Creating zero-emission vehicles that protect our planet\n🚀 **Innovation**: Pushing the boundaries of electric vehicle technology\n👥 **Accessibility**: Making premium electric vehicles affordable and available\n🌍 **Impact**: Building a cleaner, greener future for transportation\n\nAs young entrepreneurs, we're passionate about proving that age is no barrier to innovation and positive change.",
        quickActions: ['Our Story', 'Company Values', 'Sustainability Goals', 'Future Plans']
      };
    }
    
    if (message.includes('values') || message.includes('principles') || message.includes('ethics')) {
      return {
        message: "Our Core Values at Ryft:\n\n💡 **Innovation First**: We constantly push boundaries and think outside the box\n🤝 **Integrity**: Honest, transparent, and ethical in everything we do\n🌱 **Environmental Responsibility**: Committed to sustainability and reducing carbon footprint\n👥 **Community**: Building connections with our customers and the EV community\n🚀 **Excellence**: Striving for the highest quality in every product and service\n💪 **Youth Empowerment**: Proving that young people can create meaningful change",
        quickActions: ['Our Mission', 'Company Culture', 'Sustainability', 'Team Values']
      };
    }
    
    // Ryft-specific responses for company-related questions
    if (message.includes('ryft') || message.includes('company') || message.includes('bike') || message.includes('vehicle') || 
        message.includes('ceo') || message.includes('founder') || message.includes('who') || message.includes('team')) {
      
      if (message.includes('ceo') || message.includes('who') || message.includes('founder')) {
        return {
          message: "Siddharth Tumati is the CEO and Founder of Ryft! He's one of the two ambitious high school sophomores who founded Ryft in 2025 with a vision to revolutionize electric transportation. Along with Anish Meruva (CMO), they're building the future of sustainable mobility while still attending high school.",
          quickActions: ['More About Siddharth', 'Company Story', 'Team Info', 'Founding Vision']
        };
      }
      
      if (message.includes('ryft z') || message.includes('z model')) {
        return {
          message: "The Ryft Z is our flagship electric motorcycle featuring:\n\n• 0-60 mph in 3.2 seconds\n• 200+ mile range\n• Advanced battery technology\n• Smart connectivity features\n• Premium design and build quality\n\nWould you like to know more about specifications, pricing, or schedule a test ride?",
          quickActions: ['View Specs', 'Pricing', 'Test Ride', 'Order Now']
        };
      }
      
          if (message.includes('about') || message.includes('story') || message.includes('team')) {
      return {
        message: "Ryft was founded in 2025 by two ambitious high school sophomores with a vision to revolutionize electric transportation. We're committed to:\n\n• Innovation in electric vehicle technology\n• Sustainability and environmental protection\n• Quality and customer satisfaction\n• Building a community of EV enthusiasts\n\nLearn more about our journey at /about",
        quickActions: ['Our Story', 'Team', 'Mission', 'Values']
      };
    }
    
    if (message.includes('sustainability') || message.includes('environmental') || message.includes('green') || message.includes('eco')) {
      return {
        message: "Sustainability is at the heart of everything we do at Ryft! 🌱\n\n🌍 **Environmental Impact**: Our electric vehicles produce zero emissions, helping reduce air pollution and combat climate change\n🔋 **Clean Energy**: We're committed to using renewable energy sources in our manufacturing process\n♻️ **Recyclable Materials**: Our vehicles use sustainable, recyclable materials wherever possible\n🌱 **Carbon Footprint**: We actively work to minimize our environmental impact throughout the entire product lifecycle\n\nBy choosing Ryft, you're not just getting an amazing vehicle - you're helping build a cleaner future!",
        quickActions: ['Our Mission', 'Environmental Goals', 'Green Technology', 'Learn More']
      };
    }
    
    if (message.includes('competition') || message.includes('competitor') || message.includes('rival') || message.includes('vs') || message.includes('compare')) {
      return {
        message: "Great question about competition! In the electric motorcycle market, Ryft faces competition from several established players:\n\n🏍️ **Major Competitors**:\n• **Harley-Davidson LiveWire** - Premium electric cruiser ($22,799+)\n• **Zero Motorcycles** - Range-focused electric bikes ($11,795+)\n• **Energica** - High-performance Italian electric motorcycles ($23,600+)\n• **Lightning Motorcycles** - Speed-focused electric bikes ($38,888+)\n\n💡 **Ryft's Competitive Advantages**:\n• **Youth Innovation**: Fresh perspective from young entrepreneurs\n• **Affordable Pricing**: Starting at $12,999 vs competitors' $20k+\n• **Modern Design**: Contemporary aesthetics appealing to younger riders\n• **Smart Technology**: Advanced connectivity and AI features\n• **Sustainability Focus**: Strong environmental commitment\n\nWe're positioning ourselves as the accessible, innovative alternative to traditional premium electric motorcycles!",
        quickActions: ['Pricing Comparison', 'Feature Analysis', 'Market Position', 'Competitive Edge']
      };
    }
    
    if (message.includes('technology') || message.includes('tech') || message.includes('innovation') || message.includes('features')) {
      return {
        message: "Ryft is at the forefront of electric vehicle technology! 🚀\n\n⚡ **Advanced Battery Tech**: Our proprietary battery technology delivers longer range and faster charging\n🧠 **Smart Connectivity**: AI-powered systems that learn your riding habits and optimize performance\n🔋 **Fast Charging**: Get 80% charge in just 2 hours with our rapid charging system\n📱 **Mobile Integration**: Control your vehicle, monitor performance, and get real-time updates via our app\n🛡️ **Safety Features**: Advanced rider assistance systems and collision prevention technology\n\nWe're constantly innovating to bring you the best electric vehicle experience possible!",
        quickActions: ['Ryft Z Specs', 'Battery Technology', 'Smart Features', 'Future Tech']
      };
    }
      
      if (message.includes('support') || message.includes('help') || message.includes('contact')) {
        return {
          message: "I'm here to help! For Ryft support, you can:\n\n• Contact our support team at support@ryftebikes.com\n• Call us at +1 (704) 349-7066\n• Check our FAQ section\n• Schedule a service appointment\n\nWhat specific issue are you experiencing?",
          quickActions: ['Contact Support', 'FAQ', 'Service', 'Warranty']
        };
      }
      
      // General Ryft company info
      return {
        message: "Ryft is an innovative electric vehicle company founded in 2025 by two high school sophomores: Siddharth Tumati (CEO) and Anish Meruva (CMO). We're revolutionizing electric transportation with cutting-edge technology, sustainable design, and exceptional performance. Our flagship product is the Ryft Z electric motorcycle.",
        quickActions: ['About Our Team', 'Ryft Z Details', 'Company Mission', 'Contact Us']
      };
    }

    // For all other questions, use real AI service (Gemini) or enhanced local responses
    try {
      setIsGenerating(true);
      
      // Create a context-aware prompt for the AI
      const systemPrompt = `You are Ryft AI, an intelligent and helpful assistant powered by Google's Gemini AI. You have knowledge about Ryft (an electric vehicle company founded in 2025 by high school sophomores) but can also help with ANY topic - from science and math to history, philosophy, creative writing, current events, technology, health, cooking, travel, and more. Be conversational, helpful, and provide detailed, accurate responses. If the question is about Ryft, incorporate that knowledge. If it's about something else, provide a comprehensive, helpful response while maintaining your friendly Ryft AI personality. You can handle any subject matter with expertise and enthusiasm. Keep responses informative and engaging.`;
      
      const userPrompt = `User question: "${userMessage}"\n\nPlease provide a helpful, detailed response on this topic.`;
      
      // Use Gemini AI service
      const response = await generateGeminiResponse(systemPrompt, userPrompt);
      
      // Generate relevant quick actions based on the response
      const quickActions = generateQuickActions(userMessage, response);
      
      return {
        message: response,
        quickActions: quickActions
      };
      
    } catch (error) {
      console.error('AI generation error:', error);
      
      // Enhanced fallback responses for any topic
      return getEnhancedFallbackResponse(userMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to generate AI response using Google Gemini API
  const generateGeminiResponse = async (systemPrompt: string, userPrompt: string): Promise<string> => {
    try {
      // Replace with your actual Gemini API key and endpoint
      const GEMINI_API_KEY = 'AIzaSyD0yM6mw_PYMj4tr-XhzsqZLcs5G9X7bPM';
      const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
      
      const requestBody = {
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nUser: ${userPrompt}\n\nAssistant:`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        }
      };

      console.log('Making Gemini API call to:', GEMINI_API_URL);
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response body:', errorText);
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
      
    } catch (error) {
      console.error('Gemini API error:', error);
      
      // Fallback to enhanced local responses if API fails
      return generateLocalResponse(userPrompt);
    }
  };

  // Enhanced local response generation as fallback - now handles ANY topic intelligently
  const generateLocalResponse = (userPrompt: string): string => {
    const question = userPrompt.toLowerCase();
    
    // Handle competition questions specifically
    if (question.includes('competition') || question.includes('competitor') || question.includes('rival')) {
      return "Great question about competition! In the electric motorcycle market, Ryft faces competition from several established players:\n\n🏍️ **Major Competitors**:\n• **Harley-Davidson LiveWire** - Premium electric cruiser ($22,799+)\n• **Zero Motorcycles** - Range-focused electric bikes ($11,795+)\n• **Energica** - High-performance Italian electric motorcycles ($23,600+)\n• **Lightning Motorcycles** - Speed-focused electric bikes ($38,888+)\n\n💡 **Ryft's Competitive Advantages**:\n• **Youth Innovation**: Fresh perspective from young entrepreneurs\n• **Affordable Pricing**: Starting at $12,999 vs competitors' $20k+\n• **Modern Design**: Contemporary aesthetics appealing to younger riders\n• **Smart Technology**: Advanced connectivity and AI features\n• **Sustainability Focus**: Strong environmental commitment\n\nWe're positioning ourselves as the accessible, innovative alternative to traditional premium electric motorcycles!";
    }
    
    // Handle any other topic with intelligent, specific responses
    if (question.includes('weather') || question.includes('climate')) {
      return "Weather and climate are fascinating topics! Weather refers to short-term atmospheric conditions (temperature, precipitation, wind), while climate is long-term weather patterns. Weather is driven by atmospheric pressure differences, temperature variations, and Earth's rotation. Climate change involves long-term shifts in global weather patterns, primarily due to human activities like burning fossil fuels. This affects everything from sea levels to extreme weather events. What specific aspect interests you?";
    }
    
    if (question.includes('math') || question.includes('calculate') || question.includes('equation')) {
      return "Mathematics is the language of the universe! It helps us understand patterns, solve problems, and model reality. From basic arithmetic to advanced calculus, math provides tools for everything from everyday calculations to scientific discoveries. Key areas include algebra (solving equations), geometry (shapes and space), calculus (change and motion), and statistics (data analysis). What specific math topic or problem would you like to explore?";
    }
    
    if (question.includes('science') || question.includes('physics') || question.includes('chemistry') || question.includes('biology')) {
      return "Science is systematic knowledge about the natural world! Physics studies matter, energy, and their interactions. Chemistry explores substances and their transformations. Biology investigates living organisms and life processes. All follow the scientific method: observation, hypothesis, experimentation, and conclusion. Science drives innovation and helps solve real-world problems. What scientific field or concept would you like to learn about?";
    }
    
    if (question.includes('history') || question.includes('historical') || question.includes('past')) {
      return "History is the study of past human events and societies! It helps us understand how we got here and learn from past experiences. Key historical periods include Ancient Civilizations, Middle Ages, Renaissance, Industrial Revolution, and Modern Era. Historical thinking involves analyzing sources, considering context, and understanding multiple perspectives. History shapes our present and helps us make better decisions. What historical period, event, or figure interests you?";
    }
    
    if (question.includes('philosophy') || question.includes('ethical') || question.includes('moral')) {
      return "Philosophy explores fundamental questions about existence, knowledge, values, and reality! Major branches include metaphysics (nature of reality), epistemology (knowledge and belief), ethics (right and wrong), logic (reasoning), and aesthetics (beauty and art). Philosophy encourages critical thinking and helps us examine our assumptions about life. What philosophical topic or question would you like to explore?";
    }
    
    if (question.includes('creative') || question.includes('write') || question.includes('design') || question.includes('art')) {
      return "Creative expression is about bringing imagination to life! Whether it's writing, design, art, music, or any creative medium, the process involves inspiration, experimentation, and refinement. Creative work can express emotions, tell stories, solve problems, or simply bring beauty into the world. The key is to start creating and keep iterating. What creative project are you working on or would like to start?";
    }
    
    if (question.includes('technology') || question.includes('tech') || question.includes('innovation')) {
      return "Technology is the application of scientific knowledge to solve practical problems! It encompasses everything from simple tools to complex systems like AI, robotics, and biotechnology. Technology drives progress in communication, transportation, healthcare, entertainment, and more. Key areas include software development, hardware engineering, artificial intelligence, and sustainable tech. What technology topic or innovation interests you?";
    }
    
    if (question.includes('health') || question.includes('wellness') || question.includes('fitness')) {
      return "Health and wellness are about maintaining physical, mental, and social well-being! This includes nutrition, exercise, sleep, stress management, and preventive care. Key aspects are balanced diet, regular physical activity, adequate rest, and mental health awareness. Wellness is proactive - preventing illness before it starts. What specific health or wellness topic would you like to explore?";
    }
    
    if (question.includes('cooking') || question.includes('food') || question.includes('recipe')) {
      return "Cooking is both an art and a science! It involves understanding ingredients, techniques, flavors, and food safety. Key cooking methods include baking, frying, grilling, steaming, and slow cooking. Good cooking combines creativity with technical skill, using fresh ingredients and proper techniques. Whether you're a beginner or experienced cook, there's always something new to learn. What cooking technique or recipe would you like to explore?";
    }
    
    if (question.includes('travel') || question.includes('tourism') || question.includes('vacation')) {
      return "Travel opens our minds to new cultures, experiences, and perspectives! It can be local exploration or international adventures. Travel planning involves choosing destinations, budgeting, booking accommodations, and understanding local customs. Travel broadens horizons and creates lasting memories. Whether it's a weekend getaway or a world tour, every journey offers learning opportunities. What travel destination or planning aspect interests you?";
    }
    
    // For any other topic, provide a helpful, specific response
    return `That's an interesting question about "${userPrompt}"! I'd love to help you explore this topic. Could you provide more specific details about what you'd like to know? I'm here to give you comprehensive, helpful information on any subject you're curious about!`;
  };

  // Generate relevant quick actions based on the response
  const generateQuickActions = (question: string, response: string): string[] => {
    const q = question.toLowerCase();
    const actions = [];
    
    if (q.includes('ryft') || q.includes('bike') || q.includes('vehicle')) {
      actions.push('More Ryft Info', 'Product Details', 'Support', 'Ordering');
    } else if (q.includes('creative') || q.includes('write') || q.includes('design')) {
      actions.push('More Ideas', 'Examples', 'Techniques', 'Resources');
    } else if (q.includes('problem') || q.includes('solve') || q.includes('help')) {
      actions.push('Step by Step', 'Examples', 'Alternative Solutions', 'More Help');
    } else {
      actions.push('Learn More', 'Examples', 'Related Topics', 'Ask Another Question');
    }
    
    return actions.slice(0, 4);
  };

  // Enhanced fallback response system that can handle ANY topic
  const getEnhancedFallbackResponse = (userMessage: string): { message: string; quickActions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return {
        message: "Hello! I'm Ryft AI, your intelligent assistant powered by Google's Gemini AI. I can help you with ANY topic - from Ryft products to science, history, math, creative writing, current events, technology, health, cooking, travel, and much more! What would you like to explore today?",
        quickActions: ['Ryft Products', 'Learn Something New', 'Creative Help', 'Ask Anything']
      };
    }
    
    if (message.includes('help') || message.includes('what can you do')) {
      return {
        message: "I'm Ryft AI, powered by Google's Gemini AI, and I can help you with ANYTHING! Here's what I can do:\n\n🚀 **Ryft Information**: Products, company details, mission, values\n🧠 **General Knowledge**: Science, history, math, philosophy, current events\n💡 **Creative Tasks**: Writing, brainstorming, design ideas, storytelling\n🔬 **Academic Help**: Homework, research, explanations, problem-solving\n🌍 **Life Topics**: Health, cooking, travel, relationships, career advice\n⚡ **Technology**: Programming, gadgets, software, AI, innovation\n\nI'm your go-to assistant for any question or topic! What would you like to explore?",
        quickActions: ['Ryft Info', 'Learn Something', 'Creative Help', 'Ask Anything']
      };
    }
    
    // Handle any other topic with intelligent responses
    return {
      message: `I'd love to help you with "${userMessage}"! While I'm primarily designed to assist with Ryft-related questions, I can also help with a wide variety of topics including science, history, math, creative writing, technology, health, and much more.\n\nCould you please rephrase your question or let me know what specific area you'd like to explore? I'm here to help with anything you're curious about!`,
      quickActions: ['Ryft Products', 'General Knowledge', 'Creative Tasks', 'Ask Another Question']
    };
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { type: 'user', message, timestamp: new Date() };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);

    try {
      // Get AI response
      const aiResponse = await getAIResponse(message, currentContext);
      const aiMessage: ChatMessage = { 
        type: 'ai', 
        message: aiResponse.message, 
        timestamp: new Date(),
        quickActions: aiResponse.quickActions
      };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Fallback response
      const fallbackResponse = getEnhancedFallbackResponse(message);
      const aiMessage: ChatMessage = { 
        type: 'ai', 
        message: fallbackResponse.message, 
        timestamp: new Date(),
        quickActions: fallbackResponse.quickActions
      };
      setChatMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickAction = (action: string) => {
    // Handle specific quick actions with direct responses
    const actionLower = action.toLowerCase();
    
    if (actionLower.includes('mission') || actionLower.includes('purpose')) {
      const missionResponse: ChatMessage = {
        type: 'ai',
        message: "Our Mission at Ryft is to revolutionize electric transportation and make sustainable mobility accessible to everyone. We believe in:\n\n🌱 **Sustainability**: Creating zero-emission vehicles that protect our planet\n🚀 **Innovation**: Pushing the boundaries of electric vehicle technology\n👥 **Accessibility**: Making premium electric vehicles affordable and available\n🌍 **Impact**: Building a cleaner, greener future for transportation\n\nAs young entrepreneurs, we're passionate about proving that age is no barrier to innovation and positive change.",
        timestamp: new Date(),
        quickActions: ['Our Story', 'Company Values', 'Sustainability Goals', 'Future Plans']
      };
      setChatMessages(prev => [...prev, missionResponse]);
      return;
    }
    
    if (actionLower.includes('values') || actionLower.includes('principles')) {
      const valuesResponse: ChatMessage = {
        type: 'ai',
        message: "Our Core Values at Ryft:\n\n💡 **Innovation First**: We constantly push boundaries and think outside the box\n🤝 **Integrity**: Honest, transparent, and ethical in everything we do\n🌱 **Environmental Responsibility**: Committed to sustainability and reducing carbon footprint\n👥 **Community**: Building connections with our customers and the EV community\n🚀 **Excellence**: Striving for the highest quality in every product and service\n💪 **Youth Empowerment**: Proving that young people can create meaningful change",
        timestamp: new Date(),
        quickActions: ['Our Mission', 'Company Culture', 'Sustainability', 'Team Values']
      };
      setChatMessages(prev => [...prev, valuesResponse]);
      return;
    }
    
    if (actionLower.includes('story') || actionLower.includes('about')) {
      const storyResponse: ChatMessage = {
        type: 'ai',
        message: "Our Story at Ryft:\n\n🚀 Founded in 2025 by two ambitious high school sophomores, Ryft began as a bold vision to revolutionize electric transportation. We started in our bedrooms and garages, learning everything we could about electric vehicles, battery technology, and sustainable design.\n\n💡 What began as a school project has evolved into a real company with a mission to make electric transportation accessible to everyone. Despite being young entrepreneurs, we're determined to prove that age is just a number when it comes to innovation.\n\n🌱 We're building the future of mobility while still attending high school, showing that great ideas can come from anywhere and anyone.",
        timestamp: new Date(),
        quickActions: ['Our Mission', 'Team Info', 'Founding Vision', 'Future Goals']
      };
      setChatMessages(prev => [...prev, storyResponse]);
      return;
    }
    
    if (actionLower.includes('ask anything') || actionLower.includes('learn something') || actionLower.includes('general knowledge')) {
      const generalResponse: ChatMessage = {
        type: 'ai',
        message: "Absolutely! I'm here to help you with ANY topic you're curious about! 🚀\n\nHere are some ideas to get you started:\n\n🔬 **Science & Math**: Physics, chemistry, biology, algebra, calculus\n📚 **History & Culture**: Ancient civilizations, world events, art, literature\n💻 **Technology**: Programming, AI, gadgets, software, innovation\n🌍 **Current Events**: News, politics, global issues, trends\n💡 **Creative**: Writing, design, brainstorming, storytelling\n🏥 **Health & Life**: Wellness, cooking, travel, relationships, career\n\nWhat would you like to learn about? Just ask me anything!",
        timestamp: new Date(),
        quickActions: ['Science Help', 'History Facts', 'Tech News', 'Creative Ideas']
      };
      setChatMessages(prev => [...prev, generalResponse]);
      return;
    }
    
    // Default behavior for other actions
    const actionMessage = `I'd like to know about: ${action}`;
    handleSendMessage(actionMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(chatInput);
    }
  };

  return (
    <>
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
            onClick={() => onDarkModeToggle?.(!darkMode)}
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
            <LightBulbIcon className="w-5 h-5" />
            <span className="text-sm font-medium">AI Assistant</span>
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
              className={`relative w-full max-w-lg h-[700px] rounded-2xl shadow-2xl overflow-hidden ${
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
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}>
                    <BoltIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold text-lg ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Ryft AI Assistant</h3>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Powered by Google Gemini AI • Available 24/7</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChatbot(false)}
                  className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
                >
                  <XMarkIcon className={`w-6 h-6 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`} />
                </button>
              </div>

              {/* Chat Messages with Custom Scrollbar */}
              <div className={`chat-messages flex-1 overflow-y-auto p-4 space-y-4 ${
                darkMode ? 'bg-gray-900' : 'bg-white'
              }`} style={{
                scrollbarWidth: 'thin',
                scrollbarColor: darkMode ? '#6B7280 #374151' : '#9CA3AF #E5E7EB',
                maxHeight: '500px'
              }}>
                <style jsx>{`
                  .chat-messages {
                    scrollbar-width: thin !important;
                    scrollbar-color: ${darkMode ? '#6B7280 #374151' : '#9CA3AF #E5E7EB'} !important;
                    overflow-y: auto !important;
                    scroll-behavior: smooth !important;
                  }
                  .chat-messages::-webkit-scrollbar {
                    width: 16px !important;
                    height: 16px !important;
                    display: block !important;
                  }
                  .chat-messages::-webkit-scrollbar-track {
                    background: ${darkMode ? '#374151' : '#E5E7EB'} !important;
                    border-radius: 8px !important;
                    margin: 4px !important;
                    border: 2px solid ${darkMode ? '#4B5563' : '#D1D5DB'} !important;
                  }
                  .chat-messages::-webkit-scrollbar-thumb {
                    background: ${darkMode ? '#6B7280' : '#9CA3AF'} !important;
                    border-radius: 8px !important;
                    border: 2px solid ${darkMode ? '#374151' : '#E5E7EB'} !important;
                    min-height: 60px !important;
                  }
                  .chat-messages::-webkit-scrollbar-thumb:hover {
                    background: ${darkMode ? '#9CA3AF' : '#6B7280'} !important;
                    transform: scale(1.1) !important;
                  }
                  .chat-messages::-webkit-scrollbar-corner {
                    background: ${darkMode ? '#374151' : '#E5E7EB'} !important;
                  }
                  .chat-messages::-webkit-scrollbar-button {
                    display: none !important;
                  }
                `}</style>
                
                {chatMessages.map((msg, index) => (
                  <div key={index}>
                  <div
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        msg.type === 'user'
                          ? darkMode
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                              : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : darkMode
                            ? 'bg-gray-800 text-gray-200'
                            : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                        <p className="text-sm whitespace-pre-line">{msg.message}</p>
                        <p className={`text-xs mt-2 ${
                        msg.type === 'user'
                          ? 'text-blue-100'
                            : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    </div>
                    
                    {/* Quick Action Buttons for AI messages */}
                    {msg.type === 'ai' && msg.quickActions && (
                      <div className="flex flex-wrap gap-2 mt-3 ml-2">
                        {msg.quickActions.map((action, actionIndex) => (
                          <button
                            key={actionIndex}
                            onClick={() => handleQuickAction(action)}
                            className={`px-3 py-2 text-xs rounded-full transition-all duration-200 hover:scale-105 ${
                              darkMode
                                ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className={`max-w-xs px-4 py-3 rounded-2xl ${
                      darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {isGenerating ? 'AI is thinking...' : 'AI is typing...'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className={`p-4 border-t ${
                darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything - I can help with any topic!"
                    className={`flex-1 px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button
                    onClick={() => handleSendMessage(chatInput)}
                    disabled={!chatInput.trim() || isTyping}
                    className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      chatInput.trim() && !isTyping
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                        : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    }`}
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Quick Suggestions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Tell me about Ryft Z', 'How does AI work?', 'Creative writing help', 'Math problem solving'].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setChatInput(suggestion)}
                      className={`px-3 py-1 text-xs rounded-full transition-all duration-200 hover:scale-105 ${
                        darkMode
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
