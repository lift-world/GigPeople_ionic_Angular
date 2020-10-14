
export interface TaskFilter {
  location: string;
  category: string;
  keywords: string[];
  minFixed: number;
  maxFixed: number;
  minHourly: number;
  maxHourly: number;
  skills: string[];
}
