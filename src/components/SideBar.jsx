import React, { useState } from "react";
import "../App.css";
import { FaBars, FaTh, FaWallet } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { VscOrganization } from "react-icons/vsc";
import { NavLink } from "react-router-dom";

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
      icon: <VscOrganization />,
    },
    {
      path: "/trade",
      name: "Trade",
      icon: <GiMoneyStack />,
    },
    {
      path: "/wallet",
      name: "Wallet",
      icon: <FaWallet />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "300px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1
            style={{ display: isOpen ? "block" : "none", width: "12rem" }}
            className="logo"
          >
            Carbon Cell
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

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
