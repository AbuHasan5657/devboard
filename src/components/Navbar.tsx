import { Link } from "react-router-dom"
import { LayoutDashboard, CircleUser } from "lucide-react"
import { useUser } from "@/context/UserContext"

export default function Navbar() {
  const { username } = useUser()

  return (
    <nav className="bg-black text-lg font-semibold">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          to="/devboard/boards"
          className="flex items-center gap-2 text-sky-400"
        >
          <LayoutDashboard className="size-6" />
          Devboard
        </Link>
        <Link
          to="/devboard/profile"
          className="flex items-center gap-2 text-neutral-400 hover:text-white"
        >
          <CircleUser className="size-6" />
          {username}
        </Link>
      </div>
    </nav>
  )
}
