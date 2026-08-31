"use client"

import { MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const products = [
  {
    name: "iPhone 13 pro max-Pacific Blue-128GB storage",
    initials: "IP",
    paid: "$180",
    total: "$499",
    payment: "Partially paid",
    status: "Confirmed",
    pct: 36,
  },
  {
    name: "Apple MacBook Pro 13 inch-M1-8/256GB-space",
    initials: "MB",
    paid: "$120",
    total: "$499",
    payment: "Full paid",
    status: "Completed",
    pct: 100,
  },
  {
    name: "PlayStation 5 DualSense Wireless Controller",
    initials: "PS",
    paid: "$120",
    total: "$499",
    payment: "Cancelled",
    status: "Cancelled",
    pct: 24,
  },
  {
    name: "Amazon Basics Mesh, Mid-Back, Swivel Office",
    initials: "AM",
    paid: "$120",
    total: "$499",
    payment: "Partially paid",
    status: "Confirmed",
    pct: 24,
  },
  {
    name: "Sony X85J 75 Inch Sony 4K Ultra HD LED Smart",
    initials: "SN",
    paid: "$120",
    total: "$499",
    payment: "Full paid",
    status: "Completed",
    pct: 100,
  },
]

export function ProductsPaymentTable({ className }: { className?: string }) {
  return (
    <Card
      className={cn(
        "rounded-2xl border-0 bg-card shadow-none ring-1 ring-border",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-base font-semibold">Products</CardTitle>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-5">Products</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="pr-5 text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((row) => (
              <TableRow key={row.name}>
                <TableCell className="pl-5">
                  <div className="flex items-center gap-3">
                    <Avatar size="sm" className="size-9">
                      <AvatarFallback>{row.initials}</AvatarFallback>
                    </Avatar>
                    <p className="max-w-[260px] truncate text-sm font-medium">
                      {row.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="min-w-36 space-y-1">
                    <div className="text-sm font-medium">
                      {row.paid}/{row.total}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {row.payment}
                    </div>
                    <Progress value={row.pct} />
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={cn(
                      "border-0 shadow-none",
                      row.status === "Cancelled"
                        ? "bg-destructive/10 text-destructive"
                        : row.status === "Completed"
                          ? "bg-success/10 text-success"
                          : "bg-primary/10 text-primary"
                    )}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-5 text-right">
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    className="text-muted-foreground"
                    aria-label={`Open ${row.name}`}
                  >
                    <MoreHorizontal className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default ProductsPaymentTable
