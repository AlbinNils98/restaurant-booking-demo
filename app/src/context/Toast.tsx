import { createContext, useContext, useState, type ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

type ToastContextType = {
  showToast: (message: string, severity?: "success" | "error" | "warning" | "info") => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error" | "warning" | "info">("info");

  const showToast = (msg: string, sev: typeof severity = "info") => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 450,
            fontSize: "1.2rem",
            padding: "16px 24px",
            borderRadius: "12px",
            boxShadow: "0px 6px 16px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Alert
          severity={severity}
          onClose={() => setOpen(false)}
          sx={{
            fontSize: "1.2rem",
            padding: "12px 16px",
          }}>
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}