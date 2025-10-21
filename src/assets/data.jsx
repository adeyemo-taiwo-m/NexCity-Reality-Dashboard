import {
  FaBuilding,
  FaMoneyBillWave,
  FaCheckCircle,
  FaHome,
} from "react-icons/fa";

export const timeRangeOptions = [
  { id: "last7", label: "Last 7 Days" },
  { id: "last14", label: "Last 14 Days" },
  { id: "last30", label: "Last 30 Days" },
];

export const statsData = [
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

export const propertySnapshotData = [
  {
    id: 1,
    image: "/house.png",
    title: "The Maple Haven",
    location: "Luxury Apartment, Beverly Hills, CA",
    price: "$120,000",
    status: "Available",
  },
  {
    id: 2,
    image: "/house.png",
    title: "Oceanview Suites",
    location: "Modern Villa, Malibu, CA",
    price: "$98,000",
    status: "Available",
  },
  {
    id: 3,
    image: "/house.png",
    title: "Sunset Estate",
    location: "Suburban Homes, Texas, USA",
    price: "$85,000",
    status: "Sold",
  },
];
