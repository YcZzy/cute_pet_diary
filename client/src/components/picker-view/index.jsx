import Taro, { Component } from '@tarojs/taro'
import { View, PickerView, PickerViewColumn } from '@tarojs/components'
import { init } from '@components/picker/date'

class MyPickerView extends Component {
  constructor () {
    super(...arguments)
    const date = new Date()
    const { years, months, days, hours, minutes } = init()
    this.state = {
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      value: [ // 当前项下标数组
        0,
        months.findIndex(m => m === date.getMonth() + 1),
        days.findIndex(d => d === date.getDate()),
        hours.findIndex(h => h === date.getHours()),
        minutes.findIndex(m => m === date.getMinutes())
      ]
    }
  }

  onChange = e => {
    const val = e.detail.value
    this.setState({
      value: val
    })
  }

  render() {
    return (
      <View style={{marginTop: '30rpx'}}>
        <PickerView 
          indicatorStyle='height: 70rpx;' 
          style='width: 100%; height: 450rpx;' 
          value={this.state.value} 
          onChange={this.onChange}
        >
          <PickerViewColumn>
            {this.state.years.map(item => {
              return (
                <View 
                  style={{textAlign: 'center', lineHeight: '68rpx'}}
                  key={item}
                >{item}年</View>
              );
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.months.map(item => {
              return (
                <View  
                  style={{textAlign: 'center', lineHeight: '68rpx'}}
                  key={item + 'month'}
                >{item}月</View>
              )
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.days.map(item => {
              return (
                <View  
                  style={{textAlign: 'center', lineHeight: '68rpx'}}
                  key={item + 'day'}
                  >{item}日</View>
              )
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.hours.map(item => {
              return (
                <View  
                  style={{textAlign: 'center', lineHeight: '68rpx'}}
                  key={item + 'hour'}>
                  {item < 10 ? `0${item}` : item}点
                </View>
              )
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.minutes.map(item => {
              return (
                <View  
                  style={{textAlign: 'center', lineHeight: '68rpx'}}
                  key={item + 'minute'}>
                  {item < 10 ? `0${item}` : item}分
                </View>
              )
            })}
          </PickerViewColumn>
        </PickerView>
      </View>
    )
  }
}

export default MyPickerView