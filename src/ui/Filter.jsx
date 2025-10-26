import { useSearchParams } from "react-router-dom";

function Filter({ field, options }) {
  const [searchParam, setSearchParam] = useSearchParams();
  const curActiveValue = searchParam.get(field) || "all";
  function handleClick(value) {
    searchParam.set(field, value);
    setSearchParam(searchParam);
  }
  return (
    <div className="bg-white p-2 rounded-lg shadow-sm flex ">
      {options?.map((option) => (
        <button
          key={option.id}
          onClick={() => handleClick(option.value)}
          active={curActiveValue === option.value}
          className={` cursor-pointer py-1  rounded-md text-[8px] tab:text-base px-2 font-normal transition ${
            curActiveValue === option.value
              ? "bg-normal text-white"
              : "text-neutral-600 hover:bg-light"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
