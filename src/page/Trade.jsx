import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import Currency from "../style/Currency.jsx";
import "../App.css";

const Trade = () => {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bitCoinResponse = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        setBitcoinData(bitCoinResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const cardStyle = {
    width: "300px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    borderRadius: "5px",
  };

  return (
    <>
      <h2 className="heading">About Trade</h2>
      <div className="bitcoin-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          Object.keys(bitcoinData.bpi)?.map((currency) => (
            <Card
              title={bitcoinData.bpi[currency].description}
              key={currency}
              style={cardStyle}
            >
              <p>Code: {bitcoinData.bpi[currency].code}</p>
              <p>
                Rate: {bitcoinData.bpi[currency].rate}{" "}
                {bitcoinData.bpi[currency].code == "USD"
                  ? Currency.USD
                  : bitcoinData.bpi[currency].code == "GBP"
                  ? Currency.GBP
                  : bitcoinData.bpi[currency].code == "EUR"
                  ? Currency.EUR
                  : ""}
              </p>
              <p>Rate Float: {bitcoinData.bpi[currency].rate_float}</p>
            </Card>
          ))
        )}
      </div>
    </>
  );
};

export default Trade;
