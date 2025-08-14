'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BoltIcon, CheckIcon, XMarkIcon, StarIcon, CurrencyDollarIcon, ClockIcon, Battery100Icon, CogIcon } from '@heroicons/react/24/outline';
import ActionBar from '../components/ActionBar';

interface EbikeSpecs {
  name: string;
  brand: string;
  price: number;
  topSpeed: number;
  range: number;
  power: number;
  weight: number;
  battery: number;
  chargeTime: number;
  features: string[];
  pros: string[];
  cons: string[];
  image: string;
  category: string;
}

const ebikes: EbikeSpecs[] = [
  {
    name: "Ryft Z",
    brand: "Ryft",
    price: 7000,
    topSpeed: 120,
    range: 200,
    power: 107,
    weight: 180,
    battery: 15.6,
    chargeTime: 2,
    features: ["Smart Connectivity", "GPS Navigation", "Mobile App Control", "LED Lighting", "Regenerative Braking", "Youth Innovation"],
    pros: ["Best Value", "Modern Design", "Smart Technology", "Sustainability Focus", "Youth-Driven Innovation"],
    cons: ["Newer Brand", "Limited Service Network"],
    image: "/ryft-logo.png",
    category: "Electric Motorcycle"
  },
  {
    name: "Stark Varg",
    brand: "Stark Future",
    price: 12900,
    topSpeed: 85,
    range: 100,
    power: 80,
    weight: 110,
    battery: 6.0,
    chargeTime: 2,
    features: ["Off-road Performance", "Lightweight Design", "Advanced Suspension", "Racing Heritage", "Quick Swap Battery", "Premium Components"],
    pros: ["Lightweight", "Off-road Focused", "Racing Heritage", "Quick Battery Swap"],
    cons: ["Limited Range", "Off-road Only", "Higher Price", "Limited Street Use"],
    image: "/stark-logo.png",
    category: "Electric Dirt Bike"
  },
  {
    name: "Surron Light Bee X",
    brand: "Surron",
    price: 4400,
    topSpeed: 47,
    range: 60,
    power: 6,
    weight: 110,
    battery: 2.88,
    chargeTime: 4,
    features: ["Lightweight Frame", "Off-road Capable", "Affordable", "Easy Maintenance", "Quick Acceleration", "Silent Operation"],
    pros: ["Very Affordable", "Lightweight", "Good for Beginners", "Easy to Handle"],
    cons: ["Limited Range", "Low Power", "Basic Features", "Limited Speed"],
    image: "/surron-logo.png",
    category: "Electric Dirt Bike"
  },
  {
    name: "Cake Kalk&",
    brand: "Cake",
    price: 14000,
    topSpeed: 90,
    range: 80,
    power: 15,
    weight: 89,
    battery: 2.6,
    chargeTime: 3,
    features: ["Minimalist Design", "Lightweight", "Off-road Focused", "Premium Build", "Swedish Engineering", "Eco-friendly"],
    pros: ["Ultra Lightweight", "Premium Quality", "Eco-friendly", "Unique Design"],
    cons: ["Expensive", "Limited Range", "Off-road Only", "High Price"],
    image: "/cake-logo.png",
    category: "Electric Dirt Bike"
  },
  {
    name: "KTM Freeride E-XC",
    brand: "KTM",
    price: 11000,
    topSpeed: 80,
    range: 90,
    power: 18,
    weight: 105,
    battery: 3.9,
    chargeTime: 2.5,
    features: ["KTM Quality", "Off-road Performance", "Reliable", "Established Brand", "Good Suspension", "Racing Heritage"],
    pros: ["KTM Quality", "Reliable", "Good Performance", "Established Brand"],
    cons: ["Limited Range", "Off-road Only", "Expensive", "Basic Features"],
    image: "/ktm-logo.png",
    category: "Electric Dirt Bike"
  },
  {
    name: "LiveWire One",
    brand: "Harley-Davidson",
    price: 22799,
    topSpeed: 110,
    range: 146,
    power: 101,
    weight: 249,
    battery: 15.4,
    chargeTime: 6,
    features: ["H-D Connect", "Ride Modes", "Premium Audio", "LED Lighting", "ABS", "Traction Control"],
    pros: ["Premium Brand", "Established Service", "High Quality", "Strong Resale"],
    cons: ["Expensive", "Heavy", "Limited Range"],
    image: "/harley-logo.png",
    category: "Electric Motorcycle"
  },
  {
    name: "Zero SR/F",
    brand: "Zero Motorcycles",
    price: 19995,
    topSpeed: 124,
    range: 161,
    power: 110,
    weight: 220,
    battery: 14.4,
    chargeTime: 4.5,
    features: ["Zero Motorcycles App", "Ride Modes", "Cypher III OS", "LED Lighting", "ABS", "Traction Control"],
    pros: ["Good Range", "Reliable", "Established Brand", "Good Performance"],
    cons: ["Expensive", "Limited Features", "Basic Design"],
    image: "/zero-logo.png",
    category: "Electric Motorcycle"
  },
  {
    name: "Energica Ego",
    brand: "Energica",
    price: 23600,
    topSpeed: 150,
    range: 200,
    power: 145,
    weight: 258,
    battery: 21.5,
    chargeTime: 3.5,
    features: ["Fast Charging", "Premium Components", "Sport Performance", "Advanced Electronics", "LED Lighting", "ABS"],
    pros: ["High Performance", "Fast Charging", "Premium Quality", "Long Range"],
    cons: ["Very Expensive", "Heavy", "Limited Availability"],
    image: "/energica-logo.png",
    category: "Electric Motorcycle"
  },
  {
    name: "Lightning Strike",
    brand: "Lightning Motorcycles",
    price: 38888,
    topSpeed: 150,
    range: 150,
    power: 150,
    weight: 220,
    battery: 20,
    chargeTime: 2.5,
    features: ["Lightning Fast Charging", "Premium Performance", "Advanced Aerodynamics", "Carbon Fiber", "Race Mode", "Premium Electronics"],
    pros: ["Extreme Performance", "Fastest Charging", "Premium Materials", "Exclusive"],
    cons: ["Very Expensive", "Limited Production", "High Maintenance"],
    image: "/lightning-logo.png",
    category: "Electric Motorcycle"
  }
];

export default function ComparePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBikes, setSelectedBikes] = useState<string[]>(["Ryft Z"]);
  const [sortBy, setSortBy] = useState<string>("price");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const addBikeToComparison = (bikeName: string) => {
    if (!selectedBikes.includes(bikeName) && selectedBikes.length < 4) {
      setSelectedBikes([...selectedBikes, bikeName]);
    }
  };

  const removeBikeFromComparison = (bikeName: string) => {
    setSelectedBikes(selectedBikes.filter(bike => bike !== bikeName));
  };

  const getComparisonBikes = () => {
    return ebikes.filter(bike => selectedBikes.includes(bike.name));
  };

  const sortedBikes = [...ebikes].sort((a, b) => {
    switch (sortBy) {
      case "price": return a.price - b.price;
      case "range": return b.range - a.range;
      case "power": return b.power - a.power;
      case "topSpeed": return b.topSpeed - a.topSpeed;
      default: return 0;
    }
  });

  const filteredBikes = filterCategory === "all" 
    ? sortedBikes 
    : sortedBikes.filter(bike => bike.category === filterCategory);

  return (
         <div className={`min-h-screen bg-gradient-to-br ${darkMode ? 'from-gray-900 to-gray-800' : 'from-gray-50 to-gray-100'}`}>
       {/* Header */}
       <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
         <div className="max-w-7xl mx-auto px-6 py-8">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className="text-center"
           >
             <div className="flex items-center justify-center space-x-3 mb-4">
               <BoltIcon className="w-12 h-12 text-blue-600" />
               <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                 Ebike Comparison Tool
               </h1>
             </div>
             <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
               Compare the Ryft Z against the top electric motorcycles and dirt bikes in the market. 
               See how our innovative design, competitive pricing, and youth-driven approach 
               stacks up against established brands.
             </p>
           </motion.div>
         </div>
       </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 py-8">
                 <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg p-6 mb-8`}
         >
           <div className="grid md:grid-cols-3 gap-6">
             <div>
               <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                 Sort By
               </label>
               <select
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                   darkMode 
                     ? 'border-gray-600 bg-gray-700 text-white' 
                     : 'border-gray-300 bg-white text-gray-900'
                 }`}
               >
                <option value="price">Price (Low to High)</option>
                <option value="range">Range (High to Low)</option>
                <option value="power">Power (High to Low)</option>
                <option value="topSpeed">Top Speed (High to Low)</option>
              </select>
            </div>
            
                         <div>
               <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                 Category
               </label>
               <select
                 value={filterCategory}
                 onChange={(e) => setFilterCategory(e.target.value)}
                 className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                   darkMode 
                     ? 'border-gray-600 bg-gray-700 text-white' 
                     : 'border-gray-300 bg-white text-gray-900'
                 }`}
               >
                 <option value="all">All Categories</option>
                 <option value="Electric Motorcycle">Electric Motorcycles</option>
                 <option value="Electric Dirt Bike">Electric Dirt Bikes</option>
               </select>
             </div>

             <div>
               <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                 Comparison ({selectedBikes.length}/4)
               </label>
               <div className="flex flex-wrap gap-2">
                 {selectedBikes.map(bike => (
                   <span
                     key={bike}
                     className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                       darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                     }`}
                   >
                     {bike}
                     <button
                       onClick={() => removeBikeFromComparison(bike)}
                       className={`ml-2 hover:opacity-80 ${
                         darkMode ? 'text-blue-400 hover:text-blue-200' : 'text-blue-600 hover:text-blue-800'
                       }`}
                     >
                       <XMarkIcon className="w-4 h-4" />
                     </button>
                   </span>
                 ))}
               </div>
             </div>
          </div>
        </motion.div>

        {/* Comparison Table */}
        {selectedBikes.length > 1 && (
                     <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className={`${darkMode ? 'bg-gray-900 border-2 border-gray-600 shadow-2xl' : 'bg-white shadow-lg'} rounded-2xl p-6 mb-8 overflow-x-auto`}
           >
             <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
               Detailed Comparison
             </h2>
             <div className="overflow-x-auto">
               <table className="w-full min-w-[800px]">
                 <thead>
                   <tr className={`border-b-2 ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                     <th className={`text-left py-3 px-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Feature</th>
                     {getComparisonBikes().map(bike => (
                       <th key={bike.name} className={`text-center py-3 px-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                         {bike.name}
                       </th>
                     ))}
                   </tr>
                 </thead>
                 <tbody>
                   <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                     <td className={`py-3 px-4 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Price</td>
                     {getComparisonBikes().map(bike => (
                       <td key={bike.name} className="text-center py-3 px-4">
                         <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                           ${bike.price.toLocaleString()}
                         </span>
                       </td>
                     ))}
                   </tr>
                   <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                     <td className={`py-3 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Top Speed</td>
                     {getComparisonBikes().map(bike => (
                       <td key={bike.name} className="text-center py-3 px-4">
                         <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                           {bike.topSpeed} mph
                         </span>
                       </td>
                     ))}
                   </tr>
                   <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                     <td className={`py-3 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Range</td>
                     {getComparisonBikes().map(bike => (
                       <td key={bike.name} className="text-center py-3 px-4">
                         <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                           {bike.range} miles
                         </span>
                       </td>
                     ))}
                   </tr>
                   <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                     <td className={`py-3 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Power</td>
                     {getComparisonBikes().map(bike => (
                       <td key={bike.name} className="text-center py-3 px-4">
                         <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                           {bike.power} hp
                         </span>
                       </td>
                     ))}
                   </tr>
                   <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                     <td className={`py-3 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Battery</td>
                     {getComparisonBikes().map(bike => (
                       <td key={bike.name} className="text-center py-3 px-4">
                         <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                           {bike.battery} kWh
                         </span>
                       </td>
                     ))}
                   </tr>
                   <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                     <td className={`py-3 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Charge Time</td>
                     {getComparisonBikes().map(bike => (
                       <td key={bike.name} className="text-center py-3 px-4">
                         <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                           {bike.chargeTime} hours
                         </span>
                       </td>
                     ))}
                   </tr>
                   <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                     <td className={`py-3 px-4 font-medium ${darkMode ? 'text-white' : 'text-gray-700'}`}>Weight</td>
                     {getComparisonBikes().map(bike => (
                       <td key={bike.name} className="text-center py-3 px-4">
                         <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                           {bike.weight} lbs
                         </span>
                       </td>
                     ))}
                   </tr>
                 </tbody>
               </table>
             </div>
           </motion.div>
        )}

        {/* Ebike Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBikes.map((bike, index) => (
                         <motion.div
               key={bike.name}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.1 * index }}
               className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                 bike.name === "Ryft Z" ? "ring-2 ring-blue-500" : ""
               }`}
             >
               {/* Header */}
               <div className={`p-6 ${bike.name === "Ryft Z" ? "bg-gradient-to-r from-blue-600 to-purple-600" : darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                 <div className="flex items-center justify-between mb-4">
                   <div className="flex items-center space-x-3">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                       <BoltIcon className={`w-6 h-6 ${bike.name === "Ryft Z" ? "text-blue-600" : darkMode ? "text-gray-400" : "text-gray-600"}`} />
                     </div>
                     <div>
                       <h3 className={`font-bold text-lg ${bike.name === "Ryft Z" ? "text-white" : darkMode ? "text-white" : "text-gray-900"}`}>
                         {bike.name}
                       </h3>
                       <p className={`text-sm ${bike.name === "Ryft Z" ? "text-blue-100" : darkMode ? "text-gray-400" : "text-gray-600"}`}>
                         {bike.brand}
                       </p>
                     </div>
                   </div>
                   {bike.name === "Ryft Z" && (
                     <div className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                       Our Pick
                     </div>
                   )}
                 </div>
                 
                 <div className={`text-2xl font-bold ${bike.name === "Ryft Z" ? "text-white" : darkMode ? "text-white" : "text-gray-900"}`}>
                   ${bike.price.toLocaleString()}
                 </div>
               </div>

                                              {/* Specs */}
                 <div className="p-6">
                   <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="text-center">
                       <ClockIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                       <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Top Speed</div>
                       <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bike.topSpeed} mph</div>
                     </div>
                     <div className="text-center">
                       <Battery100Icon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                       <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Range</div>
                       <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bike.range} mi</div>
                     </div>
                     <div className="text-center">
                       <CogIcon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                       <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Power</div>
                       <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bike.power} hp</div>
                     </div>
                     <div className="text-center">
                       <Battery100Icon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                       <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Battery</div>
                       <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{bike.battery} kWh</div>
                     </div>
                   </div>

                   {/* Features */}
                   <div className="mb-6">
                     <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Key Features</h4>
                     <div className="space-y-2">
                       {bike.features.slice(0, 3).map((feature, idx) => (
                         <div key={idx} className="flex items-center space-x-2">
                           <CheckIcon className="w-4 h-4 text-green-500" />
                           <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature}</span>
                         </div>
                       ))}
                     </div>
                   </div>

                   {/* Pros & Cons */}
                   <div className="grid grid-cols-2 gap-4 mb-6">
                     <div>
                       <h5 className="font-semibold text-green-600 mb-2">Pros</h5>
                       <ul className="space-y-1">
                         {bike.pros.slice(0, 2).map((pro, idx) => (
                           <li key={idx} className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>• {pro}</li>
                         ))}
                       </ul>
                     </div>
                     <div>
                       <h5 className="font-semibold text-red-600 mb-2">Cons</h5>
                       <ul className="space-y-1">
                         {bike.cons.slice(0, 2).map((con, idx) => (
                           <li key={idx} className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>• {con}</li>
                         ))}
                       </ul>
                     </div>
                   </div>

                {/* Actions */}
                <div className="space-y-3">
                  {!selectedBikes.includes(bike.name) && selectedBikes.length < 4 ? (
                    <button
                      onClick={() => addBikeToComparison(bike.name)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Add to Comparison
                    </button>
                  ) : selectedBikes.includes(bike.name) ? (
                    <button
                      onClick={() => removeBikeFromComparison(bike.name)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Remove from Comparison
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white font-medium py-2 px-4 rounded-lg cursor-not-allowed"
                    >
                      Max 4 Bikes
                    </button>
                  )}
                  
                  {bike.name === "Ryft Z" ? (
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200">
                      Learn More
                    </button>
                  ) : (
                    <button className={`w-full font-medium py-2 px-4 rounded-lg transition-colors duration-200 ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}>
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Ryft Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 mt-12 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            Why Choose Ryft Z?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CurrencyDollarIcon className="w-8 h-8 text-white" />
              </div>
                             <h3 className="text-xl font-semibold text-white mb-2">Best Value</h3>
               <p className="text-blue-100">
                 Starting at just $7,000, Ryft Z offers premium features at an unbeatable price point.
               </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <StarIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Youth Innovation</h3>
              <p className="text-blue-100">
                Built by young entrepreneurs with fresh perspectives on electric mobility.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <BoltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Technology</h3>
              <p className="text-blue-100">
                Advanced connectivity and AI features for the modern rider.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
    </div>
  );
}
