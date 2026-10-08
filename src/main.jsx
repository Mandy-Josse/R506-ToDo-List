import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; // ☝️ Importe le fichier CSS global de l'application
//...
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
