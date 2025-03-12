"use client"

import type React from "react"

import { Input } from "@/components/atoms/Input"
import { Label } from "@/components/atoms/Label"

interface FormFieldProps {
  id: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} />
    </div>
  )
}

