import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";

const CgpaPieChart = ({ cgpa }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["CGPA"],
        datasets: [
          {
            label: "CGPA",
            data: [cgpa],
            backgroundColor: "rgba(75, 192, 500, 0.5)",
            barThickness: 30,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
          },
        },
      },
      elements: {
        bar: {
          barThickness: 0, // Set the width of each bar in pixels
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [cgpa]);

  return <canvas ref={chartRef} />;
};

CgpaPieChart.propTypes = {
  cgpa: PropTypes.number.isRequired,
};

export default CgpaPieChart;
