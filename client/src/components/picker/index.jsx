import Taro, { Component } from "@tarojs/taro"
import { Text, View } from "@tarojs/components"
import './index.scss'
import { AtInput } from "taro-ui"
import { debounce } from '@utils/common'
import MyPickerGroup from './picker-group'
// There are multiple modules with names that only differ in casing.问题: 把view的v大写了
import MyPickerView from '@components/picker-view'
import { init, formDate } from './date.js'

class MyPicker extends Component {
  constructor(props) {
    super(props)
    this.pickerView = Taro.createRef()
    this.state = {
      isOpened: false,
      rar_index: -1,
      value: ''
    }
  }
  onClose = () => {
    this.setState({
      isOpened: false
    })
  }
  rarConfirm = () => {
    const { rar_index, value } = this.state
    if (rar_index === -1 && !value.length) return;
    let res = {
      index: rar_index,
      value
    }
    this.props.onChange(res)
    this.onClose()
  }

  dateConfirm = () => {
    const [y, m, d, h, f] = this.pickerView.current.state.value
    const { years, months, days, hours, minutes } = init()
    const res = formDate(years[y], months[m], days[d], hours[h], minutes[f])
    this.props.onChange(res)
    this.onClose()
  }

  render() {
    const { isOpened, rar_index, value } = this.state
    const { title, selector, mode } = this.props

    return (
      <View>
        <View
          onClick={() => {
            this.setState({ isOpened: true })
          }}
        >
          {this.props.children}
        </View>
        {
          isOpened && mode === 'rar' ? (
            <MyPickerGroup
              title={title}
              index={rar_index}
              value={value}
              mode={mode}
              onConfirm={this.rarConfirm}
            >
              <View className="rar">
                <View className='scrollview'>
                  <View
                    className='at-row at-row--wrap at-row__justify--between'
                    onClick={(e) => {
                      if (e.target.dataset.index !== rar_index) {
                        this.setState({ rar_index: e.target.dataset.index })
                      } else {
                        this.setState({ rar_index: -1 })
                      }
                    }}
                  >
                    {
                      selector.map((item, i) => (
                        <Text
                          className={`at-col at-col-5 item ${i === rar_index ? 'active' : ''}`}
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
                    placeholder={`在此输入自定义的${title}`}
                    onChange={debounce((value) => this.setState({ value }))}
                  />
                </View>
              </View>
            </MyPickerGroup>
          ) : null
        }
        {
          isOpened && mode === 'date' ? (
            <MyPickerGroup
              title={title}
              mode={mode}
              onConfirm={this.dateConfirm}
            >
              <MyPickerView  ref={this.pickerView}/>
            </MyPickerGroup>
          ) : null
        }
        {
          isOpened ? (
            <View
              className="curtain"
              onClick={() => this.setState({ isOpened: false })}
            />
          ) : null
        }
      </View>
    )
  }
}

export default MyPicker