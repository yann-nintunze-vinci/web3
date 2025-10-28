import { NavLink, Outlet } from "react-router";
import { Toaster } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Layout() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <div>
      <nav className="bg-teal-800 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <a href="/">💸 Expenso</a>
        </div>
        <div>
          <NavLink to="/transactions" className="mr-4">
            All Transactions
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/expenses/new" className="mr-4">
                New Expense
              </NavLink>
              <NavLink to="/transfers/new" className="mr-4">
                New Transfer
              </NavLink>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <NavLink to="/login" className="mr-4">
              Login
            </NavLink>
          )}
        </div>
      </nav>

      <main className="p-6">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
