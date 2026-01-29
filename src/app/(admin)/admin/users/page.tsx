"use client"

import * as React from "react"
import { Check, X, AlertCircle } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// --- Types ---
type PaymentStatus = "paid" | "pending"

interface User {
  id: string
  name: string
  email: string
  paymentStatus: PaymentStatus
  registeredAt: string
}

// --- Mock Data ---
const MOCK_USERS: User[] = [
  {
    id: "u1",
    name: "Alice Johnson",
    email: "alice@example.com",
    paymentStatus: "paid",
    registeredAt: "2023-10-15T10:00:00Z",
  },
  {
    id: "u2",
    name: "Bob Smith",
    email: "bob@example.com",
    paymentStatus: "pending",
    registeredAt: "2023-10-16T14:30:00Z",
  },
  {
    id: "u3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    paymentStatus: "pending",
    registeredAt: "2023-10-17T09:15:00Z",
  },
  {
    id: "u4",
    name: "Diana Prince",
    email: "diana@example.com",
    paymentStatus: "paid",
    registeredAt: "2023-10-18T11:45:00Z",
  },
  {
    id: "u5",
    name: "Evan Wright",
    email: "evan@example.com",
    paymentStatus: "pending",
    registeredAt: "2023-10-19T16:20:00Z",
  },
]

export default function UsersPage() {
  const [users, setUsers] = React.useState<User[]>(MOCK_USERS)
  const [filter, setFilter] = React.useState<"all" | PaymentStatus>("all")

  // Filter users based on selection
  const filteredUsers = React.useMemo(() => {
    if (filter === "all") return users
    return users.filter((user) => user.paymentStatus === filter)
  }, [users, filter])

  // --- Action: Approve Payment ---
  // Reusing logic conceptualized from src/app/api/stripe/checkout/route.ts
  // In a real app, this would call a Server Action or API endpoint.
  const handleApprovePayment = async (userId: string) => {
    console.log(`Approving payment for user ${userId}...`)
    
    // Simulate API call
    // await fetch(`/api/users/${userId}/approve-payment`, { method: 'POST' })
    
    // Optimistic update
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, paymentStatus: "paid" } : user
      )
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            Filtrar por estado:
          </span>
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as "all" | PaymentStatus)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado de Pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="paid">Pagado</SelectItem>
              <SelectItem value="pending">Pendiente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Fecha de Registro</TableHead>
              <TableHead>Estado de Pago</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No se encontraron usuarios.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat('es-ES', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }).format(new Date(user.registeredAt))}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.paymentStatus === "paid" ? "default" : "secondary"
                      }
                      className={
                        user.paymentStatus === "paid"
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }
                    >
                      {user.paymentStatus === "paid" ? "Pagado" : "Pendiente"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.paymentStatus === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => handleApprovePayment(user.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Aprobar
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* TODO: Connect to Supabase to fetch real data */}
      {/* import { supabase } from "@/lib/supabase" */}
    </div>
  )
}
