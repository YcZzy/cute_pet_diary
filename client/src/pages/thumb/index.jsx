import { View, Text } from '@tarojs/components'

function Thumb () {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

Thumb.config = {
  navigationBarTitleText: '我的点赞'
}

export default Thumb