import { View, Text, Image } from '@tarojs/components'
import logo from '@assets/images/mine_logo.png'
import { navigateTo } from '@utils/common'
import './index.scss'

function NotLogin({ toAuth }) {
  return (
    <View className="notlogin" onClick={() => { navigateTo('/pages/auth/index') }}>
      <View className="notlogin-bg"></View>
      <View className="notlogin-header">
        <View className="logo">
          <Image src={logo} />
        </View>
        <Text>登录</Text>
      </View>
    </View>
  )
}

export default NotLogin