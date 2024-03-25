import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import PropTypes from "prop-types";

const CgpaSemLineChart = ({ calarr }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: calarr.xarr,
        datasets: [
          {
            label: "CGPA Sem Chart",
            data: calarr.cgpasem,
            backgroundColor:['rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(25, 205, 86)',
            'rgb(25, 200, 186)'],
            borderColor: "rgba(0, 0, 0, 1)",
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
  }, [calarr]);

  return <canvas ref={chartRef} />;
};

  CgpaSemLineChart.propTypes = {
  calarr: PropTypes.shape({
    xarr: PropTypes.arrayOf(PropTypes.string).isRequired,
    cgpasem: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default CgpaSemLineChart;