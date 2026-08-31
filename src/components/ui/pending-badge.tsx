"use client"

import type { ComponentProps } from "react"
import { Loader } from "lucide-react"
import { motion, useReducedMotion, type Variants } from "motion/react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const LETTER_VARIANTS: Variants = {
  hidden: { y: -14, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.038,
      duration: 0.35,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
}

type PendingBadgeProps = Omit<
  ComponentProps<typeof Badge>,
  "variant" | "children"
> & {
  label?: string
}

function PendingBadge({
  label = "Pending",
  className,
  ...props
}: PendingBadgeProps) {
  const reduceMotion = useReducedMotion()

  return (
    <Badge
      variant="status-pending"
      className={cn("cursor-default", className)}
      {...props}
    >
      <motion.span
        aria-hidden
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
        className="flex size-4 shrink-0 items-center justify-center text-badge-glow-warning"
      >
        <Loader size={16} strokeWidth={2.5} />
      </motion.span>
      <span className="sr-only">{label}</span>
      <span aria-hidden className="inline-flex overflow-hidden leading-none">
        {label.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            custom={i}
            variants={LETTER_VARIANTS}
            initial={reduceMotion ? "visible" : "hidden"}
            animate="visible"
            className="inline-block whitespace-pre leading-normal"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </Badge>
  )
}

export { PendingBadge }
