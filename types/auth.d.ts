type User = {
  firstName: string;
  lastName: string;
  token: string;
};

type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
  };
};

type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

type MarketingConfig = {
  mainNav: MainNavItem[];
};

type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

type MainNavItem = NavItem;

type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);
