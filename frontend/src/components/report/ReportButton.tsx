/**
 * Report Button Component
 * 
 * A button that opens the report dialog for a specific user.
 * Can be placed on user profiles, chat interfaces, etc.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Flag } from "lucide-react";
import { ReportForm } from "./ReportForm";

interface ReportButtonProps {
  userId: string;
  userName?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
  className?: string;
}

export function ReportButton({
  userId,
  userName = "this user",
  variant = "ghost",
  size = "sm",
  showText = true,
  className,
}: ReportButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Flag className={showText ? "h-4 w-4 mr-2" : "h-4 w-4"} />
          {showText && "Report"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <ReportForm
          reportedUserId={userId}
          reportedUserName={userName}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
