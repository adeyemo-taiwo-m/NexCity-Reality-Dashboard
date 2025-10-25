import PropertyDetails from "./PropertyDetails.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PropertySnapShotHeader from "./PropertySnapShotHeader.jsx";
import useProperties from "../properties/useProperties.js";
import LoadingState from "../../ui/LoadingState.jsx";

function PropertySnapShot() {
  const { properties, isPending } = useProperties();
  // --- Loading State ---
  if (isPending) {
    return <LoadingState entityName="properties" />;
  }

  // --- Empty State ---
  if (!properties || properties.length === 0) {
    return <EmptyState entityName="properties" />;
  }

  return (
    <div className="bg-white p-6 max-w-4xl rounded-xl shadow-sm overflow-hidden ">
      <PropertySnapShotHeader />

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          1024: {
            slidesPerView: 1, // Show 1 slide in the constrained container
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 1, // Show 1 slide in the constrained container
            spaceBetween: 16,
          },
        }}
      >
        {properties.map((property) => (
          <SwiperSlide key={property.id} className="">
            <PropertyDetails property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PropertySnapShot;
