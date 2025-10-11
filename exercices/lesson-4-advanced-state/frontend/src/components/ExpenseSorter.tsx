interface ExpenseSorterProps {
  setSort: (sort: string) => void;
  sort: string;
}

const ExpenseSorter = ({ setSort, sort }: ExpenseSorterProps) => {
  return (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      style={{ marginBottom: "1em" }}
    >
      <option value="date-desc">Date (Newest First)</option>
      <option value="date-asc">Date (Oldest First)</option>
      <option value="amount-asc">Montant (Asc)</option>
      <option value="amount-desc">Montant (Desc)</option>
    </select>
  );
};

export default ExpenseSorter;
