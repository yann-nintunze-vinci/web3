interface ExpenseSorterProps {
  setSort: (sort: string) => void;
  sort: string;
}

const ExpenseSorter = ({ setSort, sort }: ExpenseSorterProps) => {
  return (
    <select value={sort} onChange={(e) => setSort(e.target.value)}>
      <option value="">-- Trier par --</option>
      <option value="date-asc">Date ↑</option>
      <option value="date-desc">Date ↓</option>
      <option value="amount-asc">Montant ↑</option>
      <option value="amount-desc">Montant ↓</option>
    </select>
  );
};

export default ExpenseSorter;
