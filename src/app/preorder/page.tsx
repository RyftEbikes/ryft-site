'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActionBar from '../components/ActionBar';
import { userStorage } from '../utils/userStorage';
import { 
  BoltIcon,
  CalendarIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  TruckIcon,
  StarIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
  PhotoIcon,
  CogIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface PreorderForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  color: string;
  colorPrice: number;
  depositAmount: number;
  estimatedDelivery: string;
  extendedWarranty: boolean;
  // Billing Information
  billingSameAsShipping: boolean;
  billingFirstName: string;
  billingLastName: string;
  billingAddress: string;
  billingCity: string;
  billingState: string;
  billingZipCode: string;
  billingCountry: string;
  // Payment Information
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  cardholderName: string;
}

export default function PreorderPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState<PreorderForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    color: 'Arctic White',
    colorPrice: 0,
    depositAmount: 1000,
    estimatedDelivery: 'Late October - November',
    extendedWarranty: false,
    // Billing Information
    billingSameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: 'United States',
    // Payment Information
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardholderName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'gallery' | 'specs' | 'features'>('gallery');
  const router = useRouter();

  const colors = [
    { name: 'Arctic White', hex: '#F8F9FA', popular: true, price: 0 },
    { name: 'Midnight Black', hex: '#0F0F0F', price: 200 },
    { name: 'Crimson Red', hex: '#8B0000', price: 300 },
    { name: 'Navy Blue', hex: '#0A1929', price: 250 },
    { name: 'Forest Green', hex: '#1B4332', price: 275 },
    { name: 'Charcoal Grey', hex: '#2C3E50', price: 150 }
  ];

  const depositOptions = [
    { amount: 1000, label: '$1,000 - Priority Deposit', description: 'Priority preorder with early access', popular: true }
  ];

  const selectedColor = colors.find(c => c.name === formData.color) || colors[0];
  const totalPrice = 6000 + formData.colorPrice;

  const gallery = ['/section1.jpg', '/section2.jpg', '/section3.jpg', '/section4.jpg', '/section5.jpg'];

  const handleInputChange = (field: keyof PreorderForm, value: string | number | boolean) => {
    if (field === 'color') {
      const selectedColor = colors.find(c => c.name === value);
      const colorPrice = selectedColor?.price || 0;
      
      setFormData(prev => ({
        ...prev,
        color: value as string,
        colorPrice: colorPrice
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Check if user exists, if not create one
      let user = userStorage.getUserByEmail(formData.email);
      
      if (!user) {
        // Create new user from preorder data
        user = userStorage.createUser({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}, ${formData.country}`,
          password: 'preorder-user', // Default password for preorder users
          avatar: '/gallery1.jpg',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          totalOrders: 0,
          totalSpent: 0
        });
      }
      
      // Create preorder record
      const order = userStorage.createOrder({
        userId: user.id,
        date: new Date().toLocaleDateString(),
        status: 'processing',
        items: [`Ryft Z - ${formData.color}`],
        total: totalPrice,
        orderType: 'preorder'
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting preorder:', error);
      alert('Failed to submit preorder. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleBillingToggle = () => {
    setFormData(prev => ({
      ...prev,
      billingSameAsShipping: !prev.billingSameAsShipping
    }));
  };

  const handleBack = () => {
    router.back();
  };

  const renderSuccessMessage = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-12 text-center"
    >
      <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
        <CheckIcon className="w-12 h-12 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Preorder Submitted Successfully!
      </h2>
             <p className="text-lg text-gray-600 mb-6">
         Thank you for preordering the Ryft Z! We've sent a confirmation email with your preorder details.
       </p>
       <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
         <p className="text-blue-800 text-sm">
           <strong>Account Created:</strong> We've automatically created an account for you using your preorder email. 
           You can now log in to your profile to track your preorder status and manage your account.
         </p>
       </div>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200/50">
        <h3 className="text-xl font-bold text-green-900 mb-4">
          What Happens Next?
        </h3>
        <div className="space-y-3 text-left">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
            <span className="text-green-800">
              You'll receive a confirmation email within 24 hours
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-green-800">
              Our team will contact you to arrange the deposit payment
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">3</div>
            <span className="text-green-800">
              Regular updates on production progress and delivery timeline
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <a
          href="/z"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>View Ryft Z Details</span>
          <ArrowLeftIcon className="w-5 h-5 rotate-180" />
        </a>
      </div>
    </motion.div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
        <div className="max-w-4xl mx-auto px-6 py-16">
          {renderSuccessMessage()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
      
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
                 Preorder Ryft Z
               </h1>
               <p className="text-lg text-gray-600 mt-1">Secure Your Place in the Future</p>
               <div className="mt-2">
                                   <span className="inline-block bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium">
                    ⏰ Preorders End October 15th
                  </span>
               </div>
             </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">${totalPrice.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Price</div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                    isFavorite 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-white/20 text-gray-600 hover:bg-white/30'
                  }`}
                >
                  <HeartIcon className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-3 rounded-full bg-white/20 text-gray-600 hover:bg-white/30 backdrop-blur-md transition-all duration-300">
                  <ShareIcon className="w-6 h-6" />
                </button>
              </div>
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
                  src={gallery[selectedImage]}
                  alt="Ryft Z"
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
                      Ryft Z
                    </h2>
                    <p className="text-white/90 text-lg">
                      {selectedColor.name}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-5 h-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="text-white/80 ml-2">4.8</span>
                      </div>
                      <span className="text-white/60">(127 reviews)</span>
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
                {gallery.map((image, index) => (
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
                      alt={`Ryft Z view ${index + 1}`}
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
                <button className="w-full p-4 rounded-2xl border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg transition-all duration-300 text-left transform hover:scale-[1.02]">
                  <div className="flex items-center space-x-4">
                                         <div className="flex-1">
                       <h4 className="font-semibold text-gray-900 text-lg">Ryft Z</h4>
                       <p className="text-gray-600">Starting at $6,000</p>
                       <div className="flex items-center space-x-2 mt-1">
                         <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                           Preorder Special
                         </span>
                         <span className="text-sm text-gray-500 line-through">$7,000</span>
                         <span className="text-sm text-green-600 font-semibold">$6,000</span>
                       </div>
                     </div>
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <CheckIcon className="w-5 h-5" />
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Color Selection */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <EyeIcon className="w-6 h-6 mr-2 text-blue-600" />
                Choose Color
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleInputChange('color', color.name)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                      formData.color === color.name
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
                      {formData.color === color.name && (
                        <div className="bg-blue-500 text-white p-2 rounded-full">
                          <CheckIcon className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

                         {/* Deposit Selection */}
             <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
               <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                 <CreditCardIcon className="w-6 h-6 mr-2 text-blue-600" />
                 Select Deposit Amount
               </h3>
               <div className="space-y-3">
                 {depositOptions.map((option) => (
                   <button
                     key={option.amount}
                     onClick={() => handleInputChange('depositAmount', option.amount)}
                     className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left transform hover:scale-[1.02] ${
                       formData.depositAmount === option.amount
                         ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg'
                         : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                     }`}
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                         <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                           formData.depositAmount === option.amount
                             ? 'border-blue-500 bg-blue-500 text-white'
                             : 'border-gray-300 text-gray-400'
                         }`}>
                           {formData.depositAmount === option.amount ? (
                             <CheckIcon className="w-5 h-5" />
                           ) : (
                             <CreditCardIcon className="w-5 h-5" />
                           )}
                         </div>
                         <div>
                           <h4 className="font-semibold text-gray-900 text-lg">{option.label}</h4>
                           <p className="text-gray-600">{option.description}</p>
                           {option.popular && (
                             <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                               Most Popular
                             </span>
                           )}
                         </div>
                       </div>
                       <div className="text-right">
                         <div className="text-2xl font-bold text-gray-900">
                           ${option.amount.toLocaleString()}
                         </div>
                       </div>
                     </div>
                   </button>
                 ))}
               </div>
             </div>

             {/* Extended Warranty */}
             <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/50">
               <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                 <ShieldCheckIcon className="w-6 h-6 mr-2 text-blue-600" />
                 Extended Warranty
               </h3>
               <div className="space-y-4">
                 <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200/50">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-500 text-white flex items-center justify-center">
                       <ShieldCheckIcon className="w-5 h-5" />
                     </div>
                     <div>
                       <h4 className="font-semibold text-gray-900 text-lg">1 Year Extended Warranty</h4>
                       <p className="text-gray-600">Additional coverage beyond standard warranty</p>
                       <div className="flex items-center space-x-2 mt-2">
                         <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                           Included Free
                         </span>
                       </div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="text-2xl font-bold text-green-600">FREE</div>
                     <div className="text-sm text-green-600">Preorder Bonus</div>
                   </div>
                 </div>
                 <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200/50">
                   <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                       <span className="text-sm font-bold">$</span>
                     </div>
                     <div>
                       <h4 className="font-semibold text-blue-900 text-lg">Preorder Special Pricing</h4>
                       <p className="text-blue-700">Price slashed from $7,000 to $6,000 + FREE Extended Warranty</p>
                     </div>
                   </div>
                 </div>
                 <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-200/50">
                   <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                       <span className="text-sm font-bold">📅</span>
                     </div>
                     <div>
                       <h4 className="font-semibold text-orange-900 text-lg">Delivery Timeline</h4>
                                               <p className="text-orange-700">Preorders end October 15th • Delivery late October - November</p>
                     </div>
                   </div>
                 </div>
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
                        {gallery.map((image, index) => (
                          <div key={index} className="aspect-video rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <Image
                              src={image}
                              alt={`Ryft Z view ${index + 1}`}
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
                          { label: 'Top Speed', value: 120, unit: 'mph', icon: '🚀' },
                          { label: 'Range', value: 200, unit: 'miles', icon: '📍' },
                          { label: 'Power', value: 107, unit: 'hp', icon: '⚡' },
                          { label: 'Battery', value: 15.6, unit: 'kWh', icon: '🔋' },
                          { label: 'Charge Time', value: 2, unit: 'hours', icon: '⏱️' },
                          { label: 'Weight', value: 180, unit: 'lbs', icon: '⚖️' }
                        ].map((spec, index) => (
                          <div key={index} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-4 border border-gray-200/50 transform hover:scale-105 transition-all duration-300">
                            <div className="text-2xl mb-2">{spec.icon}</div>
                            <div className="text-sm text-gray-600 mb-1">{spec.label}</div>
                            <div className="text-2xl font-bold text-gray-900">{spec.value} {spec.unit}</div>
                          </div>
                        ))}
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
                        {[
                          'Smart Connectivity & GPS Navigation',
                          'Mobile App Control & Real-time Monitoring',
                          'Advanced LED Lighting System',
                          'Regenerative Braking Technology',
                          'Youth-Driven Innovation & Design',
                          'Premium Build Quality & Materials'
                        ].map((feature, index) => (
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
                   <span className="font-bold text-gray-900">$6,000</span>
                 </div>
                                 {selectedColor.price > 0 && (
                   <div className="flex justify-between items-center p-3 bg-white/50 rounded-xl">
                     <span className="text-gray-700 font-medium">{selectedColor.name} Color</span>
                     <span className="font-bold text-gray-900">+${selectedColor.price}</span>
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

            {/* Preorder Form */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-3xl p-6 shadow-xl border border-green-200/50">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Preorder?</h3>
                <p className="text-gray-600 mb-6">Complete your preorder form to secure your Ryft Z</p>
                <button
                  onClick={() => {
                    const formElement = document.getElementById('preorder-form');
                    if (formElement) {
                      formElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center space-x-3 mx-auto shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <CalendarIcon className="w-6 h-6" />
                  <span>Complete Preorder - ${totalPrice.toLocaleString()}</span>
                </button>
                                 <p className="text-sm text-gray-500 mt-3">Free shipping worldwide • 3 year warranty included (2 year standard + 1 year FREE extended)</p>
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

        {/* Preorder Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
          id="preorder-form"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 mr-2 text-blue-600" />
              Preorder Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your first name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your last name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your street address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your city"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your state"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                    placeholder="Enter your ZIP code"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Country *
                  </label>
                  <select
                    required
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Australia">Australia</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200/50">
                <div className="flex items-center space-x-3 mb-4">
                  <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900 text-lg">
                    Preorder Summary
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-800">Selected Color:</span>
                    <span className="font-medium text-blue-900">
                      {formData.color} {formData.colorPrice > 0 && `(+$${formData.colorPrice})`}
                    </span>
                  </div>
                                     <div className="flex justify-between">
                     <span className="text-blue-800">Base Price:</span>
                     <span className="font-medium text-blue-900">$6,000</span>
                   </div>
                                     <div className="flex justify-between">
                     <span className="text-blue-800">Color Upgrade:</span>
                     <span className="font-medium text-blue-900">
                       {formData.colorPrice > 0 ? `+$${formData.colorPrice}` : 'Included'}
                     </span>
                   </div>
                   
                  <div className="flex justify-between border-t border-blue-200 pt-3">
                    <span className="text-blue-900 font-semibold">Total Price:</span>
                    <span className="font-bold text-xl text-blue-900">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Deposit Amount:</span>
                    <span className="font-medium text-blue-900">${formData.depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Remaining Balance:</span>
                    <span className="font-medium text-blue-900">${(totalPrice - formData.depositAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-800">Estimated Delivery:</span>
                    <span className="font-medium text-blue-900">{formData.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200/50">
                <div className="flex items-center space-x-3 mb-4">
                  <CreditCardIcon className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-purple-900 text-lg">
                    Billing Address
                  </span>
                </div>
                
                <div className="mb-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.billingSameAsShipping}
                      onChange={handleBillingToggle}
                      className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-purple-700 font-medium">Same as shipping address</span>
                  </label>
                </div>

                {!formData.billingSameAsShipping && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-purple-700">
                        Billing First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.billingFirstName}
                        onChange={(e) => handleInputChange('billingFirstName', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter billing first name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-purple-700">
                        Billing Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.billingLastName}
                        onChange={(e) => handleInputChange('billingLastName', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter billing last name"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 text-purple-700">
                        Billing Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter billing street address"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-purple-700">
                        Billing City *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.billingCity}
                        onChange={(e) => handleInputChange('billingCity', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter billing city"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-purple-700">
                        Billing State/Province *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.billingState}
                        onChange={(e) => handleInputChange('billingState', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter billing state"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-purple-700">
                        Billing ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.billingZipCode}
                        onChange={(e) => handleInputChange('billingZipCode', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                        placeholder="Enter billing ZIP code"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2 text-purple-700">
                        Billing Country *
                      </label>
                      <select
                        required
                        value={formData.billingCountry}
                        onChange={(e) => handleInputChange('billingCountry', e.target.value)}
                        className="w-full px-4 py-3 border border-purple-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Australia">Australia</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Information */}
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200/50">
                <div className="flex items-center space-x-3 mb-4">
                  <CreditCardIcon className="w-5 h-5 text-indigo-600" />
                  <span className="font-semibold text-indigo-900 text-lg">
                    Payment Information
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-indigo-700">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="Name as it appears on card"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-indigo-700">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-indigo-700">
                      Expiry Date *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardExpiry}
                      onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                      className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2 text-indigo-700">
                      CVC *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cardCVC}
                      onChange={(e) => handleInputChange('cardCVC', e.target.value)}
                      className="w-full px-4 py-3 border border-indigo-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-indigo-100 rounded-xl border border-indigo-200">
                  <p className="text-sm text-indigo-700 text-center">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Preorder...</span>
                  </>
                ) : (
                  <>
                    <CreditCardIcon className="w-5 h-5" />
                    <span>Submit Preorder</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-white/50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Questions About Your Preorder?
            </h2>
                         <div className="grid md:grid-cols-2 gap-6 text-center">
                             <div className="flex flex-col items-center space-y-3">
                 <PhoneIcon className="w-8 h-8 text-blue-500" />
                 <div>
                   <div className="font-semibold text-gray-900">Call Us</div>
                   <div className="text-sm text-gray-600">
                     +1 (704) 349-7066
                   </div>
                 </div>
               </div>
               <div className="flex flex-col items-center space-y-3">
                 <EnvelopeIcon className="w-8 h-8 text-green-500" />
                 <div>
                   <div className="font-semibold text-gray-900">Email Us</div>
                   <div className="text-sm text-gray-600">
                     support@ryftebikes.com
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
