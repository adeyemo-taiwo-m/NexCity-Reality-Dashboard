import { propertySnapshotData } from "../../assets/data.jsx";
import PropertyDetails from "./PropertyDetails.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PropertySnapShotHeader from "./PropertySnapShotHeader.jsx";

function PropertySnapShot() {
  return (
    <div className="bg-white p-6   rounded-xl shadow-sm  overflow-hidden">
      <PropertySnapShotHeader />

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={16}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
        style={{
          width: "100%",
          maxWidth: "100%",
        }}
        breakpoints={{
          // custom breakpoints matching your Tailwind config
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1 }, // below tab breakpoint
          1024: { slidesPerView: 2 }, // between tab and lap
          1280: { slidesPerView: 3 }, // desktop
        }}
      >
        {propertySnapshotData.map((property) => (
          <SwiperSlide
            key={property.id}
            className="flex justify-center !w-full"
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <div className="w-full max-w-full overflow-hidden">
              <PropertyDetails property={property} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default PropertySnapShot;
