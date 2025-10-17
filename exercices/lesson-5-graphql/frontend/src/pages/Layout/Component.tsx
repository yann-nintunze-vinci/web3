import { NavLink, Outlet, useLoaderData, useNavigate } from "react-router";
import { useState } from "react";
import type { User } from "@/types/User";
import type { LoaderData } from "./loader";
import type { ChangeEvent } from "react";

const Layout = () => {
  const { users } = useLoaderData<LoaderData>();
  const [currentUser, setCurrentUser] = useState<null | User>(null);

  const navigate = useNavigate();
  const handleUserChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const newCurrentUser = users.find((user) => user.id === Number(id)) ?? null;
    setCurrentUser(newCurrentUser);
  };

  const outletContext = {
    currentUser,
  };

  return (
    <div>
      <nav className="bg-teal-800 text-white p-4 flex justify-between items-center">
        <button className="text-xl font-bold" onClick={() => navigate("/")}>
          💸 Expenso
        </button>
        <div>
          <NavLink to="/transactions" className="mr-4">
            All Transactions
          </NavLink>
          <NavLink to="/transfers/new" className="mr-4">
            New Transfer
          </NavLink>

          <select
            value={currentUser?.id ?? "none"}
            className="bg-white text-black rounded px-2"
            onChange={handleUserChange}
          >
            <option value="none">— No User —</option>
            {users?.map((u: User, key) => (
              <option key={key} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>
      </nav>

      <main className="p-6">
        <Outlet context={outletContext} />
      </main>
    </div>
  );
};

export default Layout;
