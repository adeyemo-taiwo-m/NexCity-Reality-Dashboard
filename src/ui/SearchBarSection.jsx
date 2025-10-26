function SearchBarSection({ item1, item2 }) {
  return (
    <div className="flex flex-col tab:flex-row items-center justify-between w-full bg-[var(--color-white)] rounded-lg p-3 gap-4 shadow-sm">
      {item1}

      <div className="flex justify-between items-center gap-3">{item2}</div>
    </div>
  );
}

export default SearchBarSection;
