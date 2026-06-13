import { Outlet } from "react-router-dom";


const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout