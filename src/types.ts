export interface Card {
  id: string;
  number: string;
  holder: string;
  expiry: string;
  limit: number;
  balance: number;
  bank: string;
  color: string;
  dueDate: number;
  closingDate: number;
}

export interface Transaction {
  id: string;
  cardId: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  installments?: {
    current: number;
    total: number;
    amount: number;
  };
}

export interface Goal {
  id: string;
  category: string;
  amount: number;
  currentAmount: number;
  deadline: string;
  color: string;
}

export interface SpendingAlert {
  id: string;
  type: 'limit' | 'category' | 'goal';
  message: string;
  date: string;
  read: boolean;
}

export interface CategoryBudget {
  category: string;
  limit: number;
  spent: number;
  color: string;
}