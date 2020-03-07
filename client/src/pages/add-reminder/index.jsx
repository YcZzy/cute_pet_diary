import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Picker } from '@tarojs/components'
import { AtButton, AtForm, AtTextarea, AtMessage, AtIcon } from 'taro-ui'
import { debounce, navigateBack } from '@utils/common'
import MyPicker from '@components/picker'
import { connect } from '@tarojs/redux'
import { reminder_default_img } from '@config'
import { cloudAdapter } from '@utils/adapter'
import { getReminders } from '@actions/rar'
import './index.scss'

@connect(({ config }) => ({
  selector: config.plan,
  cycles: config.cycles
}), (dispatch) => ({
  getReminders(petId) {
    dispatch(getReminders(petId))
  }
}))
class AddReminder extends Component {
  config = {
    navigationBarTitleText: '添加提醒计划'
  }
  state = {
    petId: '',
    plan: '',
    nextTime: '',
    cycle: '',
    note: '',
    img: ''
  }
  componentWillMount() {
    const { petId } = this.$router.params
    this.setState({ petId })
  }
  onChange = debounce((attr, value) => {
    this.setState({
      [attr]: value
    })
  })
  handlePlanChange = ({ value, index }) => {
    if (index === -1) {
      this.setState({ img: reminder_default_img})
      this.onChange('plan', value)
    }else {
      this.setState({ img: this.props.selector[index].img })
      this.onChange('plan', this.props.selector[index].value)
    }
  }
  onSubmit = async () => {
    const { petId, plan, nextTime, cycle, note, img } = this.state
    if (!plan) {
      Taro.atMessage({
        message: '请选择提醒事项',
        type: 'error',
      })
      return;
    }
    if (!nextTime) {
      Taro.atMessage({
        message: '请选择提醒时间',
        type: 'error',
      })
      return;
    }
    if (!cycle) {
      Taro.atMessage({
        message: '请选择重复周期',
        type: 'error',
      })
      return;
    }
    let reminder = { petId, plan, nextTime, cycle, note, img }
    const res = await cloudAdapter('rar', 'addReminder', reminder)
    if (res.code === 0) {
      // 直接返回并不会再次触发pet获取pets
      this.props.getReminders(petId)
      navigateBack('添加成功')
    }
  }

  render() {
    const { plan, nextTime, cycle, note } = this.state
    const { selector, cycles } = this.props
    
    return (
      <AtForm onSubmit={this.onSubmit}>
        <View className="part1 part-common">
          <text>计划名称</text>
          <MyPicker
            title="提醒事项"
            mode="rar"
            selector={selector}
            onChange={this.handlePlanChange}
          >
            <View className="part1-select">
              {
                plan ? (
                  <View>
                    <Image src={img} />
                    <Text className="active">{plan}</Text>
                  </View>
                ) : <Text>选择提醒事项</Text>
              }
              <AtIcon value="chevron-right" size="20" color="#ccc" />
            </View>
          </MyPicker>
        </View>
        <View className="part2 part-common">
          <View className="next-time">
            <text>提醒时间</text>
            <MyPicker
              title="提醒时间"
              mode='date'
              onChange={(value) => {
                this.onChange('nextTime', value)
              }}
            >
              <View className="next-time-select">
                {
                  nextTime ? <Text className="active">{nextTime}</Text>
                    : <Text>选择提醒时间</Text>
                }
                <AtIcon value="chevron-right" size="20" color="#ccc" />
              </View>
            </MyPicker>
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