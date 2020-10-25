export interface User {
  _id: string;
  createdAt: any;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  avatar: string;
  refWorkerProfile: any;
  refEmployerProfile: any;
  refFinancialProfile: any;
}

export interface Category { 
  _id: any;
  title: string;
}

export interface Skill {
  _id: any;
  title: string;
}

export interface Task {
  _id: any;
  refCreator: any;
  refCategory: any;
  refSkills: any[];
  title: string;
  description: string;
  filePath: string;
  country: string;
  minBudget: number;
  maxBudget: number;
  isHourly: boolean;
  timestamp: string;
  refBids: any[];
  refContract: any;
}

export interface Bid {
  _id: any;
  refTask: any;
  refBidder: any;
  description: string;
  budget: number;
  duration: number;
  timestamp: string;
}
