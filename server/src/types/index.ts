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

export enum TestRunType {
  SANITY = 'sanity',
  SMOKE = 'smoke',
  REGRESSION = 'regression'
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
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
    expiresAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface TestRun {
  id: string;
  projectId: string;
  type: TestRunType;
  testCases: string[];
  assignedTesters: string[];
  status: 'pending' | 'in-progress' | 'completed';
  duration: number;
  device: string;
  os: string;
  location: string;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  id: string;
  testerId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  type: 'hourly' | 'bonus';
  description: string;
  periodStart: Date;
  periodEnd: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Certification {
  id: string;
  title: string;
  description: string;
  requiredScore: number;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
} 