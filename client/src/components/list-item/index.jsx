import Taro, { Component } from '@tarojs/taro'
import { View, Image } from "@tarojs/components"
import { AtIcon, AtActionSheet, AtActionSheetItem } from "taro-ui"
import { navigateTo, navigateBack, switchTime } from '@utils/common'
import { cloudAdapter } from '@utils/adapter'
import { connect } from '@tarojs/redux'
import { getReminders, getRecords } from '@actions/rar'
import './index.scss'

@connect(() => ({}), (dispatch) => ({
  getReminders(petId) {
    dispatch(getReminders(petId))
  },
  getRecords(petId) {
    dispatch(getRecords(petId))
  }
}))
class ListItem extends Component {
  state = {
    isOpened: false
  }
  gotoEdit = (e) => {
    e.stopPropagation()
    const { _id, cycle } = this.props
    let type = cycle ? 'reminder' : 'record'
    navigateTo(`/pages/edit-${type}/index?_id=${_id}`)
  }
  handleDeleteItem = async () => {
    const { _id, cycle, petId, callback } = this.props
    let type = cycle ? 'Reminder' : 'Record'
    const res = await cloudAdapter('rar', `delete${type}`, { _id })
    if (res.code === 0) {
      this.setState({ isOpened: false })
      Taro.showToast({
        title: '删除成功',
        icon: 'success'
      })
      this.props[`get${type}s`](petId)
      if(callback) callback()
    }
  }
  handleDeleteItems = async () => {
    const { title, cycle, petId, callback } = this.props
    let type = cycle ? 'Reminders' : 'Records'
    const res = await cloudAdapter('rar', `delete${type}`, { petId, title })
    if (res.code === 0) {
      this.setState({ isOpened: false })
      this.props[`get${type}`](petId)
      if(callback) navigateBack('删除成功')
    }
  }
  handleCancle
  render() {
    const { img, cycle, note, title, time, pictures, callback } = this.props

    return (
      <View>
        <View
          className="list-item"
          onClick={() => {
            if (cycle || callback) return;
            navigateTo('/pages/record-detail/index?name=' + title)
          }}
        >
          <View className="list-item-img">
            <Image src={img} />
          </View>
          <View className="list-item-content">
            <Text className="title">
              {title} {title === '体重' ? `${Number(note).toFixed(2)}KG` : ''}
            </Text>
            <View className="detail">
              {
                cycle ? (
                  <Text className="time">
                    {cycle}（下次提醒时间：{switchTime(time)}）
                  </Text>
                ) : (
                    <Text className="time">{switchTime(time)}</Text>
                  )
              }
              {
                title !== '体重' ? (
                  <Text className="desc">{note}</Text>
                ) : null
              }
            </View>
            {
              pictures && pictures.length ? (
                <View>
                  {
                    pictures.map((item, index) => (
                      <View className="img" key={index}>
                        <Image src={item} />
                      </View>
                    ))
                  }
                </View>
              ) : null
            }

          </View>
          <View className="list-item-oper">
            <View onClick={this.gotoEdit}>
              <AtIcon prefixClass="icon" value="pen" size="20" color="#fdd730" />
            </View>
            <View onClick={(e) => {
              this.setState({ isOpened: true })
              e.stopPropagation()
            }}>
              <AtIcon prefixClass="icon" value="delete" size="20" color="#fdd730" />
            </View>
          </View>
        </View>
        <AtActionSheet
          isOpened={this.state.isOpened}
          cancelText='取消'
          onCancel={() => this.setState({ isOpened: false })}
          onClose={() => this.setState({ isOpened: false })}
        >
          <AtActionSheetItem
            onClick={this.handleDeleteItem}
          >删除此条{cycle ? '计划' : '记录'}</AtActionSheetItem>
          <AtActionSheetItem
            onClick={this.handleDeleteItems}
          >
            <Text style={{ color: 'red' }}>删除此类{cycle ? '计划' : '记录'}</Text>
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    )
  }
}

export default ListItem