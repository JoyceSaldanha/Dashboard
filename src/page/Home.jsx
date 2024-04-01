import React from "react";
import { NavLink } from "react-router-dom";
import { Card } from "primereact/card";

const Home = () => {
  const menuItem = [
    {
      path: "/organization",
      name: "Organization",
    },
    {
      path: "/trade",
      name: "Trade",
    },
    {
      path: "/wallet",
      name: "Wallet",
    },
  ];
  return (
    <>
      <h2 className="heading">Welcome </h2>
      <div className="cards">
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index}>
            <Card title={item.name}></Card>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Home;
