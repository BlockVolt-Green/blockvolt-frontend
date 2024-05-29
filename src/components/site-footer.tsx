import * as React from "react";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <img src="/images/logo.png" className="w-8 h-8"/>
          <p className="text-center text-sm leading-loose md:text-left">
            {/* Built on Arbitrum by #TeamQuasar with ❤️ */}
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
