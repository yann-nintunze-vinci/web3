import graphqlClient from "@/lib/graphql-client";
import type { Expense } from "@/types/Expense";
import { gql } from "@apollo/client";
import type { LoaderFunctionArgs } from "react-router-dom";

const EXPENSE_QUERY = gql`
  query ExpenseDetail($id: Int!) {
    expense(id: $id) {
      id
      description
      amount
      date
      payer {
        bankAccount
        name
      }
      participants {
        id
        name
      }
    }
  }
`;

export interface LoaderData {
  expense: Expense;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { data, error } = await graphqlClient.query<LoaderData>({
    query: EXPENSE_QUERY,
    variables: { id: parseInt(params.id || '') },
  });

  if (!data?.expense || error) {
    throw new Error(
      "Error while retrieving expense details from the server: " + error
    );
  }

  return { expense: data.expense };
};
