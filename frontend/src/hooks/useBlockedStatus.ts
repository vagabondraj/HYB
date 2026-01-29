/**
 * Hook to check and manage user blocked status
 * 
 * Use this hook in components that need to check if the current user is blocked
 * and conditionally restrict certain actions.
 */

import { useState, useEffect, useCallback } from "react";

interface BlockedStatus {
  isBlocked: boolean;
  warningCount: number;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useBlockedStatus(): BlockedStatus {
  const [isBlocked, setIsBlocked] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      // Replace with your actual user profile/status endpoint
      const response = await fetch("/api/v1/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user status");
      }

      const data = await response.json();
      setIsBlocked(data.data?.isBlocked || false);
      setWarningCount(data.data?.warningCount || 0);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return {
    isBlocked,
    warningCount,
    isLoading,
    error,
    refetch: fetchStatus,
  };
}

/**
 * Helper function to check if an API response indicates blocked status
 */
export function isBlockedResponse(response: Response, data: any): boolean {
  return response.status === 403 && data?.isBlocked === true;
}

/**
 * Wrapper for fetch that automatically handles blocked user responses
 */
export async function fetchWithBlockCheck(
  url: string,
  options: RequestInit = {},
  onBlocked?: (message: string) => void
): Promise<Response> {
  const token = localStorage.getItem("token");
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (response.status === 403) {
    const data = await response.clone().json();
    if (data?.isBlocked && onBlocked) {
      onBlocked(data.message || "Your account is blocked from performing this action.");
    }
  }

  return response;
}
