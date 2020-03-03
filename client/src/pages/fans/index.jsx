import { View, Text } from '@tarojs/components'

function Fans () {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

Fans.config = {
  navigationBarTitleText: '我的粉丝'
}

export default Fans