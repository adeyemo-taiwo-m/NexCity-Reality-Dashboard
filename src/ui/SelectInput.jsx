function SelectInput({ options }) {
  return (
    <select
      className="border border-color-neutral-200 text-neutral-800 rounded-md px-3 py-2 text-sm 
                       focus:outline-none focus:ring-2 focus:ring-color-normal transition"
    >
      {options.map((option, i) => (
        <option className="text-neutral-500" key={i}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
