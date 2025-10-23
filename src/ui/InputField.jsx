function InputField({ type = "text", placeholder, defaultValue }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className="w-full border text-neutral-400 focus:text-neutral-600 border-neutral-200 rounded-md px-4 py-3 
                 focus:outline-none focus:ring-2 focus:ring-normal transition"
    />
  );
}

export default InputField;
