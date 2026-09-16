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
    <div className="absolute h-screen flex flex-col justify-center ml-4">
      <div className="relative flex flex-col justify-center items-center gap-2 bg-neutral-800 p-1.5 rounded-[100px] group text-sm hover:rounded-[22px]">
        {PATHS.map((p) => (
          <NavItem key={p.label} path={p} active={pathname === p.path} />
        ))}
      </div>
    </div>
  );
}

function NavItem({ path, active = false }: { path: Path; active: boolean }) {
  return (
    <div
      className={cn("rounded-full w-full p-1.5", {
        "bg-blue-500": active,
      })}
    >
      <Link href={path.path} className="mx-auto w-full flex gap-2">
        {path.icon}{" "}
        <span className="hidden group-hover:block">{path.label}</span>
      </Link>
    </div>
  );
}
