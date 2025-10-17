import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "@/pages/HomePage";
import Layout, { layoutLoader } from "@/pages/Layout";
import Transactions, { transactionsLoader } from "./pages/Transactions";
import ExpenseDetail, { expenseDetailLoader } from "./pages/ExpenseDetail";
import NewTransfer, { NewTransferLoader } from "./pages/NewTransfer";

const router = createBrowserRouter([
  {
    Component: Layout,
    loader: layoutLoader,
    id: "layout",

    children: [
      { index: true, Component: HomePage },
      {
        path: "transactions",
        Component: Transactions,
        loader: transactionsLoader,
      },
      {
        path: "expenses/:id",
        Component: ExpenseDetail,
        loader: expenseDetailLoader,
      },
      {
        path: "transfers/new",
        Component: NewTransfer,
        loader: NewTransferLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
