/**
 * Blocked User Banner Component
 * 
 * Displays a warning banner when a user's account is blocked.
 * Should be shown at the top of the page for blocked users.
 */

import { AlertOctagon, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BlockedUserBannerProps {
  warningCount?: number;
  isBlocked: boolean;
}

export function BlockedUserBanner({ warningCount = 0, isBlocked }: BlockedUserBannerProps) {
  if (!isBlocked) return null;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertOctagon className="h-5 w-5" />
      <AlertTitle>Account Restricted</AlertTitle>
      <AlertDescription className="mt-2">
        <p>
          Your account has been temporarily blocked due to repeated policy violations
          ({warningCount} warnings received).
        </p>
        <p className="mt-2 text-sm">
          While blocked, you cannot:
        </p>
        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
          <li>Create new requests</li>
          <li>Send messages</li>
          <li>Submit reports</li>
        </ul>
        <p className="mt-2 text-sm">
          You can still view your profile and read notifications.
          If you believe this is a mistake, please contact support.
        </p>
      </AlertDescription>
    </Alert>
  );
}

interface WarningBannerProps {
  warningCount: number;
  threshold?: number;
}

export function WarningBanner({ warningCount, threshold = 11 }: WarningBannerProps) {
  if (warningCount === 0) return null;

  const isHighRisk = warningCount >= threshold - 3; // 8+ warnings

  return (
    <Alert variant={isHighRisk ? "destructive" : "default"} className="mb-4">
      <Info className="h-5 w-5" />
      <AlertTitle>Account Warning</AlertTitle>
      <AlertDescription>
        <p>
          Your account has received {warningCount} warning{warningCount !== 1 ? "s" : ""}.
          {isHighRisk && (
            <span className="font-medium">
              {" "}Your account may be blocked at {threshold} warnings.
            </span>
          )}
        </p>
        <p className="text-sm mt-1">
          Please ensure you follow our community guidelines to avoid account restrictions.
        </p>
      </AlertDescription>
    </Alert>
  );
}
