import { Component } from "@tarojs/taro"
import { Text, View, Image } from "@tarojs/components"
import './index.scss'
import { AtIcon } from "taro-ui"
import MyPickerGroup from './picker-group'

class MyPicker extends Component {
  state = {
    isOpened: false
  }
  onClose = () => {
    this.setState({
      isOpened: false
    })
  }
  render() {
    const { isOpened } = this.state
    const { title, selector, onChange } = this.props

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