/**
 * Admin Report Card Component
 * 
 * Displays a single report for admin review.
 * Used in the admin reports management page.
 */

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Shield,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Report {
  _id: string;
  reporter: {
    _id: string;
    username: string;
    email?: string;
  };
  reportedUser: {
    _id: string;
    username: string;
    email?: string;
    warningCount?: number;
    isBlocked?: boolean;
  };
  reason: string;
  description: string;
  status: "pending" | "reviewed" | "resolved" | "dismissed";
  isValidated: boolean;
  aiSeverity?: "low" | "medium" | "high" | "critical";
  adminNotes?: string;
  createdAt: string;
  reviewedAt?: string;
}

interface AdminReportCardProps {
  report: Report;
  onStatusUpdate?: (reportId: string, status: string) => void;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending", icon: Clock },
  { value: "reviewed", label: "Reviewed", icon: AlertTriangle },
  { value: "resolved", label: "Resolved", icon: CheckCircle },
  { value: "dismissed", label: "Dismissed", icon: XCircle },
];

const SEVERITY_COLORS: Record<string, string> = {
  low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

const REASON_LABELS: Record<string, string> = {
  spam: "Spam",
  harassment: "Harassment",
  inappropriate_content: "Inappropriate Content",
  fake_profile: "Fake Profile",
  scam: "Scam",
  hate_speech: "Hate Speech",
  violence: "Violence",
  impersonation: "Impersonation",
  other: "Other",
};

export function AdminReportCard({ report, onStatusUpdate }: AdminReportCardProps) {
  const [status, setStatus] = useState<string>(report.status);
  const [adminNotes, setAdminNotes] = useState(report.adminNotes || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleStatusUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/v1/report/${report._id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status, adminNotes }),
      });

      if (!response.ok) {
        throw new Error("Failed to update report");
      }

      toast({
        title: "Report Updated",
        description: `Report status changed to ${status}`,
      });

      onStatusUpdate?.(report._id, status);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUnblockUser = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/v1/report/unblock/${report.reportedUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ resetWarnings: false }),
      });

      if (!response.ok) {
        throw new Error("Failed to unblock user");
      }

      toast({
        title: "User Unblocked",
        description: `${report.reportedUser.username} has been unblocked`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unblock user",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const StatusIcon = STATUS_OPTIONS.find((s) => s.value === report.status)?.icon || Clock;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              {REASON_LABELS[report.reason] || report.reason}
            </CardTitle>
            <CardDescription>
              Reported {formatDistanceToNow(new Date(report.createdAt), { addSuffix: true })}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {report.isValidated && (
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3 w-3" />
                AI Validated
              </Badge>
            )}
            {report.aiSeverity && (
              <Badge className={SEVERITY_COLORS[report.aiSeverity]}>
                {report.aiSeverity.toUpperCase()}
              </Badge>
            )}
            <Badge variant={report.status === "pending" ? "destructive" : "secondary"}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {report.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Users involved */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Reporter</p>
              <p className="text-muted-foreground">{report.reporter.username}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-md bg-muted">
            <User className="h-4 w-4 text-destructive" />
            <div>
              <p className="font-medium">Reported User</p>
              <p className="text-muted-foreground">
                {report.reportedUser.username}
                {report.reportedUser.isBlocked && (
                  <Badge variant="destructive" className="ml-2 text-xs">
                    Blocked
                  </Badge>
                )}
              </p>
              {report.reportedUser.warningCount !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {report.reportedUser.warningCount} warnings
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm font-medium mb-1">Description</p>
          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
            {report.description}
          </p>
        </div>

        {/* Admin controls */}
        <div className="space-y-3 pt-2 border-t">
          <div className="flex items-center gap-3">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {report.reportedUser.isBlocked && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleUnblockUser}
                disabled={isUpdating}
              >
                Unblock User
              </Button>
            )}
          </div>

          <Textarea
            placeholder="Admin notes (optional)..."
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            rows={2}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleStatusUpdate}
          disabled={isUpdating || status === report.status}
          className="ml-auto"
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Status"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
