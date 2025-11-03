import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { fetchDashboardData, refreshInterval } from '../api/goedgepicktClient';
import type { DashboardData } from '../types/dashboard';

export interface UseDashboardDataResult {
  data?: DashboardData;
  isLoading: boolean;
  error?: Error;
  lastUpdated?: Date;
  refresh: () => Promise<void>;
}

export const useDashboardData = (): UseDashboardDataResult => {
  const [data, setData] = useState<DashboardData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();
  const [lastUpdated, setLastUpdated] = useState<Date>();
  const controllerRef = useRef<AbortController>();

  const refresh = useCallback(async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetchDashboardData(controller.signal);
      setData(response);
      setLastUpdated(new Date(response.updatedAt ?? Date.now()));
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();

    const interval = window.setInterval(() => {
      refresh().catch(() => undefined);
    }, refreshInterval);

    return () => {
      window.clearInterval(interval);
      controllerRef.current?.abort();
    };
  }, [refresh]);

  return useMemo(
    () => ({
      data,
      isLoading,
      error,
      lastUpdated,
      refresh
    }),
    [data, error, isLoading, lastUpdated, refresh]
  );
};
