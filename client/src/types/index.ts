export enum UserRole {
  ADMIN = 'admin',
  TESTER = 'tester',
  CLIENT = 'client'
}

export enum TesterTier {
  UNRATED = 'unrated',
  RATED = 'rated',
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Tester extends User {
  tier: TesterTier;
  certifications: string[];
  bugAcceptanceRate: number;
  hourlyRate: number;
  location: {
    country: string;
    city: string;
    timezone: string;
  };
}

export interface Client extends User {
  company: string;
  industry: string;
  subscription: {
    plan: string;
    status: string;
    expiresAt: string;
  };
}

export interface TestCase {
  id: string;
  projectId: string;
  title: string;
  description: string;
  steps: string[];
  expectedResult: string;
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Issue {
  id: string;
  testRunId: string;
  testCaseId: string;
  reportedBy: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-review' | 'accepted' | 'rejected' | 'fixed';
  attachments: string[];
  createdAt: string;
  updatedAt: string;
} 