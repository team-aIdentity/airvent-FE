export type User = {
  id: string;
  email: string;
  password: string;
  nickname: string;
  role: "user" | "admin";
  createAt: string;
  orders: Order[];
};

export type Order = {
  id: string;
  userId: string;
  productType: string;
  color: string;
  price: number;
  transactionId: string | null;
  status: string;
  createdAt: string;
  shipping: Shipping | null;
  user: User | null;
};

export type Shipping = {
  id: string;
  orderId: string;
  email: string;
  evmWalletAddress: string | null;
  solanaWalletAddress: string | null;
  country: string;
  residentRegNumber: string | null;
  personalClearanceNum: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetAddress: string;
  apartment: string | null;
  city: string;
  state: string | null;
  postalCode: string;
  phone: string;
  trackingNumber?: string | null;
  carrier?: string | null;
  shippedAt?: string | null;
  deliveredAt?: string | null;
  createdAt: string;
};
