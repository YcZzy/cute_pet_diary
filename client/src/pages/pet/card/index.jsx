import { memo } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { computeFromBirthday, navigateTo } from '@utils/common'
import './index.scss'

function Card (props) {
  const {
    avatarUrl,
    birthday,
    gender,
    nickname,
    sterilization,
    variety
  } = props.petInfo
  const { countdown, ymd } = computeFromBirthday(birthday)
  return (
    <View
      className="card"
      style={{
        background: `url(${
          gender ? require('../../../assets/images/female.png')
            : require('../../../assets/images/male.png')
        }) no-repeat`,
        backgroundSize: '40% 120%',
        backgroundPosition: '100% -20rpx',
        backgroundColor: '#fff'
      }}
      onClick={() => {
        navigateTo('/pages/pet-info/index?pet=' + JSON.stringify(props.petInfo))
      }}
    >
      <View className="card-info">
        <View className="card-info-top">
          <View><Image src={avatarUrl} /></View>
          <View className="info">
            <Text>{nickname}</Text>
            <View>
              <Text>{variety}</Text>
              <Text>{ymd}</Text>
            </View>
          </View>
        </View>
        <View className="card-info-bottom">
          <View>
            <AtIcon 
              prefixClass="icon" 
              value={sterilization ? 'checked' : 'check'} 
              size="15"
              color={sterilization ? '#fdd730' : '#dbdbdb'}
            />
            <Text>{sterilization ? '已' : '未'}绝育</Text>
          </View>
          {
            countdown !== -1 ? (
              <Text className="countdown">
                {
                  countdown !== 0 ? (
                    <Text>
                      距离生日还有<Text className="num">{countdown}</Text>天
                    </Text>
                  ) : (
                    <Text className="num">今天是{nickname}的生日</Text>
                  )
                }
              </Text>
            ) : null
          }
        </View>
      </View>
      <View 
        className="card-oper" 
        onClick={(e) => {
          e.stopPropagation()
          navigateTo('/pages/rar/index?pet=' + JSON.stringify(props.petInfo))
        }}
      >
        <Text>+ 提醒</Text>
        <Text>记录</Text>
      </View>
    </View>
  )
}

Card.defaultProps = {
  petInfo: {}
}

export default memo(Card)