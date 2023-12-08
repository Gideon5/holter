import React, { useContext, useState, useEffect } from "react";
import { LineChart } from "react-native-wagmi-charts";
import { DataContext } from "../../contexts/DataContext";

const Graph = () => {

  const { chartData } = useContext(DataContext)
  const [lineGraphWidth, setLineGraphWidth] = useState(250);

  useEffect(() => {
    // Get the current user's details from Firestore
    // console.log('This is it ,',results.length);
    setLineGraphWidth(results.length * 15);
  }, []);


  const columns = chartData.columns[0];
  const results = chartData.results[0];
  

  const x = columns.indexOf("timestamp");
  const y = columns.indexOf("65251116ec97f6000e5ea34c.value.value");
  // console.log(x,y)



  const data = results.map((result) => ({
    timestamp: result[x],
    value: result[y],
  }));

  // console.log(data)
  

  // const x = chartData.columns[0].indexOf("timestamp");
  // const y = chartData.columns[0].indexOf("64ac3f7bc06e0d000c600e47.value.value")
  // const results = chartData.results[0]
  // console.log(x,y)
  // // console.log('reuslts now :',results[0][1])

  // const awer = results.map((result) => ({
  //   timestamp: result[0][x],
  //   value: result[0][y],
  // }));

  // console.log("data :", awer)




  // const data = [
  //   {
  //     timestamp: 1625945400000,
  //     value: 33575.25,
  //   },
  //   {
  //     timestamp: 1625946300000,
  //     value: 33545.25,
  //   },
  //   {
  //     timestamp: 1625947200000,
  //     value: 33510.25,
  //   },
  //   {
  //     timestamp: 1625948100000,
  //     value: 33215.25,
  //   },
  // ];


  return (
    <LineChart.Provider data={data}>
      <LineChart width={lineGraphWidth} height={400}>
        {/* // from react-native//width={lineGraphWidth} */}
        <LineChart.Path color="red" strokeWidth={0} />
        <LineChart.CursorCrosshair>
          <LineChart.Tooltip />
          <LineChart.Tooltip position="bottom">
            <LineChart.DatetimeText />
          </LineChart.Tooltip>
        </LineChart.CursorCrosshair>
      </LineChart>
    </LineChart.Provider>
  ); 
};

export default Graph;
