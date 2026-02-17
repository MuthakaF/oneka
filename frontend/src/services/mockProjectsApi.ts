/**
 * Mock Projects API Service
 * 
 * This service simulates an API layer for project data.
 * It can be easily replaced with real API calls later.
 * 
 * Features:
 * - 20% simulated failure rate
 * - 1-2 second network delay
 * - Strongly typed with TypeScript
 * - Production-ready error handling
 */

export interface Milestone {
  id: string;
  name: string;
  completed: boolean;
  dueDate?: string;
}

export interface Project {
  id: string;
  name: string;
  county: string;
  sector: string;
  contractSum: number;
  amountPaid: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  auditStatus: string;
  entity: string;
  lastUpdated: string;
  status: "on-track" | "at-risk" | "completed" | "on-hold" | "investigation";
  milestones: Milestone[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

const mockProjects: Project[] = [
  {
    id: "PRJ-2024-001",
    name: "Nairobi-Thika Highway Expansion Phase III",
    county: "Nairobi",
    sector: "Roads & Transport",
    contractSum: 4850000000,
    amountPaid: 3420000000,
    riskLevel: "critical",
    auditStatus: "Under Review",
    entity: "Kenya National Highways Authority",
    lastUpdated: "2024-01-26T14:00:00Z",
    status: "at-risk",
    milestones: [
      { id: "M1", name: "Phase 1 Excavation", completed: true, dueDate: "2023-06-30" },
      { id: "M2", name: "Foundation Work", completed: true, dueDate: "2023-12-31" },
      { id: "M3", name: "Asphalt Laying", completed: false, dueDate: "2024-06-30" },
      { id: "M4", name: "Final Inspection", completed: false, dueDate: "2024-12-31" },
      { id: "M5", name: "Project Handover", completed: false, dueDate: "2025-03-31" },
    ],
  },
  {
    id: "PRJ-2024-002",
    name: "Kisumu Port Rehabilitation Project",
    county: "Kisumu",
    sector: "Transport",
    contractSum: 2100000000,
    amountPaid: 890000000,
    riskLevel: "medium",
    auditStatus: "Pending Verification",
    entity: "Kenya Ports Authority",
    lastUpdated: "2024-01-25T10:30:00Z",
    status: "on-track",
    milestones: [
      { id: "M1", name: "Facility Assessment", completed: true, dueDate: "2023-09-30" },
      { id: "M2", name: "Procurement Process", completed: true, dueDate: "2024-01-31" },
      { id: "M3", name: "Installation", completed: false, dueDate: "2024-08-31" },
    ],
  },
  {
    id: "PRJ-2024-003",
    name: "Mombasa Water Supply Phase II",
    county: "Mombasa",
    sector: "Water & Sanitation",
    contractSum: 1580000000,
    amountPaid: 1240000000,
    riskLevel: "low",
    auditStatus: "Verified",
    entity: "Mombasa Water & Sewerage Co.",
    lastUpdated: "2024-01-24T09:15:00Z",
    status: "completed",
    milestones: [
      { id: "M1", name: "Design Review", completed: true, dueDate: "2023-03-31" },
      { id: "M2", name: "Pipeline Construction", completed: true, dueDate: "2023-11-30" },
      { id: "M3", name: "System Testing", completed: true, dueDate: "2024-01-15" },
      { id: "M4", name: "Handover", completed: true, dueDate: "2024-01-20" },
    ],
  },
  {
    id: "PRJ-2024-004",
    name: "Eldoret Bypass Construction",
    county: "Uasin Gishu",
    sector: "Roads & Transport",
    contractSum: 6200000000,
    amountPaid: 1850000000,
    riskLevel: "high",
    auditStatus: "Flagged - Lowball Tender",
    entity: "Kenya National Highways Authority",
    lastUpdated: "2024-01-23T16:45:00Z",
    status: "on-hold",
    milestones: [
      { id: "M1", name: "Site Mobilization", completed: true, dueDate: "2023-10-31" },
      { id: "M2", name: "Excavation", completed: false, dueDate: "2024-06-30" },
      { id: "M3", name: "Foundation Pilling", completed: false, dueDate: "2024-09-30" },
    ],
  },
  {
    id: "PRJ-2024-005",
    name: "Garissa County Hospital Upgrade",
    county: "Garissa",
    sector: "Health",
    contractSum: 890000000,
    amountPaid: 445000000,
    riskLevel: "medium",
    auditStatus: "Physical Verification Required",
    entity: "Ministry of Health",
    lastUpdated: "2024-01-22T11:20:00Z",
    status: "at-risk",
    milestones: [
      { id: "M1", name: "Blueprint Finalization", completed: true, dueDate: "2023-08-31" },
      { id: "M2", name: "Construction Phase 1", completed: true, dueDate: "2024-01-31" },
      { id: "M3", name: "Equipment Installation", completed: false, dueDate: "2024-06-30" },
    ],
  },
  {
    id: "PRJ-2024-006",
    name: "Machakos Technical Training Institute",
    county: "Machakos",
    sector: "Education",
    contractSum: 520000000,
    amountPaid: 468000000,
    riskLevel: "low",
    auditStatus: "Verified",
    entity: "Ministry of Education",
    lastUpdated: "2024-01-21T13:00:00Z",
    status: "completed",
    milestones: [
      { id: "M1", name: "Site Preparation", completed: true, dueDate: "2023-05-31" },
      { id: "M2", name: "Building Construction", completed: true, dueDate: "2023-11-30" },
      { id: "M3", name: "Furnishing", completed: true, dueDate: "2024-01-15" },
    ],
  },
  {
    id: "PRJ-2024-007",
    name: "Kakamega County Road Network Upgrade",
    county: "Kakamega",
    sector: "Roads & Transport",
    contractSum: 1250000000,
    amountPaid: 750000000,
    riskLevel: "medium",
    auditStatus: "Under Review",
    entity: "Kenya Rural Roads Authority",
    lastUpdated: "2024-01-20T08:30:00Z",
    status: "on-track",
    milestones: [
      { id: "M1", name: "Survey & Design", completed: true, dueDate: "2023-09-30" },
      { id: "M2", name: "Road Rehabilitation", completed: true, dueDate: "2024-02-28" },
      { id: "M3", name: "Drainage Works", completed: false, dueDate: "2024-05-31" },
    ],
  },
  {
    id: "PRJ-2024-008",
    name: "Nairobi JKIA Terminal 3 Expansion",
    county: "Nairobi",
    sector: "Transport",
    contractSum: 18500000000,
    amountPaid: 8200000000,
    riskLevel: "high",
    auditStatus: "Under Review",
    entity: "Jomo Kenyatta International Airport",
    lastUpdated: "2024-01-19T15:45:00Z",
    status: "at-risk",
    milestones: [
      { id: "M1", name: "Design Phase", completed: true, dueDate: "2023-12-31" },
      { id: "M2", name: "Tender Process", completed: false, dueDate: "2024-03-31" },
      { id: "M3", name: "Construction Phase 1", completed: false, dueDate: "2024-12-31" },
      { id: "M4", name: "Infrastructure Setup", completed: false, dueDate: "2025-06-30" },
    ],
  },
  {
    id: "PRJ-2024-009",
    name: "Kilifi County Water Infrastructure",
    county: "Kilifi",
    sector: "Water & Sanitation",
    contractSum: 780000000,
    amountPaid: 620000000,
    riskLevel: "low",
    auditStatus: "Verified",
    entity: "Kilifi County Government",
    lastUpdated: "2024-01-18T12:15:00Z",
    status: "completed",
    milestones: [
      { id: "M1", name: "Borehole Drilling", completed: true, dueDate: "2023-07-31" },
      { id: "M2", name: "Tank Construction", completed: true, dueDate: "2023-10-31" },
      { id: "M3", name: "Distribution Network", completed: true, dueDate: "2024-01-15" },
    ],
  },
  {
    id: "PRJ-2024-010",
    name: "Isiolo County Hospital Construction",
    county: "Isiolo",
    sector: "Health",
    contractSum: 450000000,
    amountPaid: 180000000,
    riskLevel: "critical",
    auditStatus: "Investigation",
    entity: "Ministry of Health",
    lastUpdated: "2024-01-17T10:00:00Z",
    status: "investigation",
    milestones: [
      { id: "M1", name: "Project Planning", completed: true, dueDate: "2023-08-31" },
      { id: "M2", name: "Construction Start", completed: true, dueDate: "2023-11-30" },
      { id: "M3", name: "Structural Work", completed: false, dueDate: "2024-06-30" },
    ],
  },
  {
    id: "PRJ-2024-011",
    name: "Siaya Solar Power Project",
    county: "Siaya",
    sector: "Energy",
    contractSum: 3200000000,
    amountPaid: 1600000000,
    riskLevel: "medium",
    auditStatus: "Pending Verification",
    entity: "Kenya Electricity Generating Company",
    lastUpdated: "2024-01-16T14:30:00Z",
    status: "on-track",
    milestones: [
      { id: "M1", name: "Site Selection", completed: true, dueDate: "2023-09-30" },
      { id: "M2", name: "Equipment Procurement", completed: true, dueDate: "2024-01-31" },
      { id: "M3", name: "Installation", completed: false, dueDate: "2024-06-30" },
    ],
  },
  {
    id: "PRJ-2024-012",
    name: "Nyeri County Agricultural Development",
    county: "Nyeri",
    sector: "Agriculture",
    contractSum: 350000000,
    amountPaid: 280000000,
    riskLevel: "low",
    auditStatus: "Verified",
    entity: "Ministry of Agriculture",
    lastUpdated: "2024-01-15T09:45:00Z",
    status: "completed",
    milestones: [
      { id: "M1", name: "Training Programs", completed: true, dueDate: "2023-10-31" },
      { id: "M2", name: "Equipment Distribution", completed: true, dueDate: "2024-01-10" },
      { id: "M3", name: "Impact Assessment", completed: true, dueDate: "2024-01-20" },
    ],
  },
];

/**
 * Simulates an API call to fetch projects
 * - 20% failure rate for testing error handling
 * - 1-2 second delay to simulate network latency
 * 
 * @returns Promise that resolves to array of projects
 * @throws Error if simulated failure or network issue occurs
 */
export async function getProjects(): Promise<Project[]> {
  // Simulate network delay (1-2 seconds)
  const delay = Math.random() * 1000 + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate 20% failure rate
  if (Math.random() < 0.2) {
    throw new Error("Failed to fetch projects from server. Please try again!");
  }

  // Return mock projects
  return mockProjects;
}

/**
 * Get a single project by ID
 * Useful for detail pages
 */
export async function getProjectById(id: string): Promise<Project> {
  const delay = Math.random() * 1000 + 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (Math.random() < 0.2) {
    throw new Error("Failed to fetch project details.");
  }

  const project = mockProjects.find((p) => p.id === id);
  if (!project) {
    throw new Error(`Project with ID ${id} not found.`);
  }

  return project;
}

/**
 * Mock API for creating/updating projects
 * Structure ready for real API integration
 */
export async function updateProject(id: string, updates: Partial<Project>): Promise<Project> {
  const delay = Math.random() * 1000 + 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  if (Math.random() < 0.1) {
    throw new Error("Failed to update project!");
  }

  const project = mockProjects.find((p) => p.id === id);
  if (!project) {
    throw new Error(`Project with ID ${id} not found.`);
  }

  return { ...project, ...updates, lastUpdated: new Date().toISOString() };
}
