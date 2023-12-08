import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    //console.log('MALK');
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    console.log('starting');
    try {
      console.log('TRYING');

      const response = await axios.post(
        "https://industrial.api.ubidots.com/api/v1.6/data/raw/series",
        {
          variables: ["65251116ec97f6000e5ea34c"],
          columns: ["value.value", "timestamp"],
          join_dataframes: false,
          limit: '500'
          // limit: '100' 1628 1907
        },
        {
          headers: {
            "X-Auth-Token": "BBFF-GXv7RpP79hRVYrVS2K3p5wvq6r52Kl",
            "content-type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // console.log(response.data)


        setChartData(response.data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        // The request was made, but the server responded with a non-2xx status code
        console.error("Server responded with an error:", error.response.status);
      } else if (error.request) {
        // The request was made, but there was no response from the server
        console.error("No response received from the server.");
      } else {
        // Something else went wrong
        console.error("Error:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        chartData,
        setChartData,
        loading,
        setLoading,
        isConnected,
        setIsConnected,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
