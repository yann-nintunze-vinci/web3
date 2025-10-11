import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { ExpensesProvider } from "./contexts/ExpensesContext";
import FormPage from "./pages/FormPage";
import HomePage from "./pages/HomePage";
import ExpensesPage from "./pages/ExpensesPage";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "add",
        element: <FormPage />,
      },
      {
        path: "expenses",
        element: <ExpensesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ExpensesProvider>
    <RouterProvider router={router} />
  </ExpensesProvider>
);
