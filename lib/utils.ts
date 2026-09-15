import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
type Message = { role: "user" | "assistant"; content: string };

export const sampleChat: Message[] = [
  {
    role: "user",
    content: "Hey, who are you?",
  },
  {
    role: "assistant",
    content:
      "Hi! I am Yarik's AI portfolio assistant. You can ask me about Yarik's background, projects, technical skills, work experience, or how to contact him!",
  },
  {
    role: "user",
    content: "Nice! What is Yarik's background?",
  },
  {
    role: "assistant",
    content:
      "Yarik is a full-stack software engineer with a strong foundation in modern web technologies. He focuses on building fast, accessible, and high-performance web applications using modern JavaScript and TypeScript frameworks.",
  },
  {
    role: "user",
    content: "What are his main technical skills?",
  },
  {
    role: "assistant",
    content:
      "His core tech stack includes:\n- **Frontend:** TypeScript, React, Next.js, Vue, Tailwind CSS, Redux Toolkit\n- **Backend:** Node.js, Express, NestJS, Python (FastAPI)\n- **Databases:** PostgreSQL, MongoDB, Redis, Prisma ORM\n- **DevOps & Tools:** Docker, AWS, Vercel, Git/GitHub CI/CD pipelines",
  },
  {
    role: "user",
    content: "Can you tell me about some recent projects he built?",
  },
  {
    role: "assistant",
    content: `Here are a few key projects I've worked on, ranging from full-scale production applications to personal engineering experiments:

* **TravelByte CRM:** A complex product I heavily contributed to during my time at ByteNovators. It targeted a very unorganized industry domain with vague requirements, so I had to use a lot of my own judgment. I owned and delivered over a dozen features end-to-end—handling everything from the Next.js/React UIs down to the backend APIs, handlers, database models, and data flow design.
* **Distributed .NET Project (Freelance):** A recent project where I've been working with .NET, ASP.NET Core, gRPC, PostgreSQL, and Entity Framework Core to explore distributed-system concepts, alongside Next.js for the public-facing side.
* **ColorWars:** An in-progress side project written in Java. It's a basic two-player game over WebSockets, built specifically to teach myself real-time architecture, matchmaking, connection state handling, and authoritative server logic. 
* **3D Renderer:** A small low-level experiment focused on understanding how geometry, 3D transformations, and rendering operate under the hood without relying on high-level engines.
* **Watcha Watching:** A smaller, utility-focused application for tracking and exploring media. I built it as practice for integrating external APIs and shipping a complete, clean, smaller-scale app.

Let me know if you'd like to dive deeper into the tech stack or architecture behind any of these!`,
  },
  {
    role: "user",
    content: "Has he worked on any open-source or design-focused projects?",
  },
  {
    role: "assistant",
    content:
      "Yes! Yarik cares deeply about UI/UX. He has developed several open-source UI component libraries, interactive WebGL animations, and pixel-perfect design system implementations using Framer Motion.",
  },
  {
    role: "user",
    content: "What is his work experience like?",
  },
  {
    role: "assistant",
    content:
      "Yarik has worked across both fast-paced startup environments and freelance consulting. He has experience taking products from initial architecture and database schema design all the way to production deployment and performance optimization.",
  },
  {
    role: "user",
    content: "Is he available for freelance or full-time opportunities?",
  },
  {
    role: "assistant",
    content:
      "Yes! Yarik is currently open to full-time engineering roles, contract work, and select freelance opportunities. He thrives in remote or hybrid team settings.",
  },
  {
    role: "user",
    content: "Awesome, how can I reach out to him or see his resume?",
  },
  {
    role: "assistant",
    content:
      "You can reach out directly via the **Contact** form at the bottom of this page, download his PDF resume using the navigation button, or connect with him on GitHub and LinkedIn!",
  },
];
