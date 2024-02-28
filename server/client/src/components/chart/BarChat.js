import React from 'react'
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController
  );

const BarChart = ({yes, no}) => {
    return (
        <div style={{ maxWidth: "200px" }}>
        <Bar
        data={{
            // Name of the variables on x-axies for each bar
            labels: ["Yes", "No"],
            datasets: [
                {
                    // Label for bars
                    label: "total count/value",
                    // Data or value of your each variable
                    data: [yes,no],
                    // Color of each bar
                    backgroundColor: 
                        ["green", "red"],
                    // Border color of each bar
                    borderColor: ["green", "red"],
                    borderWidth: 0.5,
                },
            ],
        }}
        // Height of graph
        height={400}
        options={{
            maintainAspectRatio: false,
            scales: {
                yAxes: [
                    {
                        ticks: {
                      // The y-axis value will start from zero
                            beginAtZero: true,
                        },
                    },
                ],
            },
            legend: {
                labels: {
                    fontSize: 15,
                },
            },
        }}
    />
    </div>
    )
}

export default BarChart;