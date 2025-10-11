import { useLocation, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = (s: string) => {
    return location.pathname === s ? "!font-bold" : "!font-normal";
  };
  
  return (
    <nav
      className="flex justify-center bg-green-800
    shadow-sm hover:cursor-pointer gap-5 py-5 mb-8"
    >
      <a className={currentPage("/")} onClick={() => navigate("/")}>
        Welcome
      </a>
      <a
        className={currentPage("/expenses")}
        onClick={() => navigate("/expenses")}
      >
        All Expenses
      </a>
      <a className={currentPage("/add")} onClick={() => navigate("/add")}>
        Add Expense
      </a>
    </nav>
  );
};

export default NavBar;
