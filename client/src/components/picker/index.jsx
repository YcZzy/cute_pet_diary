import { Component } from "@tarojs/taro"
import { Text, View, Image } from "@tarojs/components"
import './index.scss'
import { AtIcon } from "taro-ui"
import MyPickerGroup from './picker-group'

class MyPicker extends Component {
  constructor(props) {
    this.state = {
      isOpened: false,
      title: props.title || '',
      selector: props.selector,
      onChange: props.onChange
    }
  }
  onClose = () => {
    this.setState({
      isOpened: false
    })
  }
  render() {
    const { title, isOpened, selector, onChange } = this.state
    return (
      <View>
        <View
          onClick={() => this.setState({ isOpened: true })}
        >
          {this.props.children}
        </View>
        {
          isOpened ? (
            <MyPickerGroup
              title={title}
              selector={selector}
              onChange={onChange}
              onClose={this.onClose}
            />
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