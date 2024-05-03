import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const CryptoGraph = () => {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      const response = await fetch("https://api.coindesk.com/v1/bpi/historical/close.json");
      const data = await response.json();
      setCryptoData(Object.entries(data.bpi));
    };

    fetchCryptoData();
  }, []);

  // Extract dates and prices for Plotly
  const dates = cryptoData.map(([date]) => date);
  const prices = cryptoData.map(([_, price]) => price);

  return (
    <div style={containerStyle}>
      <h2>Cryptocurrency Price Chart</h2>
      <Plot
        data={[
          {
            x: dates,
            y: prices,
            type: "scatter",
            mode: "lines+markers",
            marker: { color: "blue" },
          },
        ]}
        layout={{
          width: 600,
          height: 300,
          title: "Cryptocurrency Price Chart",
          xaxis: {
            title: "Date",
          },
          yaxis: {
            title: "Price",
          },
        }}
      />
    </div>
  );
};

const containerStyle = {
  backgroundColor: "#f8f9fa",
  border: "1px solid #ced4da",
  borderRadius: "5px",
  padding: "20px",
  margin: "20px auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

export default CryptoGraph;
