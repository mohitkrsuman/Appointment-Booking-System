import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  // ================ doctor menu ===================
  const doctorMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      id: 2,
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      id: 3,
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // ================ doctor menu ===================

  //rendering menu list
  const SidebarMenu = user?.isAdmin
  ? adminMenu
  : user?.isDoctor
  ? doctorMenu
  : userMenu;

  //logout
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h4>BOOKIT</h4>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div
                    key={menu.id}
                    className={`menuItem ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu?.name}</Link>
                  </div>
                </>
              );
            })}
            <div className={`menuItem`} onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content icon">
              <Badge
                count={user && user.notification.length}
                onClick={() => {
                  navigate("/notification");
                }}
              >
                <i className="fa-solid fa-bell"></i>
              </Badge>
              <Link to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
