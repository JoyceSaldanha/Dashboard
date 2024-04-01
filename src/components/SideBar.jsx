import React, { useState } from "react";
import "../App.css";
import {
  FaBars,
  FaShoppingBag,
  FaTh,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaThList,
  FaSearch,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <FaTh />,
    },
    {
      path: "/organization",
      name: "Organization",
      icon: <FaUserAlt />,
    },
    {
      path: "/assets",
      name: "Assets",
      icon: <FaRegChartBar />,
    },
    {
      path: "/trade",
      name: "Trade",
      icon: <FaCommentAlt />,
    },
    {
      path: "/history",
      name: "History",
      icon: <FaShoppingBag />,
    },
    {
      path: "/wallet",
      name: "Wallet",
      icon: <FaThList />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {/* <div className="icon">
          <FaSearch onClick={toggle} />
        </div>
        <InputText
          placeholder="Keyword"
          style={{ display: isOpen ? "block" : "none" }}
        /> */}

        <div>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="icon" onClick={toggle}>
                {item.icon}
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default SideBar;
