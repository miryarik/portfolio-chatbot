"use client";

import { motion } from "framer-motion";

const PARTICLES = [
  { delay: 0, rotate: 8 },
  { delay: -0.4, rotate: 36 },
  { delay: -0.9, rotate: 72 },
  { delay: -0.5, rotate: 90 },
  { delay: -0.3, rotate: 144 },
  { delay: -0.2, rotate: 180 },
  { delay: -0.6, rotate: 216 },
  { delay: -0.7, rotate: 252 },
  { delay: -0.1, rotate: 300 },
  { delay: -0.8, rotate: 324 },
  { delay: -1.2, rotate: 335 },
  { delay: -0.5, rotate: 290 },
  { delay: -0.2, rotate: 240 },
];

const TIMES = Array.from({ length: 21 }, (_, i) => i / 20);
const X_FRACTIONS = [
  0.5, 0.4, 0.3, 0.2, 0.1, 0, -0.1, -0.2, -0.3, -0.4, -0.5, -0.4, -0.3, -0.2,
  -0.1, 0, 0.1, 0.2, 0.3, 0.4, 0.5,
];
const SCALES = [
  0.7368, 0.6842, 0.6316, 0.5789, 0.5263, 0.4737, 0.5263, 0.5789, 0.6316,
  0.6842, 0.7368, 0.7895, 0.8421, 0.8947, 0.9474, 1, 0.9474, 0.8947, 0.8421,
  0.7895, 0.7368,
];
const OPACITIES = [
  0.65, 0.58, 0.51, 0.44, 0.37, 0.3, 0.37, 0.44, 0.51, 0.58, 0.65, 0.72, 0.79,
  0.86, 0.93, 1, 0.93, 0.86, 0.79, 0.72, 0.65,
];

type QuantumLoaderProps = {
  size?: number;
  speed?: number;
  className?: string;
};

export default function QuantumLoader({
  size = 5,
  speed = 2.5,
  className = "",
}: QuantumLoaderProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      animate={{ rotate: 360 }}
      transition={{ duration: speed * 4, repeat: Infinity, ease: "linear" }}
    >
      {PARTICLES.map(({ delay, rotate }, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ transform: `rotate(${rotate}deg)` }}
        >
          <motion.span
            className="absolute top-1/2 left-1/2 rounded-full bg-foreground"
            style={{
              width: size * 0.175,
              height: size * 0.175,
              marginLeft: -(size * 0.0875),
              marginTop: -(size * 0.0875),
            }}
            animate={{
              x: X_FRACTIONS.map((f) => f * size),
              scale: SCALES,
              opacity: OPACITIES,
            }}
            transition={{
              duration: speed,
              delay: delay * speed,
              times: TIMES,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      ))}
    </motion.div>
  );
}
