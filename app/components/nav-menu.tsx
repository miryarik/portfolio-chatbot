"use client";
import { cn } from "@/lib/utils";
import { CodeSquare, Mail, MessageCircle, User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Path {
  path: string;
  icon: ReactNode;
  label: string;
}

const PATHS: Path[] = [
  { path: "/", icon: <MessageCircle size={20} />, label: "Chat" },
  { path: "/about", icon: <User2 size={20} />, label: "About" },
  { path: "/projects", icon: <CodeSquare size={20} />, label: "Projects" },
  { path: "/contact", icon: <Mail size={20} />, label: "Contact" },
];

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="absolute flex flex-col gap-2 ml-4 mt-4 p-2 bg-nav-bg-color rounded-full">
      {PATHS.map((p) => (
        <NavItem key={p.label} path={p} active={pathname === p.path} />
      ))}
    </nav>
  );
}

function NavItem({ path, active = false }: { path: Path; active: boolean }) {
  return (
    <div
      className={cn("rounded-full w-full p-1.5", {
        "bg-blue-500": active,
      })}
    >
      <Link
        href={path.path}
        className="relative mx-auto w-full flex gap-2 group"
      >
        <Tooltip label={path.label} />
        {path.icon}{" "}
      </Link>
    </div>
  );
}

function Tooltip({ label }: { label: string }) {
  return (
    <div className="absolute hidden left-12 bg-nav-bg-color px-2 rounded-lg group-hover:block">
      {label}
    </div>
  );
}
