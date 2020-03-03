import { AtIcon } from "taro-ui";
import { useState, memo } from '@tarojs/taro'
import './index.scss'
import { View } from "@tarojs/components";

function Switch(props) {
  const [index, setIndex] = useState(0)
  let leftIconAttr = {
    value: props.leftIconValue,
    color: props.color,
    size: props.size ? props.size : '20',
  }
  let rightIconAttr = {
    value: props.rightIconValue,
    color: props.color,
    size: props.size ? props.size : '20',
  }
  if (props.prefixClass) {
    leftIconAttr.prefixClass = props.prefixClass
    rightIconAttr.prefixClass = props.prefixClass
  }
  
  return (
    <View 
      className="switch" 
      onClick={() => {
        let next = !index 
        setIndex(next)
        props.onChange(next)
      }}
    >
      <AtIcon {...leftIconAttr} />
      <AtIcon {...rightIconAttr} />
      <View className={`slide ${ index ? 'right' : ''}`}></View>
    </View>
  )
}

export default memo(Switch)