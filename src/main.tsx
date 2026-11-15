import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import { BoardsProvider } from "./context/BoardsProvider"
import { UserProvider } from "./context/UserProvider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BoardsProvider>
        <App />
      </BoardsProvider>
    </UserProvider>
  </StrictMode>
)
