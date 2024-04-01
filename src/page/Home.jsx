import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import Currency from "../style/Currency.jsx";

const Home = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [bitcoinData, setBitcoinData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        const populationData = response.data.data;

        const data = {
          labels: populationData.map((item) => item.Year),
          datasets: [
            {
              data: populationData.map((item) => item.Population),
              backgroundColor: generateColors(populationData.length),
            },
          ],
        };

        const options = {
          cutout: "40%",
        };

        const bitCoinResponse = await axios.get(
          "https://api.coindesk.com/v1/bpi/currentprice.json"
        );
        setBitcoinData(bitCoinResponse.data);
        setChartData(data);
        setChartOptions(options);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
      colors.push(color);
    }
    return colors;
  };

  const cardStyle = {
    width: "300px",
    marginBottom: "20px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    transition: "0.3s",
    borderRadius: "5px",
  };

  return (
    <>
      <div>
        <h1>Population Data:</h1>

        <div
          className="card flex justify-content-center"
          style={{ width: "50vh" }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Chart
              type="doughnut"
              data={chartData}
              options={chartOptions}
              className="w-full md:w-30rem"
            />
          )}
        </div>
      </div>

      <div className="bitcoin-container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          Object.keys(bitcoinData.bpi).map((currency) => (
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

export default Home;
