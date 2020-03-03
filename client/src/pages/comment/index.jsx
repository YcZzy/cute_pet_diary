import { View, Text } from '@tarojs/components'

function Comment () {
  return (
    <View className='index'>
      <Text>Hello world!</Text>
    </View>
  )
}

Comment.config = {
  navigationBarTitleText: '我的评论'
}

export default Comment