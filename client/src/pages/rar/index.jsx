import { View, Text } from '@tarojs/components'

function Rar () {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

Rar.config = {
  navigationBarBackgroundColor: '#f4ea2a',
  navigationBarTitleText: '提醒记录'
}

export default Rar