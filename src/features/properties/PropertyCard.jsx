import {
  HiCalendar,
  HiOutlineEllipsisVertical,
  HiOutlinePencil,
  HiOutlineEye,
  HiOutlineTrash,
} from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";
import ActionModal from "../../ui/ActionModal";
import PropertyStatusBadge from "./PropertyStatusBadge";

function PropertyCard({ property, onActionSelect }) {
  const { title, location, price, status, listedBy, date, image } = property;

  return (
    <div className="relative flex flex-col font-normal rounded-xl shadow-sm overflow-hidden w-full max-w-4xl mx-auto p-4 gap-4">
      {/* Three-dot action button */}
      <div className="absolute top-4 right-4">
        <ActionModal
          disabled={false}
          items={[
            {
              label: "Edit",
              icon: HiOutlinePencil,
              onClick: () => onActionSelect("edit", property),
            },
            {
              label: "View Details",
              icon: HiOutlineEye,
              onClick: () => onActionSelect("view", property),
            },
            {
              label: "Delete",
              icon: HiOutlineTrash,
              onClick: () => onActionSelect("delete", property),
            },
          ]}
        >
          <HiOutlineEllipsisVertical className="w-5 h-5 text-neutral-500" />
        </ActionModal>
      </div>

      {/* Image */}
      <img
        src={image || "/house.png"}
        alt={`${title} in ${location}`}
        className="w-full h-48 object-cover rounded-lg"
      />
      {console.log(image)}
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
              <span>{new Date(date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex tab:flex-col tab:items-end justify-between tab:justify-center gap-2 tab:gap-4">
          <PropertyStatusBadge status={status} />

          <span className="text-[var(--color-normal)] font-semibold text-lg">
            {formatCurrency(price)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
