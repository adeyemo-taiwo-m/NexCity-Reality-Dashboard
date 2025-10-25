import { HiCalendar } from "react-icons/hi";
import { formatCurrency } from "../../utils/helpers";

function PropertyCard({ property }) {
  const { title, location, price, status, listedBy, date, image } = property;

  return (
    <div className="flex flex-col font-normal bg-[var(--color-white)] rounded-xl shadow-sm overflow-hidden w-full max-w-4xl mx-auto p-4 gap-4">
      {/* Image */}
      <img
        src={image || "/house.png"}
        alt={title}
        className="w-full h-48 object-cover rounded-lg"
      />

      {/* Content */}
      <div className="flex flex-col tab:flex-row justify-between w-full gap-4">
        {/* Left Section */}
        <div className="flex flex-col gap-1 flex-1">
          <h2 className="lap:text-lg text-md font-semibold text-[var(--color-neutral-900)]">
            {title}
          </h2>
          <p className="text-sm text-[var(--color-neutral-500)]">{location}</p>

          <div className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-neutral-500)] mt-1">
            <span>
              Listed by{" "}
              <span className="font-semibold text-[var(--color-neutral-700)]">
                {listedBy}
              </span>
            </span>
            <div className="flex items-center gap-1">
              <HiCalendar className="text-[var(--color-normal)] text-base" />
              <span>{date}</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex tab:flex-col tab:items-end justify-between tab:justify-center gap-2 tab:gap-4">
          <span
            className={`text-sm font-medium px-4 py-1 rounded-full whitespace-nowrap self-start tab:self-auto ${
              status === "Available"
                ? "bg-[var(--color-green-light)] text-[var(--color-dark)]"
                : "bg-[var(--color-red-light)] text-[var(--color-neutral-800)]"
            }`}
          >
            {status}
          </span>
          <span className="text-[var(--color-normal)] font-semibold text-lg">
            {formatCurrency(price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
