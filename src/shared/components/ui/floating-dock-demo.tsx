import { FloatingDock } from "../../container/floating-dock";
import {
  IconCurrencyRupee,
  IconHome,
  IconPlus,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";

export function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Friends",
      icon: (
        <IconUser className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/friends",
    },
    {
      title: "Groups",
      icon: (
        <IconUsersGroup className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/groups",
    },
    {
      title: "Add_expense",
      icon: (
        <IconPlus className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/create_transactions",
    },

    {
      title: "Transactions",
      icon: (
        <IconCurrencyRupee className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/transactions",
    },
    {
      title: "Profile",
      icon: (
        <img
          src="/icon.png"
          width={40}
          height={40}
          alt="BillSplitter Logo"
        />
      ),
      href: "/profile",
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-50 dark:bg-neutral-900 shadow-lg rounded-full px-6 py-3">
      <FloatingDock items={links} />
    </div>
  );
}

