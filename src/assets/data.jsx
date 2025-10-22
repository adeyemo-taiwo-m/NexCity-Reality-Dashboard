import {
  HiOutlineBuildingOffice, // for Total Properties
  HiOutlineCurrencyDollar, // for Revenue
  HiOutlineCheckCircle, // for Available
  HiOutlineHomeModern,
  HiOutlineUserGroup,
  HiOutlineClipboardDocumentCheck, // for New Bookings
} from "react-icons/hi2";

export const timeRangeOptions = [
  { id: "last7", label: "Last 7 Days" },
  { id: "last14", label: "Last 14 Days" },
  { id: "last30", label: "Last 30 Days" },
];
export const statusRangeOptions = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
];

export const statsData = [
  {
    id: "total-properties",
    icon: <HiOutlineBuildingOffice className=" text-3xl" />,
    label: "Total Properties",
    value: "234",
    color: "blue",
  },
  {
    id: "revenue",
    icon: <HiOutlineCurrencyDollar className="text-3xl" />,
    label: "Revenue",
    value: "$23,400",
    color: "green",
  },
  {
    id: "available",
    icon: <HiOutlineCheckCircle className=" text-3xl" />,
    label: "Available",
    value: "145",
    color: "red",
  },
  {
    id: "new-bookings",
    icon: <HiOutlineHomeModern className=" text-3xl" />,
    label: "New Bookings",
    value: "25",
    color: "indigo",
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
export const stats = [
  {
    title: "Total Agents",
    value: "234",
    icon: <HiOutlineUserGroup className="text-3xl" />,
    color: "blue",
  },
  {
    title: "Active Agents",
    value: "189",
    icon: <HiOutlineUserGroup className="text-3xl" />,
    color: "green",
  },
  {
    title: "Inactive Agents",
    value: "45",
    icon: <HiOutlineUserGroup className="text-3xl" />,
    color: "red", // better contrast and softer than red
  },
  {
    title: "Total Closed Deals",
    value: "25",
    icon: <HiOutlineClipboardDocumentCheck className="text-3xl" />,
    color: "indigo",
  },
];

export const mockAgents = [
  {
    name: "Adeyemo",
    email: "ade@gmail.com",
    phone: "070123456789",
    listed: 14,
    clients: 15,
    status: "Active",
  },
  {
    name: "Sarah John",
    email: "sarah@gmail.com",
    phone: "080112233445",
    listed: 14,
    clients: 15,
    status: "Active",
  },
  {
    name: "Michael Obi",
    email: "mike@gmail.com",
    phone: "09012349876",
    listed: 14,
    clients: 15,
    status: "Inactive",
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    phone: "070111122233",
    listed: 14,
    clients: 15,
    status: "Active",
  },
  {
    name: "Peter King",
    email: "peter@gmail.com",
    phone: "081234567890",
    listed: 14,
    clients: 15,
    status: "Inactive",
  },
  {
    name: "Taiwo A.",
    email: "taiwo@gmail.com",
    phone: "070555666777",
    listed: 14,
    clients: 15,
    status: "Active",
  },
];
export const customersDetails = [
  {
    name: "Adeyemo",
    email: "ade@gmail.com",
    interestedProperty: "Lagos Shoreline Villa",
    dealType: "Purchase",
    amount: 85000000, // ₦85,000,000
    status: "Closed",
    activity: "Payment received.",
    avatarUrl: "https://placehold.co/40x40/DC3545/FFFFFF?text=AT",
  },
  {
    name: "Sarah John",
    email: "sarah@gmail.com",
    interestedProperty: "Greenwood Apartments",
    dealType: "Rent",
    amount: 2500000, // ₦2,500,000
    status: "Active",
    activity: "Sent property details.",
    avatarUrl: "https://placehold.co/40x40/34D399/FFFFFF?text=SJ",
  },
  {
    name: "Michael Obi",
    email: "mike@gmail.com",
    interestedProperty: "Lekki Commercial Land",
    dealType: "Lease",
    amount: 40000000, // ₦40,000,000
    status: "Closed",
    activity: "Deal finalized.",
    avatarUrl: "https://placehold.co/40x40/2563EB/FFFFFF?text=MO",
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    interestedProperty: "Oceanview Penthouse",
    dealType: "Purchase",
    amount: 120000000, // ₦120,000,000
    status: "Active",
    activity: "Requested virtual tour.",
    avatarUrl: "https://placehold.co/40x40/F59E0B/FFFFFF?text=JD",
  },
  {
    name: "Peter King",
    email: "peter@gmail.com",
    interestedProperty: "Victoria Island Office",
    dealType: "Inquiry",
    amount: 0, // No amount yet, just an inquiry
    status: "Closed",
    activity: "Follow up needed.",
    avatarUrl: "https://placehold.co/40x40/10B981/FFFFFF?text=PK",
  },
  {
    name: "Taiwo A.",
    email: "taiwo@gmail.com",
    interestedProperty: "Ikoyi Luxury Flat",
    dealType: "Rent",
    amount: 4500000, // ₦4,500,000
    status: "Active",
    activity: "Initial inquiry sent.",
    avatarUrl: "https://placehold.co/40x40/A855F7/FFFFFF?text=TA",
  },
];

export const transactionDetails = [
  {
    property: "Lagos Shoreline Villa",
    type: "Sale",
    customer: "Adeyemo Taiwo M",
    amount: "₦85,000,000",
    status: "Completed",
    date: "Oct 15, 2025",
    propertyImage: "https://placehold.co/40x40/333333/FFFFFF?text=LSV",
  },
  {
    property: "Palmview Estate",
    type: "Sale",
    customer: "Sarah John",
    amount: "₦44,200,000",
    status: "Completed",
    date: "Oct 15, 2025",
    propertyImage: "https://placehold.co/40x40/0044AA/FFFFFF?text=PE",
  },
  {
    property: "Greenwood Apartments",
    type: "Rent",
    customer: "Jane Doe",
    amount: "₦2,500,000",
    status: "Pending",
    date: "Oct 12, 2025",
    propertyImage: "https://placehold.co/40x40/556633/FFFFFF?text=GA",
  },
  {
    property: "Lekki Commercial Land",
    type: "Lease",
    customer: "Michael Obi",
    amount: "₦40,000,000",
    status: "Completed",
    date: "Oct 01, 2025",
    propertyImage: "https://placehold.co/40x40/B3004C/FFFFFF?text=LCL",
  },
  {
    property: "Oceanview Penthouse",
    type: "Sale",
    customer: "Peter King",
    amount: "₦120,000,000",
    status: "Pending",
    date: "Sep 28, 2025",
    propertyImage: "https://placehold.co/40x40/7300B3/FFFFFF?text=OP",
  },
  {
    property: "Ikoyi Luxury Flat",
    type: "Rent",
    customer: "Taiwo A.",
    amount: "₦4,500,000",
    status: "Completed",
    date: "Sep 20, 2025",
    propertyImage: "https://placehold.co/40x40/00B38F/FFFFFF?text=ILF",
  },

  // --- New entries below ---
  {
    property: "Banana Island Mansion",
    type: "Sale",
    customer: "Gloria Adams",
    amount: "₦250,000,000",
    status: "Completed",
    date: "Sep 10, 2025",
    propertyImage: "https://placehold.co/40x40/FF5733/FFFFFF?text=BIM",
  },
  {
    property: "Maple Heights Duplex",
    type: "Lease",
    customer: "Uche Chika",
    amount: "₦15,000,000",
    status: "Pending",
    date: "Aug 29, 2025",
    propertyImage: "https://placehold.co/40x40/008080/FFFFFF?text=MHD",
  },
  {
    property: "Eko Towers Office Suite",
    type: "Rent",
    customer: "Bola Hassan",
    amount: "₦3,800,000",
    status: "Completed",
    date: "Aug 20, 2025",
    propertyImage: "https://placehold.co/40x40/9B870C/FFFFFF?text=ETO",
  },
  {
    property: "Sunrise Gardens",
    type: "Sale",
    customer: "Daniel Okoro",
    amount: "₦65,500,000",
    status: "Cancelled",
    date: "Jul 18, 2025",
    propertyImage: "https://placehold.co/40x40/FFB300/FFFFFF?text=SG",
  },
  {
    property: "Cedar Grove Estate",
    type: "Lease",
    customer: "Ngozi Ifeanyi",
    amount: "₦28,000,000",
    status: "Completed",
    date: "Jun 22, 2025",
    propertyImage: "https://placehold.co/40x40/0055CC/FFFFFF?text=CGE",
  },
];
