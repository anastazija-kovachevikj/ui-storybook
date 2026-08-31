"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { avatarUrl } from "@/components/dashboard/data"
import { cn } from "@/lib/utils"

const tipAvatars = ["stephan", "maya", "jordan"]

export function TipBanner({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-6 overflow-hidden rounded-xl border-0 bg-card p-0 shadow-none ring-1 ring-foreground/10",
        className
      )}
    >
      <div className="relative aspect-[395/257] w-full shrink-0 overflow-hidden rounded-t-xl">
        <img
          src="/dashboard/crm-tip-blog.jpg"
          alt=""
          className="size-full object-cover object-center"
        />
      </div>
      <CardContent className="flex flex-1 flex-col p-8 pt-0">
        <div className="space-y-2">
          <p className="text-lg font-semibold leading-7 text-foreground">
            Figma tips and tricks with Stephan
          </p>
          <div className="text-sm leading-5 text-muted-foreground">
            <p>Nullam lobortis sodales dolor vitae viverra.</p>
            <p>Cras lacinia bibendum metus vel rhoncus.</p>
          </div>
        </div>
        <div className="flex items-start pt-10">
          <div className="flex">
            {tipAvatars.map((seed, index) => (
              <Avatar
                key={seed}
                className={cn(
                  "size-10 border-2 border-card",
                  index > 0 && "-ml-2"
                )}
              >
                <AvatarImage src={avatarUrl(seed)} alt="" />
                <AvatarFallback>{seed.slice(0, 1).toUpperCase()}</AvatarFallback>
              </Avatar>
            ))}
            <div className="-ml-2 flex size-10 items-center justify-center rounded-full border-2 border-card bg-muted text-base font-medium text-foreground">
              +4
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TipBanner
