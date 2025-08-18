'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ActionBar from '../components/ActionBar';
import { 
   BoltIcon,
   GlobeAltIcon,
   HeartIcon,
   LightBulbIcon,
   UsersIcon,
   TrophyIcon,
   ChartBarIcon,
   CogIcon
 } from '@heroicons/react/24/outline';

interface Value {
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(true);

  const values: Value[] = [
    {
      title: 'Innovation',
      description: 'Pushing the boundaries of electric transportation technology',
      icon: LightBulbIcon,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Sustainability',
      description: 'Committed to reducing carbon footprint and protecting our planet',
      icon: GlobeAltIcon,
      color: 'from-green-500 to-teal-500'
    },
    {
      title: 'Quality',
      description: 'Delivering exceptional products that exceed customer expectations',
      icon: TrophyIcon,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Community',
      description: 'Building a global community of electric vehicle enthusiasts',
      icon: UsersIcon,
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      name: 'Siddharth Tumati',
      role: 'CEO',
      bio: 'Leading Ryft with a vision to revolutionize electric transportation and make sustainable mobility accessible to everyone.',
      avatar: '👨‍💼'
    },
    {
      name: 'Anish Meruva',
      role: 'CMO',
      bio: 'Driving Ryft\'s marketing strategy and brand development to connect with electric vehicle enthusiasts worldwide.',
      avatar: '👨‍💻'
    }
  ];

  const renderValue = (value: Value, index: number) => (
    <motion.div
      key={value.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${value.color} mb-4`}>
        <value.icon className="w-8 h-8 text-white" />
      </div>
      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
        {value.title}
      </h3>
      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {value.description}
      </p>
    </motion.div>
  );

  const renderTeamMember = (member: TeamMember, index: number) => (
    <motion.div
      key={member.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}
    >
      <div className="text-6xl mb-4">{member.avatar}</div>
      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
        {member.name}
      </h3>
      <p className={`text-sm font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
        {member.role}
      </p>
      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {member.bio}
      </p>
    </motion.div>
  );

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Action Bar */}
      <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />

      {/* Back Button */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={() => window.history.back()}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            darkMode 
              ? 'bg-gray-800 text-white hover:bg-gray-700' 
              : 'bg-white text-gray-600 hover:bg-gray-100'
          } shadow-lg hover:shadow-xl`}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-blue-600' : 'bg-blue-100'
          }`}>
            <BoltIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
            About Ryft
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We're revolutionizing electric transportation by creating cutting-edge electric vehicles that combine 
            innovative technology, sustainable design, and exceptional performance.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
              Our Mission
            </h2>
            <p className={`text-lg text-center leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              To accelerate the world's transition to sustainable transportation by making electric vehicles 
              that are not only environmentally friendly but also exciting to drive, beautiful to look at, 
              and accessible to everyone. We believe that the future of mobility should be clean, efficient, 
              and inspiring.
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => renderValue(value, index))}
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h2 className={`text-3xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
              Our Story
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                                 <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   Founded in 2025, Ryft began as a bold vision shared by two ambitious sophomores in high school 
                   who dreamed of revolutionizing electric transportation.
                 </p>
                 <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   We started in our bedrooms and garages, learning everything we could about electric vehicles, 
                   battery technology, and sustainable design. What began as a school project has evolved into 
                   a real company with a mission to make electric transportation accessible to everyone.
                 </p>
                 <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   Despite being young entrepreneurs, we're determined to prove that age is just a number when 
                   it comes to innovation. We're building the future of mobility while still attending high school, 
                   showing that great ideas can come from anywhere and anyone.
                 </p>
              </div>
              <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} text-center`}>
                <div className="text-8xl mb-4">🏍️</div>
                                 <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                   From High School to Innovation
                 </h3>
                 <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   Our journey from students to entrepreneurs
                 </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
            Meet Our Team
          </h2>
                     <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
             {teamMembers.map((member, index) => renderTeamMember(member, index))}
           </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h2 className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
              By The Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  10,000+
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Vehicles Delivered
                </p>
              </div>
              <div>
                <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  50+
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Countries Served
                </p>
              </div>
              <div>
                <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  200+
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Team Members
                </p>
              </div>
              <div>
                <div className={`text-4xl font-bold mb-2 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`}>
                  98%
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Customer Satisfaction
                </p>
              </div>
            </div>
          </div>
        </motion.div>


      </div>

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
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
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
    </main>
  );
}
