export interface EmployeePerformance {
  id: string;
  name: string;
  avatarUrl?: string;
  packagesPicked: number;
  targetPackages?: number;
}

export interface TeamPerformance {
  totalPackagesPicked: number;
  targetPackages: number;
  pendingOrders: number;
  shippedToday: number;
}

export interface DashboardData {
  updatedAt: string;
  employees: EmployeePerformance[];
  team: TeamPerformance;
}
