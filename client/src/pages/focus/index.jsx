import { View, Text } from '@tarojs/components'

function Focus () {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

Focus.config = {
  navigationBarTitleText: '我的关注'
}

export default Focus