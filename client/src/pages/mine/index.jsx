import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import NotLogin from './notlogin'
import { info } from './config'
import { navigateTo } from '@utils/common'
import './index.scss'

@connect(({ mine }) => ({
  user: mine.user
}), (dispatch) => ({

}))
class Mine extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }
  render() {
    const { user } = this.props
    return (
      <View>
        {
          user ? (
            <View className="islogin">
              <View className="islogin-header">
                <View className="user">
                  <View className="avatar">
                    <Image src={user.avatarUrl} />
                  </View>
                  <Text>{user.nickName}</Text>
                </View>
                <View className="info">
                  {
                    info.map((item) => (
                      <View
                        className="info-item"
                        onClick={() => { navigateTo(item.url) }}
                        key={item.key}
                      >
                        <Text className="number">0</Text>
                        <Text>{item.title}</Text>
                      </View>
                    ))
                  }
                </View>
              </View>
            </View>
          ) : (
              <NotLogin />
            )
        }
      </View>
    );
  }
}

// 不可放上面直接导出
export default Mine