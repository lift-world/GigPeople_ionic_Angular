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
  refBids: any[];
  status: number;
  timestamp: Date;
}

