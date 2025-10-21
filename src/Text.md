import React, { useState } from "react";
import {
FaArrowRight,
FaCheckCircle,
FaChevronDown,
FaMoneyBillWave,
FaBuilding,
FaChartLine,
FaHome,
} from "react-icons/fa";

const timeRangeOptions = [
{ id: "last7", label: "Last 7 Days" },
{ id: "last14", label: "Last 14 Days" },
{ id: "last30", label: "Last 30 Days" },
];

const statsData = [
{
id: "total-properties",
icon: <FaBuilding className="text-blue-600 text-3xl" />,
label: "Total Properties",
value: "234",
},
{
id: "revenue",
icon: <FaMoneyBillWave className="text-green-600 text-3xl" />,
label: "Revenue",
value: "$23,400",
},
{
id: "available",
icon: <FaCheckCircle className="text-yellow-500 text-3xl" />,
label: "Available",
value: "145",
},
{
id: "new-bookings",
icon: <FaHome className="text-purple-600 text-3xl" />,
label: "New Bookings",
value: "25",
},
];

const propertySnapshotData = [
{
id: 1,
image: "https://placehold.co/300x200",
title: "The Maple Haven",
location: "Luxury Apartment, Beverly Hills, CA",
price: "$120,000",
status: "Available",
},
{
id: 2,
image: "https://placehold.co/300x200",
title: "Oceanview Suites",
location: "Modern Villa, Malibu, CA",
price: "$98,000",
status: "Available",
},
{
id: 3,
image: "https://placehold.co/300x200",
title: "Sunset Estate",
location: "Suburban Homes, Texas, USA",
price: "$85,000",
status: "Sold",
},
];

export const PropertySnapshotSection = () => {
const [selectedTimeRange, setSelectedTimeRange] = useState("last7");

return (
<section className="flex flex-col gap-8 w-full">
<header className="flex justify-between items-center">
<h1 className="text-3xl font-semibold text-blue-800">Dashboard</h1>

        <div className="bg-white p-1 rounded-lg shadow-sm flex gap-1">
          {timeRangeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedTimeRange(option.id)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                selectedTimeRange === option.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </header>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-lg p-4 flex items-center gap-4 shadow-sm"
          >
            {stat.icon}
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h3 className="text-xl font-semibold text-blue-700">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Property Snapshot Section */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-blue-800">
            Property Snapshot
          </h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm">
              Recent Listed <FaChevronDown />
            </button>
            <button className="flex items-center gap-1 bg-blue-700 text-white px-3 py-1 rounded-md text-sm">
              View all <FaArrowRight />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {propertySnapshotData.map((property) => (
            <div
              key={property.id}
              className="bg-blue-50 rounded-lg overflow-hidden shadow-sm"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-3 flex flex-col gap-2">
                <h3 className="font-semibold text-blue-800 text-sm">
                  {property.title}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {property.location}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-800">
                    {property.price}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      property.status === "Available"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

);
};

export const PropertyPerformanceOverviewSection = () => {
return (
<section className="bg-white rounded-xl p-6 shadow-sm mt-8">
<div className="flex items-center justify-between mb-4">
<h2 className="text-lg font-semibold text-blue-800">
Property Performance Overview
</h2>
<FaChartLine className="text-blue-600 text-xl" />
</div>

      <div className="h-48 flex items-center justify-center text-gray-500 text-sm border border-dashed rounded-md">
        Chart visualization placeholder
      </div>
    </section>

);
};

export const FrameScreen = () => {
return (
<div className="max-w-6xl mx-auto p-6 flex flex-col gap-8 bg-gray-50 min-h-screen">
<PropertySnapshotSection />
<PropertyPerformanceOverviewSection />
</div>
);
};
