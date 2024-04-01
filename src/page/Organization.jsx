import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chart } from "primereact/chart";
import { Card } from "primereact/card";
import Currency from "../style/Currency.jsx";

const Organization = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
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

  return (
    <>
      <h2 className="heading">About Organization</h2>
      <div className="chart-container">
        <h1 style={{ fontStyle: "oblique" }}>Population Data:</h1>
        <div
          className="card flex justify-content-center"
          style={{ width: "50vh" }}
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <Chart
              type="pie"
              data={chartData}
              options={chartOptions}
              className="w-full md:w-30rem"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Organization;
