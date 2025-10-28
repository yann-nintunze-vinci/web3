import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./pages/Layout";
import Welcome from "./pages/Welcome";
import Transactions, {
  loader as transactionsLoader,
} from "./pages/Transactions";
import ExpenseDetail, {
  loader as expenseDetailLoader,
} from "./pages/ExpenseDetails";
import NewTransfer, { loader as NewTransferLoader } from "./pages/NewTransfer";
import NewExpense, { loader as NewExpenseLoader } from "./pages/NewExpense";
import { ApolloProvider } from "@apollo/client/react";
import client from "./lib/graphql-client";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Welcome />,
      },
      {
        path: "expenses/new",
        element: (
          <ProtectedRoute>
            <NewExpense />
          </ProtectedRoute>
        ),
        loader: NewExpenseLoader,
      },
      {
        path: "expenses/:id",
        element: <ExpenseDetail />,
        loader: expenseDetailLoader,
      },
      {
        path: "transfers/new",
        element: (
          <ProtectedRoute>
            <NewTransfer />
          </ProtectedRoute>
        ),
        loader: NewTransferLoader,
      },
      {
        path: "transactions",
        element: <Transactions />,
        loader: transactionsLoader,
      },
      {},
    ],
  },
]);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ApolloProvider client={client}>
          <RouterProvider router={router} />
        </ApolloProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
