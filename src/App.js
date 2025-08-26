import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Demo API (Bitcoin price from Coindesk)
    axios.get("https://api.coindesk.com/v1/bpi/historical/close.json")
      .then((response) => {
        const prices = Object.entries(response.data.bpi).map(([date, price]) => ({
          date,
          price,
        }));
        setData(prices);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px" }}>
      <h1>📈 Stock Price Analysis </h1>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}

export default App;
