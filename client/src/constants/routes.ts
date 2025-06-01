export const PATHS = {
  DASHBOARD: "/dashboard",
  
  LANDING_PAGE: "/",
  NEXT: "/_next",
  FAVICON: "/favicon.ico",
  ROBOTS: "/robots.txt",
};

export const PUBLIC_PATHS = [
  PATHS.LANDING_PAGE,
  PATHS.NEXT,
  PATHS.FAVICON,
  PATHS.ROBOTS,
];

export const PROTECTED_PATHS = [
  PATHS.DASHBOARD,
];
