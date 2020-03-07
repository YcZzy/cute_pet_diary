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
class EditReminder extends Component {
  config = {
    navigationBarTitleText: '修改提醒计划'
  }
  state = {
    _id: '',
    plan: '',
    nextTime: '',
    cycle: '',
    note: '',
    img: ''
  }
  componentWillMount() {
    let { _id } = this.$router.params
    this.setState({ _id })
  }
  componentDidMount() {
    this.getReminder()
  }
  getReminder = async () => {
    const { _id } = this.state
    const res = await cloudAdapter('rar', 'getReminder', { _id })
    if (!res.code && res.data.length) {
      this.setState({
        ...res.data[0]
      })
    }
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
    const { _id, petId, plan, nextTime, cycle, note, img } = this.state
    let reminder = { _id, petId, plan, nextTime, cycle, note, img }
    const res = await cloudAdapter('rar', 'updateReminder', reminder)
    if (res.code === 0) {
      this.props.getReminders(petId)
      navigateBack('更新成功')
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
  };
}

export default EditReminder