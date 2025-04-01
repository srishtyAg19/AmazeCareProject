import React from "react";

const Sidebar = ({ role }) => {
  const menuItems = {
    patient: ["Appointments", "Medical Records", "Profile"],
    doctor: ["Appointments", "Patients", "Profile"],
    admin: ["Doctors", "Patients", "Appointments", "Reports"],
  };

  return (
    <aside className="dashboard-sidebar">
      <ul>
        {menuItems[role]?.map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
