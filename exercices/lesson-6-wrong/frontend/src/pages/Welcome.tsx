import { useAuth } from "@/contexts/AuthContext";
import { NavLink } from "react-router";

const Welcome = () => {
  const { user, isAuthenticated } = useAuth();
  return (
    <div className="text-center">
      <h1 className="text-5xl">Welcome to the Expense Tracker</h1>
      {isAuthenticated ? (
        <div className="text-center py-12">Welcome {user?.email}</div>
      ) : (
        <div className="text-center py-12">Welcome stranger !</div>
      )}
      <div className="flex flex-row gap-4 justify-center">
        <button className="bg-green-800 text-white hover:bg-green-700 rounded-full px-6">
          <NavLink to="/transactions">View Transactions</NavLink>
        </button>
        {isAuthenticated && (
          <button className="bg-green-800 text-white hover:bg-green-700 rounded-full px-6">
            <NavLink to="/expenses/new">Add Expense</NavLink>
          </button>
        )}
      </div>
    </div>
  );
};

export default Welcome;
