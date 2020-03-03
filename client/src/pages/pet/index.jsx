import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'
import * as createActions from '@actions/pet'
import pet_not from '@assets/images/pet_not.png'
import './index.scss'
import { navigateTo } from '@utils/common'

@connect(({ pet }) => ({
  pets: pet.pets
}), (dispatch) => ({
  getPets() {
    dispatch(createActions.getPets())
  }
}))
class Pet extends Component {
  config = {
    navigationBarTitleText: '我的宠物'
  }
  componentDidMount() {
   this.props.getPets()
  }
  render() {
    const { pets } = this.props
    return (
      <View>
        {
          pets.length ? (
            <Text>有宠物</Text>
          ) : (
            <View className="not-pets">
              <Image src={pet_not} />
              <Text>暂无宠物，快去添加吧！</Text>
            </View>
          )
        }
        <View className="add-pet" onClick={() => navigateTo('/pages/add-pet/index')}>
          <AtIcon prefixClass="icon" value="add-pet" size="30" color="#f4ea2a"/>
        </View>
      </View>
    )
  }
}

export default Pet