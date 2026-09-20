"use client";
import { CodeSquare, Mail, MessageCircle, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Path {
  path: string;
  icon: ReactNode;
  label: string;
}

const PATHS: Path[] = [
  { path: "/", icon: <User2 size={20} />, label: "About" },
  { path: "/chat", icon: <MessageCircle size={20} />, label: "Chat" },
  { path: "/projects", icon: <CodeSquare size={20} />, label: "Projects" },
  { path: "/contact", icon: <Mail size={20} />, label: "Contact" },
];

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="absolute top-0 flex flex-col gap-2 ml-4 mt-4 p-2 bg-nav-bg-color shadow-nav-shadow rounded-full">
      {PATHS.map((p) => (
        <NavItem key={p.label} path={p} active={pathname === p.path} />
      ))}
    </nav>
  );
}

function NavItem({ path, active = false }: { path: Path; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-full w-full p-1.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {active && (
        <motion.div
          layoutId="active-nav-bg"
          className={"absolute inset-0 bg-blue-500 rounded-full"}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}

      <Link
        href={path.path}
        className={cn("relative z-10 mx-auto w-full flex gap-2 items-center", {
          "text-white": active,
        })}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "absolute left-12 text-foreground bg-nav-bg-color px-2 rounded-lg whitespace-nowrap",
              )}
            >
              {path.label}
            </motion.div>
          )}
        </AnimatePresence>
        {path.icon}
      </Link>
    </div>
  );
}
