import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import moment from "moment/moment";
import "chartjs-adapter-moment";
import getRandomInt from "../utils/random-number";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const colors = ["ef476f", "06d6a0", "118ab2", "073b4c"];
class Graph extends React.Component {
  render() {
    let { country, category, tabs, lineData } = this.props;

    const graphOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        // title: {
        //   display: true,
        //   text: "Chart",
        // },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "YYYY-MM-DD",
            parser: "YYYY/MM",
            displayFormats: {
              day: "YYYY/MM",
            },
          },
          ticks: {
            maxTicksLimit: 11.1,
          },
          display: true,
        },
        y: {
          ticks: {
            callback: function (value) {
              return `${value}${tabs.colorPin.length > 1 ? "%" : ""}`;
            },
          },
          scaleLabel: {
            display: true,
            labelString: "Percentage",
          },
        },
      },
    };
    const graphDatasets = {
      tension: 0.4,
      borderWidth: 1,
      pointHitRadius: 10,
      pointStyle: "circle",
      pointRadius: 2,
    };
    const _dataOne = () => {
      switch (tabs.tab) {
        case "Aluminum":
          return lineData.slice(130, 200);
        case "Cobalt":
          return lineData.slice(150, 200);
        case "Copper":
          return lineData.slice(200, 250);
        case "Gold":
          return lineData.slice(180, 220);
        case "Lead":
          return lineData.slice(220, 270);
        case "Molybdenum":
          return lineData.slice(270, 360);
        default:
          return [];
      }
    };

    const _dataTwo = (label) => {
      switch (label) {
        case "Aluminum":
          return lineData.slice(200, 250);
        case "Cobalt":
          return lineData.slice(150, 200);
        case "Copper":
          return lineData.slice(180, 220);
        case "Gold":
          return lineData.slice(270, 360);
        case "Lead":
          return lineData.slice(220, 270);
        case "Molybdenum":
          return lineData.slice(100, 150);
        default:
          return [];
      }
    };

    const _dataThree = (label) => {
      switch (label) {
        case "USA":
          return lineData.slice(135, 269);
        case "NLD":
          return lineData.slice(239, 276);
        default:
          return [];
      }
    };

    const dataOne = _dataOne();

    const labels = this.props.lineData
      .slice(0, 50)
      .map((data) => moment(data.date).format("YYYY/MM/DD"));

    return (
      <React.Fragment>
        <Line
          height={`200px`}
          options={graphOptions}
          data={{
            labels,
            datasets: [
              {
                data: dataOne.map((item) => item.FSRaw),
                label: this.props.tabs.tab,
                borderColor: "#8093f1",
                backgroundColor: "#8093f1",
                ...graphDatasets,
              },
              ...this.props.tabs.colorPin.map((_item, index) => {
                return {
                  data: _dataTwo(_item.name).map((item) => item.FSRaw),
                  label: _item.name,
                  borderColor: `#${_item.color}`,
                  backgroundColor: `#${_item.color}`,
                  ...graphDatasets,
                };
              }),
              ...this.props.tabs.countryPin.map((_item) => {
                return {
                  data: _dataThree(_item.name).map((item) => item.FSRaw),
                  label: _item.name,
                  borderColor: `#${colors[getRandomInt(0, colors.length - 1)]}`,
                  backgroundColor: `#${
                    colors[getRandomInt(0, colors.length - 1)]
                  }`,
                  ...graphDatasets,
                };
              }),
            ],
          }}
        />
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  tabs: state.tabs,
});
export default connect(mapStateToProps)(Graph);
