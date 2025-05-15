
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Toaster } from './components/ui/toaster.tsx'
import { ToastProvider } from './hooks/use-toast'

createRoot(document.getElementById("root")!).render(
  <ToastProvider>
    <App />
    <Toaster />
  </ToastProvider>
);
