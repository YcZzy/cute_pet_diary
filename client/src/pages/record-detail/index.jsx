import Taro, { Component } from '@tarojs/taro'
import { View } from "@tarojs/components";
import LineChart from '@components/LineChart'
import { cloudAdapter } from '@utils/adapter'
import { getYMD } from '@utils/common'
import ListItem from '@components/list-item'
import './index.scss'

class RecordDetail extends Component {
  state = {
    name: '',
    list: []
  }
  componentDidShow() {
    const { name } = this.$router.params
    this.setState({ name }, () => this.init())
    // 动态设置头部标题
    Taro.setNavigationBarTitle({
      title: name
    })
  }
  init = async () => {
    const res = await cloudAdapter('rar', 'getRecordsByName', { name: this.state.name })
    if (res.code === 0) {
      this.setState({ list: res.data })
    }
    if (this.state.name === '体重') {
      let xData = [], yData = []
      res.data.forEach(item => {
        xData.push(getYMD(item.time))
        yData.push(Number(item.note))
      })
      const chartData = {
        dimensions: {
          data: xData
        },
        measures: [{
          data: yData
        }]
      }
      this.lineChart.refresh(chartData)
    }
  }
  refLineChart = (node) => this.lineChart = node

  render() {
    const { name, list } = this.state
    return (
      <View className="detail">
        {
          name === '体重' ? (
            <View className="line-chart">
              <LineChart ref={this.refLineChart} />
            </View>
          ) : null
        }
        <View className="list">
          {
            list.map(item => (
              <ListItem
                img={item.img}
                note={item.note}
                title={item.name}
                time={item.time}
                pictures={item.pictures}
                _id={item._id}
                petId={item.petId}
                key={item._id}
                callback={this.init}
              />
            ))
          }
        </View>
      </View>
    );
  }
}

export default RecordDetail