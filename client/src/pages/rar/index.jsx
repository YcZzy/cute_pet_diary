import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { navigateTo, computeFromArrivalDate } from '@utils/common'
import { connect } from '@tarojs/redux'
import { getReminders, getRecords } from '@actions/rar'
import './index.scss'
import ListItem from '@components/list-item'

@connect(({ rar }) => ({
  reminders: rar.reminders,
  records: rar.records
}), (dispatch) => ({
  getReminders(petId) {
    dispatch(getReminders(petId))
  },
  getRecords(petId) {
    dispatch(getRecords(petId))
  }
}))
class Rar extends Component {
  config = {
    navigationBarBackgroundColor: '#fdd730',
    navigationBarTitleText: '提醒记录'
  }
  state = {
    index: 0,
    pet: {}
  }
  componentWillMount() {
    const pet = JSON.parse(this.$router.params.pet)
    this.setState({ pet })
  }
  componentDidMount() {
    this.props.getReminders(this.state.pet._id)
    this.props.getRecords(this.state.pet._id)
  }
  gotoAdd = () => {
    if (this.state.index === 0) {
      navigateTo(`/pages/add-reminder/index?petId=${this.state.pet._id}`)
    } else {
      navigateTo(`/pages/add-record/index?petId=${this.state.pet._id}`)
    }
  }
  render() {
    const { index } = this.state
    const { reminders, records } = this.props
    const { nickname, gender, avatarUrl, arrival_date } = this.state.pet

    return (
      <View className='rar'>
        <View className="rar-header">
          <View className="rar-header-left">
            <Text className="nickname">{nickname}</Text>
            <Text>
              已陪伴小主<Text className="num">{computeFromArrivalDate(arrival_date)}</Text>天。
            </Text>
            <AtIcon
              prefixClass="icon"
              value={gender === 0 ? 'male' : 'female'}
              size="15"
              color="#000"
            />
          </View>
          <View className="rar-header-right">
            <View className="avatar">
              <Image src={avatarUrl} />
            </View>
          </View>
        </View>
        <View className="rar-content">
          <View className="tab">
            <Text
              className={index === 0 ? 'active' : ''}
              onClick={() => this.setState({ index: 0 })}
            >提醒事项</Text>
            <Text
              className={index === 1 ? 'active' : ''}
              onClick={() => this.setState({ index: 1 })}
            >成长记录</Text>
          </View>
          <View style={index !== 0 ? {display: 'none'} : {}}>
            {
              reminders.map(item => (
                <ListItem
                  img={item.img}
                  cycle={item.cycle}
                  note={item.note}
                  title={item.plan}
                  time={item.nextTime}
                  _id={item._id}
                  petId={item.petId}
                  key={item._id}
                />
              ))
            }
          </View>
          <View style={index !== 1 ? {display: 'none'} : {}}>
            {
              records.map(item => (
                <ListItem
                  img={item.img}
                  note={item.note}
                  title={item.name}
                  time={item.time}
                  pictures={item.pictures}
                  _id={item._id}
                  petId={item.petId}
                  key={item._id}
                />
              ))
            }
          </View>
        </View>
        <View className="rar-oper">
          {/* <View onClick={() => this.gotoEdit()}>
            <AtIcon prefixClass="icon" value="edit" color="#FB6205" size="30" />
          </View> */}
          <View onClick={() => this.gotoAdd()}>
            <AtIcon prefixClass="icon" value="add" color="#f4ea2a" size="30" />
          </View>
        </View>
      </View>
    )
  }
}

export default Rar