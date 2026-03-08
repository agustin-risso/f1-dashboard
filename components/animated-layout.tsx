"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function AnimatedLayout({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
