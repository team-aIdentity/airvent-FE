export const PRODUCTS = {
  pro: {
    title: "AIRVENT PRO",
    description:
      "Next-generation decentralized air quality monitoring device with crypto rewards",
    price: 499,
    discount: 20,
    keyFeatures: [
      "Real-time air quality monitoring",
      "Earn crypto tokens daily",
      "Wi-Fi 6 mesh network support",
      "4.3 inch Display / Touch Screen Model",
    ],
  },
  titan: {
    title: "AIRVENT TITAN",
    description:
      "Next-generation decentralized air quality monitoring device with crypto rewards",
    price: 799,
    discount: 20,
    keyFeatures: [
      "Real-time air quality monitoring",
      "Earn crypto tokens daily",
      "Wi-Fi 6 mesh network support",
      "7 inch Display / Touch Screen Model",
    ],
  },
} as const;

export type ProductType = keyof typeof PRODUCTS;
