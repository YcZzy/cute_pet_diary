import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import logo from '@assets/images/auth_logo.png'
import { AtIcon, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { login } from '@actions/mine'
import { navigateBack } from '@utils/common'
import { cloudAdapter } from '@utils/adapter'
import './index.scss'

@connect(() => ({}), (dispatch) => ({
  async auth(e) {
    const user = e.detail.userInfo
    const res = await cloudAdapter('mine', 'addUser', {user})
    if (res.code === 0) {
      dispatch(login(user))
      navigateBack('授权成功')
    }
  }
}))
class Auth extends Component {
  config = {
    navigationBarTitleText: '授权登录'
  }
  render() {
    const { auth } = this.props
    return (
      <View className="auth">
        <View className="logo">
          <Image src={logo}/>
          <Text>萌宠日记</Text>
        </View>
        <View className="auth-content">
          <Text>请授权萌宠日记获取您的以下信息：</Text>
          <Text>以下信息仅用于萌宠日记，我们绝不会泄露您的任何信息，也不会对您造成骚扰</Text>
          <View className="list">
            <View>
              <AtIcon value='check-circle' size='15' color="#ccc"></AtIcon>
              <Text>授权您的微信昵称及头像</Text>
            </View>
          </View>
        </View>
        <View className="auth-btn">
          <AtButton type='primary' circle openType="getUserInfo" onGetUserInfo={auth}>授权登录</AtButton>
        </View>
      </View>
    );
  }
}

export default Auth
