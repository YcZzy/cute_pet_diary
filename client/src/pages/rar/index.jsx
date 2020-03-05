import { View, Text } from '@tarojs/components'

function Rar () {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

Rar.config = {
  navigationBarBackgroundColor: '#fdd730',
  navigationBarTitleText: '提醒记录'
}

export default Rar