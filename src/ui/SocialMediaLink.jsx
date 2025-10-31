import React from "react";
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function SocialMediaLink({ iconName, to }) {
  const type = {
    facebook: {
      icon: <FaFacebookF className="w-5 h-5" />,
      colorClass: "text-blue-600 hover:text-blue-800 transition-colors",
    },
    linkedin: {
      icon: <FaLinkedinIn className="w-5 h-5" />,
      colorClass: "text-blue-700 hover:text-blue-900 transition-colors",
    },
    pinterest: {
      icon: <FaPinterestP className="w-5 h-5" />,
      colorClass: "text-red-600 hover:text-red-800 transition-colors",
    },
    x: {
      icon: <FaXTwitter className="w-5 h-5" />,
      colorClass: "text-neutral-800 hover:text-black transition-colors",
    },
  };

  return (
    <a href={to} className={type[iconName]?.colorClass} aria-label={iconName}>
      {type[iconName]?.icon}
    </a>
  );
}

export default SocialMediaLink;
