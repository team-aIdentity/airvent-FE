import React from "react";
import { Loader2 } from "lucide-react";
import Container from "@/components/Layout/Container";
import { cn } from "@/lib/utils";

interface LoadingProps {
  withContainer?: boolean;
  className?: string;
  message?: string;
}

export const Loading = ({
  withContainer = false,
  className,
  message = "Loading...",
}: LoadingProps) => {
  const content = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-12",
        className,
      )}
    >
      <Loader2 className="h-8 w-8 animate-spin text-[#10B981]" />
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );

  if (withContainer) {
    return (
      <Container className="bg-white py-5">
        <div className="mx-auto flex w-full max-w-xl flex-col lg:max-w-7xl">
          {content}
        </div>
      </Container>
    );
  }

  return content;
};
