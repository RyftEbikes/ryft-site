# Ryft E-Bike Website

A modern, feature-rich e-bike website built with Next.js, React, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Product Showcase**: Ryft Z electric motorcycle with detailed specifications
- **Preorder System**: Complete preorder form with billing and payment
- **User Profiles**: User account management with persistent storage
- **Shopping Cart**: Global cart system integrated across pages
- **Multi-language Support**: English, Spanish, and French
- **AI Chatbot**: Google Gemini AI-powered customer support
- **Admin Dashboard**: View and manage all user data
- **Responsive Design**: Mobile-first design with dark mode support

## 💾 Data Storage System

The website includes a comprehensive data storage system that persists user information across sessions:

### Storage Features

- **User Accounts**: Automatic account creation from preorders
- **Order History**: Track all preorders and purchases
- **Wishlist**: Save favorite products for later
- **Persistent Sessions**: Users stay logged in across browser sessions
- **Data Export**: Admin can export all data as JSON
- **Local Storage**: Uses browser localStorage for data persistence

### How It Works

1. **Preorder Integration**: When users submit a preorder, an account is automatically created
2. **Login System**: Users can log in with their email and password
3. **Data Persistence**: All data is stored in browser localStorage
4. **Admin Access**: Visit `/admin` to view all stored data

### Storage Structure

```typescript
// Users
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  avatar: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

// Orders
interface Order {
  id: string;
  userId: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  items: string[];
  total: number;
  orderType: 'preorder' | 'purchase';
  createdAt: string;
}

// Wishlist
interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: string;
}
```

## 🛠️ Technical Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism effects
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Heroicons for consistent iconography
- **AI Integration**: Google Gemini AI for chatbot functionality
- **State Management**: React Context API for global state
- **Data Storage**: LocalStorage-based persistence system

## 📁 Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   ├── contexts/           # Global state management
│   ├── utils/              # Utility functions and storage
│   ├── z/                  # Ryft Z product page
│   ├── preorder/           # Preorder system
│   ├── profile/            # User profile management
│   ├── admin/              # Admin dashboard
│   ├── compare/            # E-bike comparison tool
│   ├── configurator/       # Product configuration
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout process
│   ├── languages/          # Language selection
│   ├── about/              # About us page
│   └── contact/            # Contact information
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Website**
   - Main site: http://localhost:3000
   - Admin dashboard: http://localhost:3000/admin

## 🔐 Admin Access

The admin dashboard at `/admin` provides:

- **User Management**: View all user accounts and details
- **Order Tracking**: Monitor all preorders and purchases
- **Data Export**: Download all data as JSON files
- **System Management**: Clear all data if needed

**Note**: In production, this should be protected with proper authentication.

## 📱 Key Pages

- **Home** (`/`): Landing page with hero section
- **Ryft Z** (`/z`): Product showcase and specifications
- **Preorder** (`/preorder`): Complete preorder system
- **Profile** (`/profile`): User account management
- **Admin** (`/admin`): System data management
- **Compare** (`/compare`): E-bike comparison tool
- **Configurator** (`/configurator`): Product customization
- **Cart** (`/cart`): Shopping cart management
- **Checkout** (`/checkout`): Purchase completion

## 🔄 Data Flow

1. **User submits preorder** → Account automatically created
2. **User can log in** → Access profile and order history
3. **Data persists** → Stored in browser localStorage
4. **Admin can view** → All data accessible via admin dashboard
5. **Data export** → Download complete dataset as JSON

## 🚧 Future Enhancements

- **Database Integration**: Replace localStorage with real database
- **User Authentication**: Secure login system with JWT tokens
- **Payment Processing**: Real payment gateway integration
- **Email Notifications**: Automated order confirmations
- **Analytics Dashboard**: User behavior and sales analytics
- **Multi-language Content**: Translate all page content

## 📄 License

This project is for demonstration purposes. All rights reserved to Ryft.

## 🤝 Support

For questions about your preorder:
- **Phone**: +1 (704) 349-7066
- **Email**: support@ryftebikes.com

---

Built with ❤️ for the future of electric transportation.
