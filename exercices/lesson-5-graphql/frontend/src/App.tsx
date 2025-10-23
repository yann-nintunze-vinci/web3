import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "@/pages/HomePage";
import Layout, { layoutLoader } from "@/pages/Layout";
import Transactions, { transactionsLoader } from "./pages/Transactions";
import ExpenseDetail, { expenseDetailLoader } from "./pages/ExpenseDetail";
import NewTransfer, { NewTransferLoader } from "./pages/NewTransfer";
import { ApolloProvider } from "@apollo/client/react";
import client from "./lib/graphql-client";
import NewExpense, { newExpenseLoader } from "./pages/NewExpense";

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
      {
        path: "expenses/new",
        Component: NewExpense,
        loader: newExpenseLoader,
      },
    ],
  },
]);

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  );
};

export default App;
