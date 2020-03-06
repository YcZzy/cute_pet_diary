import { View, Image } from "@tarojs/components"
import { AtIcon } from "taro-ui"
import './index.scss'
import p5 from '@assets/images/p5.jpg'

function ListItem (props) {
  const { img, cycle, nextTime, note, plan } = props.reminder
  return (
    <View className="list-item">
      <View className="list-item-img">
        <Image src={img} />
      </View>
      <View className="list-item-content">
        <Text className="title">{plan}</Text>
        <View className="detail">
          <Text className="time">
            {cycle}（下次提醒时间：{nextTime}）
          </Text>
          <Text className="desc">{note}</Text>
        </View>
        <View>
          <View className="img">
            <Image src={p5}/>
          </View>
        </View>
      </View>
      <View className="list-item-oper">
        <View>
          <AtIcon prefixClass="icon" value="pen" size="20" color="#fdd730"/>
        </View>
        <View>
          <AtIcon prefixClass="icon" value="delete" size="20" color="#fdd730"/>
        </View>
      </View>
    </View>
  )
}

ListItem.defaultProps = {
  reminder: {},
  record: {}
}

export default ListItem