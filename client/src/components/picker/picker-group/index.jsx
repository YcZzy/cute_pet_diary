import { useState } from '@tarojs/taro'
import { Text, View } from "@tarojs/components"
import { AtIcon, AtInput } from "taro-ui"
import { debounce } from '@utils/common'
import './index.scss';

function MyPickerGroup(props) {
  const [value, setValue] = useState('')
  const [index, setIndex] = useState(-1)
  const { title, selector, onChange, onClose } = props

  return (
    <View className="group">
      <View className="group-header">
        <View className='at-row at-row__justify--between'>
          <View className='at-col at-col-5 title'>{title}</View>
          <View className='at-col at-col-5 confirm'>
            <View 
              className={`confirm-btn ${index !== -1 || value ? 'active' : ''}`}
              onClick={() => {
                if (index === -1 && !value.length) return;
                index !== -1 ? onChange(selector[index].value) : onChange(value)
                onClose()
              }}
            >
              <AtIcon value="check" color="#fff" size="15" />
            </View>
          </View>
        </View>
      </View>
      <View className='scrollview'>
        <View 
          className='at-row at-row--wrap at-row__justify--between'
          onClick={(e) => {
            if(e.target.dataset.index !== index) {
              setIndex(e.target.dataset.index)
            }else {
              setIndex(-1)
            }
          }}
        >
          {
            selector.map((item, i) => (
              <Text
                className={`at-col at-col-5 item ${i === index ? 'active' : ''}`}
                key={item._id}
                dataIndex={i}
              >{item.value}</Text>
            ))
          }
        </View>
      </View>
      <View className="self">
        <Text>没有合适的?</Text>
        <AtInput
          clear
          border={false}
          name='value'
          type='text'
          placeholderStyle="color: #dbdbdb; font-size: 28rpx"
          value={value}
          placeholder='在此输入自定义提醒事项'
          onChange={debounce((val) => setValue(val))}
        />
      </View>
    </View>
  )
}

export default MyPickerGroup