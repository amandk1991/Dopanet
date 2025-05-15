
import { useState } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
}

export type ToastActionElement = React.ReactElement;

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    const newToast = { ...props, id };
    setToasts((toasts) => [...toasts, newToast]);

    if (props.duration !== Infinity) {
      setTimeout(() => {
        setToasts((toasts) => toasts.filter((t) => t.id !== id));
      }, props.duration || 5000);
    }

    return {
      id,
      dismiss: () => setToasts((toasts) => toasts.filter((t) => t.id !== id)),
      update: (props: Omit<Toast, "id">) => {
        setToasts((toasts) =>
          toasts.map((t) => (t.id === id ? { ...t, ...props } : t))
        );
      },
    };
  };

  return {
    toast,
    toasts,
    dismiss: (id: string) => setToasts((toasts) => toasts.filter((t) => t.id !== id)),
  };
}

// For direct usage of toast function
export const toast = (props: Omit<Toast, "id">) => {
  // This is a placeholder that will be overridden in components/ui/use-toast.ts
  throw new Error("toast() is not implemented. You need to use the useToast() hook instead.");
};
