import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import RootLayout from "./components/RootLayout"
import BoardOverview from "./pages/BoardOverview/BoardOverview"
import BoardDetail from "./pages/BoardDetail/BoardDetail"
import Profile from "./pages/Profile/Profile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/devboard/boards" replace /> },
      { path: "devboard/boards", element: <BoardOverview /> },
      { path: "devboard/boards/:boardId", element: <BoardDetail /> },
      { path: "devboard/profile", element: <Profile /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
