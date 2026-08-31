"use client"

import { Search, Star } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const reviews = [
  {
    product: "iPhone 13 pro max-Pacific Blue-128GB storage",
    customer: "Arlene McCoy",
    email: "macoy@arlene.com",
    initials: "AM",
    review:
      "This theme is great. Clean and easy to understand. Perfect for those who don't have time to",
    status: "Completed",
    time: "Nov 8",
    rating: 5,
  },
  {
    product: "Apple MacBook Pro 13 inch-M1-8/256GB-space",
    customer: "Jerome Bell",
    email: "belljerome@yahoo.com",
    initials: "JB",
    review:
      "It is a Mac, after all. Once you have gone Mac, there's no going back. My first Mac lasted over nine years",
    status: "Pending",
    time: "Nov 7",
    rating: 4,
  },
  {
    product: "PlayStation 5 DualSense Wireless Controller",
    customer: "Jacob Jones",
    email: "jones009@hotmail.com",
    initials: "JJ",
    review:
      "The best experience we could hope for. Customer service team is amazing and the quality of their products",
    status: "Pending",
    time: "Nov 6",
    rating: 5,
  },
  {
    product: "Amazon Basics Mesh, Mid-Back, Swivel Office",
    customer: "Messey Jones",
    email: "jones009@hotmail.com",
    initials: "MJ",
    review:
      "The controller is quite comfy for me. Despite its increased size, the controller still fits well",
    status: "Completed",
    time: "Nov 5",
    rating: 4,
  },
  {
    product: "Sony X85J 75 Inch Sony 4K Ultra HD LED Smart",
    customer: "Annette Black",
    email: "blackanne@yahoo.com",
    initials: "AB",
    review:
      "The controller is quite comfy for me. Despite its increased size, the controller still fits well",
    status: "Pending",
    time: "Nov 4",
    rating: 4,
  },
]

export function LatestReviews({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="text-base font-semibold">Latest Reviews</CardTitle>
          <p className="text-xs text-muted-foreground">
            Reviewed received across all channels
          </p>
        </div>
        <div className="relative w-full max-w-[220px]">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="h-9 rounded-full border-border bg-background pl-8 text-sm shadow-none"
          />
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-10 pl-5">
                <Checkbox aria-label="Select all reviews" />
              </TableHead>
              <TableHead>#</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Reviews</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5">Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.map((row, index) => (
              <TableRow key={`${row.customer}-${row.time}`}>
                <TableCell className="pl-5">
                  <Checkbox aria-label={`Select review ${index + 1}`} />
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <p className="max-w-[220px] truncate text-sm font-medium">
                    {row.product}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" className="size-8">
                      <AvatarFallback>{row.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{row.customer}</p>
                      <p className="text-xs text-muted-foreground">{row.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[280px] space-y-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "size-3.5",
                            i < row.rating
                              ? "fill-warning text-warning"
                              : "text-muted-foreground/40"
                          )}
                        />
                      ))}
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                      {row.review}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "border-0 shadow-none",
                      row.status === "Completed"
                        ? "bg-success/10 text-success"
                        : "bg-warning/10 text-warning"
                    )}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-5 text-muted-foreground">
                  {row.time}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3">
          <p className="text-xs text-muted-foreground">1-6 of 32</p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-muted-foreground"
            >
              Previous
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs text-muted-foreground"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestReviews
