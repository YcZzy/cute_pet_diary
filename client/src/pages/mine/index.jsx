import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon, AtList } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { mine, other } from './config'
import Item from './item'
import { navigateTo } from '@utils/common'
import avatar_default from '@assets/images/user.png'
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
    const { user, extraText } = this.props
    return (
      <View className="mine">
        <View
          className="user common"
          onClick={() => {
            !user ? navigateTo('/pages/auth/index') : null
          }}
        >
          <View className="avatar">
            <Image src={user ? user.avatarUrl : avatar_default} />
          </View>
          <Text>{user ? user.nickName : '点击登录'}</Text>
          {!user ? <AtIcon value="chevron-right" size={24} color="#ccc"/> : null}
        </View>
        <AtList hasBorder={false} className="common">
          {
            mine.map(item => (
              <Item
                title={item.title}
                extraText={0}
                icon={item.key}
                url={item.url}
                auth={item.auth}
                user={user}
                key={item.key}
              />
            ))
          }
        </AtList>
        <AtList hasBorder={false} className="common">
          {
            other.map(item => (
              <Item
                title={item.title}
                icon={item.key}
                url={item.url}
                auth={item.auth}
                user={user}
                key={item.key}
              />
            ))
          }
        </AtList>
        {/* {
          user ? (
            <View
              className="logout common"
              onClick={() => {
                !user ? navigateTo('/pages/auth/index') : null
              }}
            >
              <AtIcon prefixClass="icon" value="logout" size={20} color="#333"/>
              <Text>退出登录</Text>
            </View>
          ) : null
        } */}
      </View>
    );
  }
}

// 不可放上面直接导出
export default Mine