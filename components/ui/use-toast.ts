import type React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

type ToastType = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000

type ToasterToast = ToastType

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_VALUE
  return count.toString()
}

const toasts: ToasterToast[] = []

type ToasterType = {
  toast: (props: Omit<ToasterToast, "id">) => string
  dismiss: (toastId?: string) => void
  toasts: ToasterToast[]
}

const toaster: ToasterType = {
  toast: (props) => {
    const id = genId()

    const toast: ToasterToast = {
      ...props,
      id,
    }

    toasts.push(toast)

    return id
  },
  dismiss: (toastId?: string) => {
    if (toastId) {
      const index = toasts.findIndex((toast) => toast.id === toastId)
      if (index !== -1) {
        toasts.splice(index, 1)
      }
    } else {
      toasts.splice(0, toasts.length)
    }
  },
  toasts,
}

export function useToast() {
  return toaster
}

