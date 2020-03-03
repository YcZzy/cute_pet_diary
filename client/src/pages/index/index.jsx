import { View, Text } from '@tarojs/components'
import './index.scss'

function Index () {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '萌宠分享'
}

export default Index