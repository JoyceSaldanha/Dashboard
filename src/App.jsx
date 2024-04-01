import React from "react";
import SideBar from "./components/SideBar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home.jsx";
import Organization from "./page/Organization.jsx";
import Trade from "./page/Trade.jsx";
import Wallet from "./page/Wallet.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <SideBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/wallet" element={<Wallet />} />
        </Routes>
      </SideBar>
    </BrowserRouter>
  );
};

export default App;
