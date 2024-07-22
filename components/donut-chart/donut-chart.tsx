import dynamic from "next/dynamic";
import React from "react";
import Chart from "react-apexcharts";

interface DonutChartProps {
  series: number[];
}

const DonutChart: React.FC<DonutChartProps> = (props) => {
  const donutChartValues = {
    series: props.series,

    options: {
      dataLabels: {
        enabled: false,
      },
      chart: {
        width: 380,
        type: "pie",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      labels: ["Processing", "Compliant", "Non-Compliant"],
      colors: ["#36aafc", "#36c772", "#ff1053"],
      fill: {
        type: "gradient",
        colors: ["#36aafc", "#36c772", "#ff1053"],
      },
      legend: {
        show: false,
        formatter: function (val: string, opts: any) {
          return val + "-" + opts.w.globals.series[opts.seriesIndex];
        },
        position: "right",
      },
      title: {
        //text: "Add any title if needed",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "right",
            },
          },
        },
        {
          breakpoint: 1080,
          options: {
            chart: {
              width: 150,
            },
            legend: {
              position: "right",
            },
          },
        },
      ],
    },
  };
  console.log(props.series)
  return (
    <div>
      <Chart
        //@ts-ignore
        options={donutChartValues.options}
        series={donutChartValues.series}
        type="pie"
        width="100%"
        height={"100%"}
      />
    </div>
  );
};

export default DonutChart;
