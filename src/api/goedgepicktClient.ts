import type { DashboardData } from '../types/dashboard';

const DEFAULT_REFRESH_INTERVAL = 30_000;

export interface DashboardClientOptions {
  baseUrl?: string;
  apiKey?: string;
  refreshInterval?: number;
}

export class GoedgepicktClient {
  private readonly baseUrl: string;
  private readonly apiKey?: string;
  readonly refreshInterval: number;

  constructor(options: DashboardClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? import.meta.env.VITE_API_BASE_URL ?? '/api';
    this.apiKey = options.apiKey ?? import.meta.env.VITE_GOEDGEPIKT_API_KEY;
    this.refreshInterval = options.refreshInterval ?? DEFAULT_REFRESH_INTERVAL;
  }

  async fetchDashboardData(signal?: AbortSignal): Promise<DashboardData> {
    const response = await fetch(`${this.baseUrl}/dashboard`, {
      headers: this.buildHeaders(),
      cache: 'no-store',
      signal
    });

    if (!response.ok) {
      throw new Error(`Failed to load dashboard data: ${response.statusText}`);
    }

    const payload = (await response.json()) as DashboardData;
    return payload;
  }

  private buildHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    return headers;
  }
}

const client = new GoedgepicktClient();

export const fetchDashboardData = (signal?: AbortSignal) => client.fetchDashboardData(signal);
export const refreshInterval = client.refreshInterval;
