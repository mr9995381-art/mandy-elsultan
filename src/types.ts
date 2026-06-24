export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  price: number;
  category: 'mandi_haneeth' | 'chicken' | 'trays' | 'grills' | 'appetizers' | 'desserts_drinks';
  image: string;
  spicy?: boolean;
  popular?: boolean;
  optionsLabelAr?: string;
  optionsLabelEn?: string;
  options?: string[]; // e.g., ['ربع دجاجة', 'نصف دجاجة', 'دجاجة كاملة']
  optionPrices?: number[]; // Price additions relative to base price (or base price matches first option)
  hasRiceChoice?: boolean;
}

export interface CartItem {
  menuItemId: string;
  nameAr: string;
  nameEn: string;
  price: number;
  quantity: number;
  selectedOption?: string;
  optionPriceAddition?: number;
  selectedRice?: string; // e.g., 'أرز بسمتي أصفر', 'أرز أحمر حار'
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  isVerified?: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
