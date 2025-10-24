import { propertySnapshotData } from "../../assets/data.jsx";
import PropertyDetails from "./PropertyDetails.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PropertySnapShotHeader from "./PropertySnapShotHeader.jsx";

function PropertySnapShot() {
  return (
    <div className="bg-white p-6  rounded-xl shadow-sm overflow-hidden ">
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
        {propertySnapshotData.map((property) => (
          <SwiperSlide key={property.id} className="!w-full">
            <PropertyDetails property={property} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PropertySnapShot;
