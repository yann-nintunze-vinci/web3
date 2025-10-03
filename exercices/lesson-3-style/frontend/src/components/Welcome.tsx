interface WelcomeProps {
  setCurrentPage: (s: string) => void;
}

const Welcome = ({ setCurrentPage }: WelcomeProps) => {
  return (
    <>
      <h1>Expense Sharing App</h1>
      <button onClick={() => setCurrentPage("List")}>View Expense List</button>
      <button onClick={() => setCurrentPage("Add")}>View Expense Form</button>
    </>
  );
};

export default Welcome;
