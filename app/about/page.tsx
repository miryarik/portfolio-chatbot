import { CodeSquare, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TIMELINE = [
  {
    period: "2026",
    org: "ByteNovators",
    role: "Product Developer",
    note: "Full-stack features and internal systems across Next.js and .NET, through August 2026.",
  },
  {
    period: "2025",
    org: "Chinar Quantum AI",
    role: "Frontend Development Intern",
    note: "Built the company's admin panel and integrated a headless CMS into a monorepo.",
  },
  {
    period: "2020–2024",
    org: "University of Kashmir",
    role: "BTech, Computer Science and Engineering",
    note: "Graduated with an 8.3 GPA.",
  },
];

export default function AboutPage() {
  return (
    <main className="px-50 py-20 grid grid-cols-2 gap-10">
      {/* hero */}
      <div className="flex w-full justify-between items-center p-8 bg-neutral-900 rounded-full">
        <div className="flex-1 text-6xl ml-10">
          <p>Hi,</p>
          <p>I&apos;m Yarik</p>
        </div>
        <div className="relative aspect-square w-64 overflow-hidden rounded-full border-4 border-neutral-600">
          <Image
            loading="eager"
            className="object-cover"
            fill
            sizes=""
            alt="Yarik Arshad Mir"
            src="/images/yarik-hero.png"
          />
        </div>
      </div>

      {/* titles */}
      <div className="flex w-full justify-center items-center p-12">
        <ul className="flex-1 mx-auto w-fit text-6xl space-y-3">
          <li>Software Engineer</li>
          <li>Adventurer</li>
          <li>Artist & Poet</li>
        </ul>
      </div>

      {/* summary */}
      <div className="flex w-full justify-center items-center p-12">
        <div className="flex-1 text-3xl/relaxed space-y-8">
          <p>
            I spend my time balancing logic and creative expression. As a
            software engineer, I love building fun, clean, thoughtful
            applications.
          </p>
          <p>
            When I&apos;m not behind a screen, you&apos;ll usually find me
            logging miles on mountain trails or turning quiet observations into
            poetry.
          </p>

          <div className="flex gap-4 text-xl">
            <Link
              className="bg-blue-500 px-4 py-2  flex gap-2 items-center rounded-full"
              href={"/chat"}
            >
              <MessageCircle size={25} />
              <span className="font-bold">Chat</span>
            </Link>
            <Link
              className="bg-blue-500 px-4 py-2  flex gap-2 items-center rounded-full"
              href={"/projects"}
            >
              <CodeSquare size={25} />
              <span className="font-bold">Projects</span>
            </Link>
            <Link
              className="bg-blue-500 px-4 py-2  flex gap-2 items-center rounded-full"
              href={"/contact"}
            >
              <Mail size={25} />
              <span className="font-bold">Contact</span>
            </Link>
          </div>
        </div>
      </div>

      {/* tech stack */}
      <div className="flex flex-col w-full gap-4 justify-center items-center">
        {/* Backend & Systems */}
        <div className="w-full flex flex-col gap-6 text-6xl">
          <p className="text-4xl ml-14">Backend & Architecture</p>
          <div className="flex w-full justify-between bg-neutral-900 p-12 rounded-full">
            <i className="devicon-java-plain-wordmark"></i>
            <i className="devicon-nodejs-plain-wordmark"></i>
            <i className="devicon-express-original"></i>
            <i className="devicon-postgresql-plain-wordmark"></i>
            <i className="devicon-grpc-plain"></i>
            <i className="devicon-prisma-plain-wordmark"></i>
          </div>
        </div>

        {/* Frontend & Testing */}
        <div className="w-full flex flex-col gap-6 text-6xl">
          <p className="text-4xl ml-14">Frontend & Testing</p>
          <div className="flex w-full justify-between bg-neutral-900 p-12 rounded-full">
            <i className="devicon-typescript-plain"></i>
            <i className="devicon-react-original-wordmark"></i>
            <i className="devicon-nextjs-original-wordmark"></i>
            <i className="devicon-tailwindcss-plain"></i>
            <i className="devicon-jest-plain"></i>
            <i className="devicon-vitest-plain"></i>
          </div>
        </div>

        {/* Tools*/}
        <div className="w-full flex flex-col gap-6 text-6xl">
          <p className="text-4xl ml-14">Tools</p>
          <div className="flex w-full justify-between bg-neutral-900 p-12 rounded-full">
            <i className="devicon-vscode-plain"></i>
            <i className="devicon-intellij-plain"></i>

            <i className="devicon-git-plain"></i>

            <i className="devicon-bash-plain"></i>

            <i className="devicon-postman-plain"></i>

            <i className="devicon-docker-plain"></i>
          </div>
        </div>
      </div>
    </main>
  );
}
