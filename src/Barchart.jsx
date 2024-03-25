import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";

const Barchart = ({ data }) => {
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
        labels: data.labels,
        datasets: [
          {
            label: "Semester Chart",
            data: data.values,
            backgroundColor: "rgba(24, 202, 25, 0.5)",
            borderColor: "rgba(54, 182, 25, 1)",
            borderWidth: 2, 
            hoverOffset: 20
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max:10,
          },
        },
      },
      elements: {
        bar: {
          barThickness: 10, // Set the width of each bar in pixels
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

Barchart.propTypes = {
  data: PropTypes.shape({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    values: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default Barchart;