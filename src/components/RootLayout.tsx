import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto w-full max-w-4xl">
        <Outlet />
      </div>
    </div>
  )
}
