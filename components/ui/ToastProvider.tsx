"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  pushToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

function getToastClasses(type: ToastType) {
  if (type === "success") {
    return "border-[rgba(107,91,62,0.34)] bg-[rgba(245,234,200,0.98)] text-[color:var(--foreground)]";
  }

  if (type === "error") {
    return "border-[rgba(168,39,30,0.36)] bg-[rgba(168,39,30,0.08)] text-[color:var(--foreground)]";
  }

  return "border-[rgba(107,91,62,0.3)] bg-[rgba(245,234,200,0.98)] text-[color:var(--foreground)]";
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const pushToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);

    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  }, []);

  const value = useMemo(() => ({ pushToast }), [pushToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed left-4 right-4 top-20 z-[80] flex flex-col gap-3 sm:left-auto sm:max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-[2px] border px-4 py-3 text-sm font-medium shadow-lg ${getToastClasses(
              toast.type
            )}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  return context;
}

