// src/types/auth.ts

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  subscriptionStatus?: 'active' | 'inactive' | 'trial';
  affiliateId?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethodId?: string;
  createdAt: Date;
  updatedAt: Date;
  invoiceUrl?: string;
  downloadLinks?: DownloadLink[];
}

export interface OrderItem {
  productId: string;
  productTitle: string;
  price: number;
  quantity: number;
  licenseType: 'personal' | 'commercial' | 'enterprise';
  licenseKey?: string;
}

export interface DownloadLink {
  id: string;
  url: string;
  expiresAt: Date;
  downloadCount: number;
  maxDownloads?: number;
}

export interface License {
  id: string;
  key: string;
  productId: string;
  userId: string;
  type: 'personal' | 'commercial' | 'enterprise';
  status: 'active' | 'expired' | 'revoked';
  expiresAt?: Date;
  activations: number;
  maxActivations: number;
}

export interface Affiliate {
  id: string;
  userId: string;
  code: string;
  commissionRate: number; // percentage
  totalEarnings: number;
  pendingEarnings: number;
  clicks: number;
  conversions: number;
  status: 'pending' | 'active' | 'suspended';
  createdAt: Date;
}

export interface AnalyticsEvent {
  id: string;
  userId?: string;
  eventType: 'view' | 'click' | 'purchase' | 'download' | 'affiliate_click';
  productId?: string;
  metadata: Record<string, any>;
  timestamp: Date;
}
