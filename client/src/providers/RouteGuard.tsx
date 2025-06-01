"use client";

import { PATHS } from "@/constants/routes";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect any non-dashboard path to dashboard
    if (pathname !== PATHS.DASHBOARD && pathname !== "/") {
      router.replace(PATHS.DASHBOARD);
      router.refresh();
    }
  }, [pathname, router]);

  return <>{children}</>;
}

export default RouteGuard;
