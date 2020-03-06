import { View, CoverView } from "@tarojs/components"
import { AtIcon } from "taro-ui"
import './index.scss';

function MyPickerGroup(props) {
  const { title, onConfirm, index, value, mode } = props

  return (
    <View className="group">
      <View className="group-header">
        <View className='title'>{title}</View>
        <View className='confirm'>
          <View
            className={`confirm-btn ${mode !== 'rar' || index !== -1 || value ? 'active' : ''}`}
            onClick={() => onConfirm()}
          >
            <AtIcon value="check" color="#fff" size="15" />
          </View>
        </View>
      </View>
      {props.children}
    </View>
  )
}

export default MyPickerGroup