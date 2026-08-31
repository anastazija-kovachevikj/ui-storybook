import { cn } from "@/lib/utils"

/**
 * Recolor a monochrome SVG asset with the current CSS color (text-primary, text-chart-2, …).
 * <img src="*.svg"> cannot inherit theme tokens; CSS mask can.
 */
export function ThemedSvg({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn("block size-4 shrink-0 bg-current", className)}
      style={{
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  )
}
