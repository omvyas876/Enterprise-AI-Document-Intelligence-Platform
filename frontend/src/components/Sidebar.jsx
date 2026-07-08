import {
  FaHome,
  FaUpload,
  FaFileAlt,
  FaRobot,
  FaInfoCircle,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import "../styles/sidebar.css";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Upload",
      path: "/upload",
      icon: <FaUpload />,
    },
    {
      name: "Documents",
      path: "/documents",
      icon: <FaFileAlt />,
    },
    {
      name: "AI Chat",
      path: "/chat",
      icon: <FaRobot />,
    },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo">

        <h2>Enterprise</h2>

        <p>AI Document Intelligence</p>

      </div>

      <div className="menu">

        {menuItems.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "menu-item active" : "menu-item"
            }
          >
            <span>{item.icon}</span>

            <p>{item.name}</p>

          </NavLink>

        ))}

      </div>
    </div>
  );
}

export default Sidebar;