import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtActivityIndicator } from 'taro-ui'
import { connect } from '@tarojs/redux'
import * as createActions from '@actions/pet'
import pet_not from '@assets/images/pet_not.png'
import { navigateTo } from '@utils/common'
import Card from './card'
import './index.scss'

@connect(({ pet }) => ({
  pets: pet.pets,
  loading: pet.loading
}), (dispatch) => ({
  getPets() {
    dispatch(createActions.getPets())
  }
}))
class Pet extends Component {
  config = {
    navigationBarTitleText: '我的宠物'
  }
  // componentDidShow 性能不行
  componentDidMount() {
    this.props.getPets()
  }

  render() {
    const { pets, loading } = this.props
    return (
      <View>
        {
          loading ? (
            <View className="loading">
              <AtActivityIndicator color='#f4ea2a' size={60} />
            </View>
          ) : null
        }
        {
          !loading && pets.length !== 0 ?
            (
              pets.map(item => (
                <View className="pet-card" key={item._id}>
                  <Card petInfo={item}/>
                </View>
              ))
            ) : null 
        }
        {
          !loading && pets.length === 0 ?
            (
              <View className="not-pets">
                <Image src={pet_not} />
                <Text>暂无宠物，快去添加吧！</Text>
              </View>
            ) : null
        }
        <View className="add-pet" onClick={() => navigateTo('/pages/add-pet/index')}>
          <AtIcon prefixClass="icon" value="add-pet" size="30" color="#f4ea2a" />
        </View>
      </View>
    )
  }
}

export default Pet