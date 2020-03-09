import Taro, { Component } from "@tarojs/taro";
import * as echarts from "./ec-canvas/echarts";

function setChartData(chart, data) {
  let option = {
    color: ['#f4ea2a'],
    legend: { // 设置提示位置
      data: ['体重KG'],
      x: 'center',
      y: '180',
      textStyle: {
        color: '#000',
        fontWeight: 600
      }
    },
    grid: { // 设置折线图主体位置
      left: '2%',
      top: '4%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          rotate: 30,
          fontSize: 10
        },
        axisLine: {
          lineStyle: {
            color: '#ccc'
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        show: false
      }
    ],
    series: []
  };
  if (data && data.dimensions && data.measures) {
    option.xAxis[0].data = data.dimensions.data
    option.series = data.measures.map(item => {
      return {
        name: '体重KG',
        ...item,
        type: 'line',
        symbolSize: 6,
        label: {
         show: true,
         color: '#000',
         fontSize: 32
        },
      }
    })
  }
  console.log(option)
  chart.setOption(option);
}

export default class LineChart extends Component {
  config = {
    usingComponents: {
      "ec-canvas": "./ec-canvas/ec-canvas"
    }
  };

  constructor(props) {
    super(props);
  }

  state = {
    ec: {
      lazyLoad: true
    }
  };

  refresh = (data) => {
    this.Chart.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setChartData(chart, data);
      return chart;
    });
  }

  refChart = node => (this.Chart = node);

  render() {
    return (
      <ec-canvas
        ref={this.refChart}
        canvas-id="mychart-area"
        ec={this.state.ec}
      />
    );
  }
}