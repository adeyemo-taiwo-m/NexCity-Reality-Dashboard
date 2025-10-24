import { propertySnapshotData } from "../../assets/data.jsx";
import PropertyDetails from "./PropertyDetails.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PropertySnapShotHeader from "./PropertySnapShotHeader.jsx";

function PropertySnapShot() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm  overflow-hidden">
      {" "}
      {/* Changed overflow-x-hidden to overflow-hidden */}
      <PropertySnapShotHeader />
      <div className="!w-full">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          className="w-full max-w-full" // Added max-w-full here
          style={{
            width: "100%",
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          {propertySnapshotData.map((property) => (
            <SwiperSlide
              key={property.id}
              className="!w-full flex justify-center"
            >
              <div className="w-full max-w-full overflow-hidden">
                {" "}
                {/* Added overflow-hidden and max-w-full */}
                <PropertyDetails property={property} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
export default PropertySnapShot;
