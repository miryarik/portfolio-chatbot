import { ConstructionIcon, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <ConstructionIcon
        size={100}
        className="m-4 p-3 bg-blue-500 text-white rounded-2xl"
      />
      <h2 className="text-2xl font-bold">
        This section is under construction.
      </h2>
      <p className="text-foreground/50">
        I am working on it, it&apos;ll be here soon.
      </p>

      <div className={"rounded-full p-2 px-3 text-white bg-blue-500 my-4"}>
        <Link href={"/"} className="mx-auto w-full flex gap-2">
          {<MessageCircle />} <span className="">Chat with me</span>
        </Link>
      </div>
    </div>
  );
}
