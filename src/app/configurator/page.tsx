'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BoltIcon, 
  CheckIcon, 
  ArrowLeftIcon,
  ShoppingCartIcon,
  CogIcon,
  PhotoIcon,
  ChartBarIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  basePrice: number;
  image: string;
  gallery: string[];
  specs: {
    topSpeed: number;
    range: number;
    power: number;
    battery: number;
    chargeTime: number;
    weight: number;
  };
  colors: {
    name: string;
    hex: string;
    price: number;
    popular?: boolean;
  }[];
  features: string[];
  rating: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 'ryft-z',
    name: 'Ryft Z',
    price: 7000,
    basePrice: 7000,
    image: '/ryft-logo.png',
    gallery: ['/section1.jpg', '/section2.jpg', '/section3.jpg', '/section4.jpg', '/section5.jpg'],
    specs: {
      topSpeed: 120,
      range: 200,
      power: 107,
      battery: 15.6,
      chargeTime: 2,
      weight: 180
    },
    colors: [
      { name: 'Arctic White', hex: '#F8F9FA', price: 0, popular: true },
      { name: 'Midnight Black', hex: '#0F0F0F', price: 200 },
      { name: 'Crimson Red', hex: '#8B0000', price: 300 },
      { name: 'Navy Blue', hex: '#0A1929', price: 250 },
      { name: 'Forest Green', hex: '#1B4332', price: 275 },
      { name: 'Charcoal Grey', hex: '#2C3E50', price: 150 }
    ],
    features: [
      'Smart Connectivity & GPS Navigation',
      'Mobile App Control & Real-time Monitoring', 
      'Advanced LED Lighting System',
      'Regenerative Braking Technology',
      'Youth-Driven Innovation & Design',
      'Premium Build Quality & Materials'
    ],
    rating: 4.8,
    reviews: 127
  }
];

export default function ConfiguratorPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product>(products[0]);
  const [selectedColor, setSelectedColor] = useState(selectedProduct.colors[0]);
  const [activeTab, setActiveTab] = useState<'gallery' | 'specs' | 'features'>('gallery');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [extendedWarranty, setExtendedWarranty] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  const totalPrice = selectedProduct.basePrice + selectedColor.price + (extendedWarranty ? 300 : 0);

  const handleProceedToCheckout = () => {
    router.push('/cart');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
            
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Product Configurator
              </h1>
              <p className="text-lg text-gray-600 mt-1">Customize Your Perfect Ride</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">${totalPrice.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Price</div>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span>Proceed to Checkout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Product Display */}
          <div className="space-y-8">
            {/* Main Product Image */}
            <div className="relative group">
              <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02]">
                <Image
                  src={selectedProduct.gallery[selectedImage]}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Color Overlay */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-30 transition-all duration-500"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                
                {/* Product Name Overlay */}
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {selectedProduct.name}
                    </h2>
                    <p className="text-white/90 text-lg">
                      {selectedColor.name}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-white/80 ml-2">{selectedProduct.rating}</span>
                      </div>
                      <span className="text-white/60">({selectedProduct.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex space-x-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                      isFavorite 
                        ? 'bg-red-500 text-white shadow-lg' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <HeartIcon className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-md transition-all duration-300">
                    <ShareIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <PhotoIcon className="w-6 h-6 mr-2 text-blue-600" />
                Gallery
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {selectedProduct.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedImage === index 
                        ? 'border-blue-500 scale-105 shadow-lg' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${selectedProduct.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Configuration */}
          <div className="space-y-6">
            {/* Product Selection */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BoltIcon className="w-6 h-6 mr-2 text-blue-600" />
                Select Product
              </h3>
              <div className="space-y-3">
                {products.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02] ${
                      selectedProduct.id === product.id
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg">{product.name}</h4>
                        <p className="text-gray-600">Starting at ${product.basePrice.toLocaleString()}</p>
                      </div>
                      {selectedProduct.id === product.id && (
                        <div className="bg-blue-500 text-white p-2 rounded-full">
                          <CheckIcon className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <EyeIcon className="w-6 h-6 mr-2 text-blue-600" />
                Choose Color
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      selectedColor.name === color.name
                        ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-gray-900">{color.name}</div>
                        <div className="text-sm text-gray-600">
                          {color.price > 0 ? `+$${color.price}` : 'Included'}
                        </div>
                        {color.popular && (
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mt-1">
                            Popular
                          </span>
                        )}
                      </div>
                      {selectedColor.name === color.name && (
                        <div className="bg-blue-500 text-white p-2 rounded-full">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Extended Warranty Option */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShieldCheckIcon className="w-6 h-6 mr-2 text-blue-600" />
                Extended Warranty
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => setExtendedWarranty(!extendedWarranty)}
                  className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02] ${
                    extendedWarranty
                      ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        extendedWarranty
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        {extendedWarranty ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <ShieldCheckIcon className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">1 Year Extended Warranty</h4>
                        <p className="text-gray-600">Additional coverage beyond standard warranty</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">Includes:</span>
                          <span className="text-sm text-green-600 font-medium">Parts & Labor</span>
                          <span className="text-sm text-green-600 font-medium">•</span>
                          <span className="text-sm text-green-600 font-medium">24/7 Support</span>
                          <span className="text-sm text-green-600 font-medium">•</span>
                          <span className="text-sm text-green-600 font-medium">Priority Service</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">+$300</div>
                      <div className="text-sm text-gray-600">One Time</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Configuration Tabs */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 overflow-hidden">
              {/* Tab Headers */}
              <div className="flex border-b border-gray-200/50">
                {[
                  { id: 'gallery', label: 'Gallery', icon: PhotoIcon },
                  { id: 'specs', label: 'Specifications', icon: ChartBarIcon },
                  { id: 'features', label: 'Features', icon: CogIcon }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'gallery' && (
                    <motion.div
                      key="gallery"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-semibold text-gray-900">Product Gallery</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProduct.gallery.map((image, index) => (
                          <div key={index} className="aspect-video rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <Image
                              src={image}
                              alt={`${selectedProduct.name} view ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'specs' && (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-semibold text-gray-900">Technical Specifications</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { 
                            label: 'Top Speed', 
                            value: selectedProduct.specs.topSpeed, 
                            unit: 'mph', 
                            icon: '🚀',
                            details: {
                              title: 'Maximum Velocity',
                              description: 'Achieves 120 mph in optimal conditions with advanced aerodynamics and premium tires.',
                              features: ['Wind-tunnel tested design', 'High-performance tires', 'Aerodynamic fairings', 'Sport mode enabled'],
                              technical: '120 mph (193 km/h) at sea level, 110 mph (177 km/h) at 5,000 ft elevation'
                            }
                          },
                          { 
                            label: 'Range', 
                            value: selectedProduct.specs.range, 
                            unit: 'miles', 
                            icon: '📍',
                            details: {
                              title: 'Battery Range',
                              description: '200-mile range under normal riding conditions with intelligent power management.',
                              features: ['Eco mode: 250+ miles', 'Sport mode: 150 miles', 'Mixed riding: 200 miles', 'Regenerative braking'],
                              technical: '200 miles (322 km) at 45 mph average, 180 miles (290 km) at 65 mph, 250+ miles (402 km) in Eco mode'
                            }
                          },
                          { 
                            label: 'Power', 
                            value: selectedProduct.specs.power, 
                            unit: 'hp', 
                            icon: '⚡',
                            details: {
                              title: 'Motor Output',
                              description: '107 horsepower electric motor delivering instant torque and smooth acceleration.',
                              features: ['Peak torque: 150 Nm', '0-60 mph: 3.2 seconds', 'Instant acceleration', 'No gear shifting'],
                              technical: '107 hp (80 kW) continuous, 120 hp (90 kW) peak for 10 seconds, 150 Nm torque from 0 RPM'
                            }
                          },
                          { 
                            label: 'Battery', 
                            value: selectedProduct.specs.battery, 
                            unit: 'kWh', 
                            icon: '🔋',
                            details: {
                              title: 'Battery Capacity',
                              description: '15.6 kWh lithium-ion battery pack with advanced thermal management.',
                              features: ['21700 cells', 'Thermal management', 'BMS protection', '8-year warranty'],
                              technical: '15.6 kWh nominal, 16.2 kWh total, 21700 lithium-ion cells, 400V nominal voltage'
                            }
                          },
                          { 
                            label: 'Charge Time', 
                            value: selectedProduct.specs.chargeTime, 
                            unit: 'hours', 
                            icon: '⏱️',
                            details: {
                              title: 'Charging Duration',
                              description: '2-hour full charge with Level 2 charger, 30 minutes for 80% with DC fast charging.',
                              features: ['Level 2: 2 hours', 'DC Fast: 30 min to 80%', 'Home charging', 'Public network compatible'],
                              technical: 'Level 2 (7.2 kW): 2 hours, DC Fast (50 kW): 30 minutes to 80%, Level 1 (1.4 kW): 8 hours'
                            }
                          },
                          { 
                            label: 'Weight', 
                            value: selectedProduct.specs.weight, 
                            unit: 'lbs', 
                            icon: '⚖️',
                            details: {
                              title: 'Total Weight',
                              description: '180 lbs dry weight optimized for performance and handling.',
                              features: ['Aluminum frame', 'Carbon fiber components', 'Lightweight motor', 'Balanced distribution'],
                              technical: '180 lbs (82 kg) dry weight, 195 lbs (88 kg) with fluids, 50/50 weight distribution'
                            }
                          }
                        ].map((spec, index) => (
                          <div key={index} className="group relative">
                            <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200/50 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                              <div className="text-2xl mb-1">{spec.icon}</div>
                              <div className="text-2xl font-bold text-gray-900">{spec.value}</div>
                              <div className="text-sm text-gray-600">{spec.label}</div>
                              <div className="text-xs text-gray-500">{spec.unit}</div>
                            </div>
                            
                            {/* Detailed Spec Popup */}
                            <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white border-r border-b border-gray-200 rotate-45"></div>
                                
                                <div className="text-center mb-4">
                                  <div className="text-3xl mb-2">{spec.icon}</div>
                                  <h5 className="text-lg font-bold text-gray-900">{spec.details.title}</h5>
                                  <p className="text-sm text-gray-600">{spec.details.description}</p>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <h6 className="text-sm font-semibold text-gray-800 mb-2">Key Features:</h6>
                                    <ul className="space-y-1">
                                      {spec.details.features.map((feature, idx) => (
                                        <li key={idx} className="text-xs text-gray-600 flex items-center">
                                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                                          {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  
                                  <div>
                                    <h6 className="text-sm font-semibold text-gray-800 mb-2">Technical Details:</h6>
                                    <p className="text-xs text-gray-600 leading-relaxed">{spec.details.technical}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Additional Technical Information */}
                      <div className="mt-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200/50">
                        <h5 className="text-lg font-semibold text-gray-900 mb-4">Complete Technical Specifications</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h6 className="font-semibold text-gray-800 mb-3">Motor & Performance</h6>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>Motor Type:</span>
                                <span className="font-medium">Brushless DC Hub Motor</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cooling:</span>
                                <span className="font-medium">Liquid Cooled</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Efficiency:</span>
                                <span className="font-medium">94% Peak</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Max RPM:</span>
                                <span className="font-medium">8,500</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h6 className="font-semibold text-gray-800 mb-3">Battery & Charging</h6>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>Cell Chemistry:</span>
                                <span className="font-medium">NMC 811</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cycle Life:</span>
                                <span className="font-medium">1,000+ cycles</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Charging Port:</span>
                                <span className="font-medium">Type 2 + CCS</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Battery Management:</span>
                                <span className="font-medium">Advanced BMS</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h6 className="font-semibold text-gray-800 mb-3">Chassis & Suspension</h6>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>Frame Material:</span>
                                <span className="font-medium">Aluminum 6061-T6</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Front Suspension:</span>
                                <span className="font-medium">Inverted Forks</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Rear Suspension:</span>
                                <span className="font-medium">Monoshock</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Brakes:</span>
                                <span className="font-medium">Dual Disc ABS</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h6 className="font-semibold text-gray-800 mb-3">Electronics & Safety</h6>
                            <div className="space-y-2 text-sm text-gray-600">
                              <div className="flex justify-between">
                                <span>Display:</span>
                                <span className="font-medium">7" Touchscreen</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Connectivity:</span>
                                <span className="font-medium">4G + WiFi + Bluetooth</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Safety Features:</span>
                                <span className="font-medium">ABS, Traction Control</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Lighting:</span>
                                <span className="font-medium">LED + Adaptive</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'features' && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <h4 className="text-lg font-semibold text-gray-900">Key Features</h4>
                      <div className="space-y-3">
                        {selectedProduct.features.map((feature, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50"
                          >
                            <div className="bg-blue-500 text-white p-2 rounded-full">
                              <CheckIcon className="w-4 h-4" />
                            </div>
                            <span className="text-gray-700 font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-6 shadow-xl border border-blue-200/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCardIcon className="w-6 h-6 mr-2 text-blue-600" />
                Price Summary
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                  <span className="text-gray-700 font-medium">Base Price</span>
                  <span className="font-bold text-gray-900">${selectedProduct.basePrice.toLocaleString()}</span>
                </div>
                {selectedColor.price > 0 && (
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                    <span className="text-gray-700 font-medium">{selectedColor.name} Color</span>
                    <span className="font-bold text-gray-900">+${selectedColor.price}</span>
                  </div>
                )}
                {extendedWarranty && (
                  <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                    <span className="text-gray-700 font-medium">1 Year Extended Warranty</span>
                    <span className="font-bold text-gray-900">+$300</span>
                  </div>
                )}
                <div className="border-t border-blue-200 pt-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">${totalPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-3xl p-6 shadow-xl border border-green-200/50">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Order?</h3>
                <p className="text-gray-600 mb-6">Add your configured Ryft Z to cart and complete your purchase</p>
                <button
                  onClick={() => {
                    addToCart({
                      productId: selectedProduct.id,
                      name: selectedProduct.name,
                      color: selectedColor.name,
                      colorHex: selectedColor.hex,
                      basePrice: selectedProduct.basePrice,
                      colorPrice: selectedColor.price,
                      extendedWarranty,
                      warrantyPrice: extendedWarranty ? 300 : 0,
                      totalPrice,
                      image: selectedProduct.gallery[0],
                      quantity: 1
                    });
                    
                    // Show success message
                    alert(`Added to cart: ${selectedProduct.name} in ${selectedColor.name}${extendedWarranty ? ' with Extended Warranty' : ''} - $${totalPrice.toLocaleString()}`);
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  <span>Add to Cart - ${totalPrice.toLocaleString()}</span>
                </button>
                <p className="text-sm text-gray-500 mt-3">Free shipping worldwide • 2 year warranty included</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
                  <TruckIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-green-800">Free Shipping</div>
                  <div className="text-sm text-green-600">Worldwide</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-200">
                  <ShieldCheckIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-blue-800">2 Year Warranty</div>
                  <div className="text-sm text-blue-600">Full Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
