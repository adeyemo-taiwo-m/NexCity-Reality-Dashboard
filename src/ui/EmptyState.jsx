function EmptyState({ entityName }) {
  return (
    <div className="flex flex-col justify-center items-center h-64 text-center">
      <p className="text-neutral-400 text-lg mb-2">{`No ${entityName} found.`}</p>
      <p className="text-neutral-300">
        Check back later or try a different filter.
      </p>
    </div>
  );
}

export default EmptyState;
