
import { useState } from "react";
import { createContext, useContext } from "react";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  duration?: number;
  variant?: "default" | "destructive";
}

export type ToastActionElement = React.ReactElement;

type ToastContextType = {
  toasts: Toast[];
  toast: (props: Omit<Toast, "id">) => { id: string; dismiss: () => void; update: (props: Omit<Toast, "id">) => void };
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
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

  const dismiss = (id: string) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
  };

  return { toasts, toast, dismiss };
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const toast = (props: Omit<Toast, "id">) => {
  const { toast } = useToast();
  return toast(props);
};
