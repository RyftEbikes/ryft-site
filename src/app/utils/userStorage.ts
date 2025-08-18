// User data storage utility
// This provides a simple storage system that can later be upgraded to a real database

export interface UserProfile {
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

export interface Order {
  id: string;
  userId: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  items: string[];
  total: number;
  orderType: 'preorder' | 'purchase';
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  addedAt: string;
}

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get current timestamp
const getTimestamp = (): string => {
  return new Date().toISOString();
};

// User Storage Class
class UserStorage {
  private readonly USERS_KEY = 'ryft_users';
  private readonly ORDERS_KEY = 'ryft_orders';
  private readonly WISHLIST_KEY = 'ryft_wishlist';
  private readonly CURRENT_USER_KEY = 'ryft_current_user';

  // Initialize storage
  private initStorage() {
    if (typeof window === 'undefined') return;
    
    if (!localStorage.getItem(this.USERS_KEY)) {
      localStorage.setItem(this.USERS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.ORDERS_KEY)) {
      localStorage.setItem(this.ORDERS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.WISHLIST_KEY)) {
      localStorage.setItem(this.WISHLIST_KEY, JSON.stringify([]));
    }
  }

  // Get all users
  private getUsers(): UserProfile[] {
    this.initStorage();
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  // Save all users
  private saveUsers(users: UserProfile[]) {
    this.initStorage();
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Get all orders
  private getOrders(): Order[] {
    this.initStorage();
    const orders = localStorage.getItem(this.ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
  }

  // Save all orders
  private saveOrders(orders: Order[]) {
    this.initStorage();
    localStorage.setItem(this.ORDERS_KEY, JSON.stringify(orders));
  }

  // Get all wishlist items
  private getWishlistItems(): WishlistItem[] {
    this.initStorage();
    const wishlist = localStorage.getItem(this.WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  }

  // Save all wishlist items
  private saveWishlistItems(items: WishlistItem[]) {
    this.initStorage();
    localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(items));
  }

  // User Management
  createUser(userData: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>): UserProfile {
    const users = this.getUsers();
    
    // Check if email already exists
    if (users.find(user => user.email === userData.email)) {
      throw new Error('User with this email already exists');
    }

    const newUser: UserProfile = {
      ...userData,
      id: generateId(),
      createdAt: getTimestamp(),
      updatedAt: getTimestamp()
    };

    users.push(newUser);
    this.saveUsers(users);
    
    // Set as current user
    this.setCurrentUser(newUser);
    
    return newUser;
  }

  updateUser(userId: string, updates: Partial<UserProfile>): UserProfile {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      updatedAt: getTimestamp()
    };

    this.saveUsers(users);
    
    // Update current user if it's the same user
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      this.setCurrentUser(users[userIndex]);
    }
    
    return users[userIndex];
  }

  getUserById(userId: string): UserProfile | null {
    const users = this.getUsers();
    return users.find(user => user.id === userId) || null;
  }

  getUserByEmail(email: string): UserProfile | null {
    const users = this.getUsers();
    return users.find(user => user.email === email) || null;
  }

  // Authentication
  login(email: string, password: string): UserProfile {
    const user = this.getUserByEmail(email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    this.setCurrentUser(user);
    return user;
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getCurrentUser(): UserProfile | null {
    const currentUser = localStorage.getItem(this.CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  }

  private setCurrentUser(user: UserProfile) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  // Order Management
  createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Order {
    const orders = this.getOrders();
    
    const newOrder: Order = {
      ...orderData,
      id: generateId(),
      createdAt: getTimestamp()
    };

    orders.push(newOrder);
    this.saveOrders(orders);
    
    // Update user's order count and total spent
    this.updateUserStats(orderData.userId, newOrder.total);
    
    return newOrder;
  }

  getUserOrders(userId: string): Order[] {
    const orders = this.getOrders();
    return orders.filter(order => order.userId === userId);
  }

  updateOrderStatus(orderId: string, status: Order['status']): Order {
    const orders = this.getOrders();
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }

    orders[orderIndex].status = status;
    this.saveOrders(orders);
    
    return orders[orderIndex];
  }

  // Wishlist Management
  addToWishlist(userId: string, productData: Omit<WishlistItem, 'id' | 'userId' | 'addedAt'>): WishlistItem {
    const wishlist = this.getWishlistItems();
    
    // Check if item already exists
    const existingItem = wishlist.find(item => 
      item.userId === userId && item.productId === productData.productId
    );
    
    if (existingItem) {
      throw new Error('Item already in wishlist');
    }

    const newItem: WishlistItem = {
      ...productData,
      id: generateId(),
      userId,
      addedAt: getTimestamp()
    };

    wishlist.push(newItem);
    this.saveWishlistItems(wishlist);
    
    return newItem;
  }

  removeFromWishlist(userId: string, productId: string): void {
    const wishlist = this.getWishlistItems();
    const filteredWishlist = wishlist.filter(item => 
      !(item.userId === userId && item.productId === productId)
    );
    
    this.saveWishlistItems(filteredWishlist);
  }

  getUserWishlist(userId: string): WishlistItem[] {
    const wishlist = this.getWishlistItems();
    return wishlist.filter(item => item.userId === userId);
  }

  // User Statistics
  private updateUserStats(userId: string, orderTotal: number) {
    const user = this.getUserById(userId);
    if (user) {
      this.updateUser(userId, {
        totalOrders: user.totalOrders + 1,
        totalSpent: user.totalSpent + orderTotal
      });
    }
  }

  // Data Export (for admin purposes)
  exportAllData(): string {
    const data = {
      users: this.getUsers(),
      orders: this.getOrders(),
      wishlist: this.getWishlistItems(),
      exportDate: getTimestamp()
    };
    
    return JSON.stringify(data, null, 2);
  }

  // Data Import (for admin purposes)
  importData(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.users) {
        localStorage.setItem(this.USERS_KEY, JSON.stringify(data.users));
      }
      if (data.orders) {
        localStorage.setItem(this.ORDERS_KEY, JSON.stringify(data.orders));
      }
      if (data.wishlist) {
        localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(data.wishlist));
      }
    } catch (error) {
      throw new Error('Invalid data format');
    }
  }

  // Clear all data (for testing/reset purposes)
  clearAllData(): void {
    localStorage.removeItem(this.USERS_KEY);
    localStorage.removeItem(this.ORDERS_KEY);
    localStorage.removeItem(this.WISHLIST_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}

// Create and export a single instance
export const userStorage = new UserStorage();

// Export types for use in other files
export type { UserProfile, Order, WishlistItem };
