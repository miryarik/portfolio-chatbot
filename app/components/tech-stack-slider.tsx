// src/app/components/tech-stack-slider.tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const CATEGORIES = [
  {
    title: "Backend & Architecture",
    icons: [
      "devicon-java-plain-wordmark",
      "devicon-nodejs-plain-wordmark",
      "devicon-express-original",
      "devicon-postgresql-plain-wordmark",
      "devicon-grpc-plain",
      "devicon-prisma-plain-wordmark",
    ],
  },
  {
    title: "Frontend & Testing",
    icons: [
      "devicon-typescript-plain",
      "devicon-react-original-wordmark",
      "devicon-nextjs-original-wordmark",
      "devicon-tailwindcss-plain",
      "devicon-jest-plain",
      "devicon-vitest-plain",
    ],
  },
  {
    title: "Tools",
    icons: [
      "devicon-vscode-plain",
      "devicon-intellij-plain",
      "devicon-git-plain",
      "devicon-bash-plain",
      "devicon-postman-plain",
      "devicon-docker-plain",
    ],
  },
];

export default function TechStackSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % CATEGORIES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [index]);

  const current = CATEGORIES[index];

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-6 ">
      <div className="relative min-h-40 sm:min-h-48 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col gap-4  mx-auto max-w-250 "
          >
            <p className="text-2xl sm:text-3xl md:text-4xl text-center ">
              {current.title}
            </p>

            <div className="bg-solid-bg-color xl:shadow-solid-shadow rounded-full flex justify-center sm:justify-evenly items-center gap-6 p-6 md:px-12">
              {current.icons.map((icon) => (
                <i
                  key={icon}
                  className={`${icon} text-3xl sm:text-4xl md:text-5xl lg:text-6xl`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-2">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.title}
            onClick={() => setIndex(i)}
            aria-label={`Show ${cat.title}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? "bg-blue-500" : "bg-neutral-300 dark:bg-neutral-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
