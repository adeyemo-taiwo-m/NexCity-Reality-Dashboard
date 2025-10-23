import React from "react";
import Heading from "../../ui/Heading";

function SettingsSection({ icon, title, color, children }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
      <div className="flex items-center gap-2 mb-4">
        <span className={`${color} text-xl`}>{icon}</span>
        <Heading type="h2">{title}</Heading>
      </div>
      {children}
    </div>
  );
}

export default SettingsSection;
