import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { navigateTo } from '@utils/common'
import './index.scss'
import p5 from '@assets/images/p5.jpg'
import ListItem from '@components/list-item'

class Rar extends Component {
  config = {
    navigationBarBackgroundColor: '#fdd730',
    navigationBarTitleText: '提醒记录'
  }
  state = {
    index: 0
  }
  goto = (type) => {
    if (this.state.index === 0) {
      navigateTo(`/pages/${type}-reminder/index`)
    }else {
      navigateTo(`/pages/${type}-record/index`)
    }
  }
  render() {
    const { index } = this.state

    return (
      <View className='rar'>
        <View className="rar-header">
          <View className="rar-header-left">
            <Text className="nickname">Coffee</Text>
            <Text>
              已陪伴小主<Text className="num">141</Text>天。
            </Text>
            <AtIcon prefixClass="icon" value="female" size="15" color="#000" />
          </View>
          <View className="rar-header-right">
            <View className="avatar">
              <Image src={p5} />
            </View>
          </View>
        </View>
        <View className="rar-content">
          <View className="tab">
            <Text 
              className={ index === 0 ? 'active' : ''}
              onClick={() => this.setState({ index: 0 })}
            >提醒事项</Text>
            <Text 
              className={ index === 1 ? 'active' : ''}
              onClick={() => this.setState({ index: 1 })}
            >成长记录</Text>
          </View>
          {
            index === 0 ? (
              <View>
                <ListItem />
              </View>
            ) : (
              null
            )
          }
        </View>
        <View className="rar-oper">
          <View onClick={() => this.goto('edit')}>
            <AtIcon prefixClass="icon" value="edit" color="#FB6205" size="26"/>
          </View>
          <View onClick={() => this.goto('add')}>
            <AtIcon prefixClass="icon" value="add" color="#f4ea2a" size="26"/>
          </View>
        </View>
      </View>
    )
  }
}

export default Rar