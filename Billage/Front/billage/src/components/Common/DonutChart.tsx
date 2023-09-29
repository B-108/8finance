// 라이브러리
import Chart from "react-apexcharts";

interface DonutChartProps {
  Return: number;
  Money: number;
  Day: number;
}

function DonutChart ({Return,Money,Day}:DonutChartProps) {


  const optionsRadial = {
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -13,
            show: true,
            color: "#888",
            fontSize: "15px",
          },
          value: {
            formatter: function (val) {
              return val;
            },
            offsetY: 10,
            color: "#111",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["상환율"],
  };

  const seriesRadial = [Number((Return/Money * 100))];
  return(
    <div>
    <Chart
      options={optionsRadial}
      series={seriesRadial}
      type="radialBar"
      width="76%"
      height="190px"/>
    </div>
  )
}

export default DonutChart