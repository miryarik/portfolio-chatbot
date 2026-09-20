"use client";
import { CodeSquare, Mail, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import TechStackSlider from "./components/tech-stack-slider";
import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutPage() {
  return (
    <motion.main
      variants={container}
      initial="hidden"
      animate="show"
      className="px-4 sm:px-8 md:px-16 py-10 grid grid-cols-1 xl:grid-cols-2 place-items-center gap-8 md:gap-10"
    >
      <div>
        {/* hero */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row w-full sm:w-fit justify-between items-center gap-6 sm:gap-12 px-6 sm:p-8 xl:bg-solid-bg-color xl:shadow-solid-shadow xl:w-full rounded-full"
        >
          <div className="flex-1 text-3xl hidden sm:block sm:text-4xl md:text-5xl lg:text-6xl text-center sm:text-left sm:ml-10">
            <p>Hi,</p>
            <p className="text-nowrap">I&apos;m Yarik</p>
          </div>
          <div className="relative aspect-square w-32 sm:w-48 md:w-64 overflow-hidden rounded-full border-20 border-solid-bg-color shadow-solid-shadow xl:shadow-none bg-solid-bg-color shrink-0">
            <Image
              loading="eager"
              className="object-cover"
              fill
              sizes="(max-width: 640px) 8rem, (max-width: 768px) 12rem, 16rem"
              alt="Yarik Arshad Mir"
              src="/images/yarik-hero.png"
            />
          </div>
          <div className="sm:hidden flex-1 flex text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center sm:text-left sm:ml-10">
            <p>Hi, I&apos;m Yarik</p>
          </div>
        </motion.div>

        {/* titles */}
        <motion.div
          variants={item}
          className="w-fit px-12 mx-auto sm:w-120 justify-center items-center p-4 sm:p-8 md:w-150 xl:w-fit mt-4 bg-solid-bg-color shadow-solid-shadow xl:shadow-none  xl:bg-transparent rounded-full"
        >
          <ul className="mx-auto xl:mx-0 w-fit text-2xl sm:text-3xl md:text-4xl space-y-1 sm:space-y-3 md:text-left">
            <li>
              Engineer{" "}
              <span className="ml-2 text-neutral-500 text-sm sm:text-2xl">
                by profession
              </span>
            </li>
            <li>
              Adventurer{" "}
              <span className="ml-2 text-neutral-500 text-sm sm:text-2xl">
                on weekends
              </span>
            </li>
            <li>
              Artist & Poet{" "}
              <span className="ml-2 text-neutral-500 text-sm sm:text-2xl">
                by night
              </span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* summary */}
      <motion.div
        variants={item}
        className="flex w-full justify-center items-center p-4 sm:p-8 md:p-12"
      >
        <div className="flex-1 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed space-y-6 sm:space-y-8">
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

          <div className="flex flex-wrap gap-3 sm:gap-4 text-lg sm:text-xl">
            <Link
              className="bg-blue-500 px-4 text-white py-2 flex gap-2 items-center rounded-full"
              href="/chat"
            >
              <MessageCircle size={22} />
              <span className="font-bold">Chat</span>
            </Link>
            <Link
              className="bg-blue-500 text-white px-4 py-2 flex gap-2 items-center rounded-full"
              href="/projects"
            >
              <CodeSquare size={22} />
              <span className="font-bold">Projects</span>
            </Link>
            <Link
              className="bg-blue-500 text-white px-4 py-2 flex gap-2 items-center rounded-full"
              href="/contact"
            >
              <Mail size={22} />
              <span className="font-bold">Contact</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* tech stack — now a cycling slider */}
      <motion.div
        variants={item}
        className="flex w-full items-center xl:col-span-2 "
      >
        <TechStackSlider />
      </motion.div>
    </motion.main>
  );
}
