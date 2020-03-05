import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import {
  AtButton,
  AtForm,
  AtTextarea,
  AtMessage,
  AtIcon
} from 'taro-ui'
import { debounce, navigateBack, getYMD } from '@utils/common'
import MyPicker from '@components/picker'
import { selector, cycles } from './config'
import './index.scss'

class AddReminder extends Component {
  config = {
    navigationBarTitleText: '添加提醒计划'
  }
  state = {
    plan: '',
    nextTime: '',
    cycle: '',
    note: ''
  }
  onChange = debounce((attr, value) => {
    this.setState({
      [attr]: value
    })
  })
  onSubmit = () => {

  }

  render() {
    const { plan, nextTime, cycle, note } = this.state
    return (
      <AtForm onSubmit={this.onSubmit}>
        <View className="part1 part-common">
          <text>计划名称</text>
          <MyPicker
            title="提醒事项"
            selector={selector}
            onChange={(value) => {
              this.onChange('plan', value)
            }}
          >
            <View className="part1-select">
              {
                plan ? <Text className="active">{plan}</Text>
                  : <Text>选择提醒事项</Text>
              }
              <AtIcon value="chevron-right" size="20" color="#ccc" />
            </View>
          </MyPicker>
        </View>
        <View className="part2 part-common">
          <View className="next-time">
            <text>提醒时间</text>
            <Picker
              mode='date'
              end={getYMD()} // 限制最大能取得日期
              onChange={(e) => {
                this.onChange('nextTime', e.detail.value)
              }}
            >
              <View className="next-time-select">
                {
                  nextTime ? <Text className="active">{nextTime}</Text>
                    : <Text>选择提醒时间</Text>
                }
                <AtIcon value="chevron-right" size="20" color="#ccc" />
              </View>
            </Picker>
          </View>
          <View className="cycle">
            <text>重复周期</text>
            <Picker
              mode='selector'
              rangeKey="value"
              range={cycles}
              onChange={(e) => {
                this.onChange('cycle', cycles[e.detail.value].value)
              }}
            >
              <View className="cycle-select">
                {
                  cycle ? <Text className="active">{cycle}</Text>
                    : <Text>选择重复周期</Text>
                }
                <AtIcon value="chevron-right" size="20" color="#ccc" />
              </View>
            </Picker>
          </View>
        </View>
        <View className="part3 part-common">
          <Text>备注</Text>
          <AtTextarea
            value={note}
            onChange={(e) => {
              this.onChange('note', e.detail.value)
            }}
            maxLength={200}
            placeholder='填写备注...'
          />
        </View>
        <AtButton formType='submit' type="primary" circle>提交</AtButton>
        <AtMessage />
      </AtForm>
    )
  }
}

export default AddReminder