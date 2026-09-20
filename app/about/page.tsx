import Image from "next/image";

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
    <main className="px-50 py-20">
      <div className="flex w-full justify-center items-center gap-20">
        <div className="text-6xl">
          <p>Hi,</p>
          <p>I&apos;m Yarik</p>
        </div>
        <div className="relative aspect-square w-64 overflow-hidden rounded-full">
          <Image
            loading="eager"
            className="object-cover bg-neutral-900"
            fill
            sizes=""
            alt="Yarik Arshad Mir"
            src="/images/yarik-hero.png"
          />
        </div>
      </div>
    </main>
  );
}
