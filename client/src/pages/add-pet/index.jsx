import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, RichText } from '@tarojs/components'
import {
  AtButton,
  AtForm,
  AtImagePicker,
  AtTextarea,
  AtInput,
  AtIcon
} from 'taro-ui'
import { selector } from './config'
import { debounce } from '@utils/common'
import MySwitch from '@components/switch'
import './index.scss'

class AddPet extends Component {
  state = {
    nickname: '',
    variety: '请选择品种',
    gender: 0,
    sterilization: 0,
    birthday: '',
    arrival_date: '',
    avatarUrl: '',
    files: [],
    lifestyle: ''
  }
  handleChange = debounce((attr, value) => {
    this.setState({
      [attr]: value
    })
  })
  onChange = (attr, value) => {
    this.setState({
      [attr]: value
    })
  }
  onSubmit = () => {
    console.log()
  }
  render() {
    const {
      nickname,
      variety,
      gender,
      sterilization,
      birthday,
      arrival_date,
      avatar_url,
      files,
      lifestyle
    } = this.state
    return (
      <AtForm
        onSubmit={this.onSubmit}
      >
        <View className="part-common part1">
          <View className="nickname">
            <text>昵称</text>
            <AtInput
              clear
              border={false}
              name='nickname'
              type='text'
              placeholder='请输入昵称'
              placeholderStyle="color: #dbdbdb"
              value={nickname}
              onChange={(value) => {
                this.handleChange('nickname', value)
              }}
            />
          </View>
          <View className="variety">
            <text>品种</text>
            <Picker
              mode='selector'
              rangeKey="key"
              range={selector}
              onChange={(e) => {
                this.onChange('variety', selector[e.detail.value].key)
              }}
            >
              <View className="variety-select">
                <Text className={variety !== '请选择品种' ? 'active' : ''}>{variety}</Text>
                <AtIcon value="chevron-right" size="20" color="#ccc" />
              </View>
            </Picker>
          </View>
        </View>
        <View className="part2 part-common">
          <View className="gender">
            <Text>性别</Text>
            <MySwitch
              prefixClass="icon"
              leftIconValue="male"
              rightIconValue="female"
              color="#fff"
              size="10"
              onChange={(value) => {
                this.onChange('gender', Number(value))
              }}
            />
          </View>
          <View className="sterilization">
            <Text>绝育</Text>
            <MySwitch
              leftIconValue="check"
              rightIconValue="close"
              color="#fff"
              size="10"
              onChange={(value) => {
                this.onChange('sterilization', Number(value))
              }}
            />
          </View>
        </View>
        <View className="part3 part-common">
          <View>
            <Picker
              mode='date'
              onChange={(e) => {
                this.onChange('birthday', e.detail.value)
              }}
            >
              <View className="select">
                <Text>出生日期</Text>
                {
                  !birthday ?
                    <AtIcon value="chevron-right" size="20" color="#ccc" /> :
                    <Text>{birthday}</Text>
                }
              </View>
            </Picker>
          </View>
          <View>
            <Picker
              mode='date'
              onChange={(e) => {
                this.onChange('arrival_date', e.detail.value)
              }}
            >
              <View className="select">
                <Text>到家日期</Text>
                {
                  !arrival_date ?
                    <AtIcon value="chevron-right" size="20" color="#ccc" /> :
                    <Text>{arrival_date}</Text>
                }
              </View>
            </Picker>
          </View>
        </View>
        <View className="part4 part-common">
          <Text>宠物头像</Text>
            <AtImagePicker
              count={1}
              length={1}
              files={files}
              showAddBtn={true}
              onChange={(files) => {
                if (files.length > 1) files.shift()
                this.onChange('files', files)
              }}
            />
        </View>
        <View className="part5 part-common">
          <Text>生活方式</Text>
          <AtTextarea
            value={lifestyle}
            onChange={(e) => {
              console.log(e)
              this.handleChange('lifestyle', e.detail.value)
            }}
            maxLength={200}
            placeholder='您爱宠的生活方式是...'
          />
        </View>
        <AtButton formType='submit' type="primary" circle>提交</AtButton>
      </AtForm>
    )
  }
}

AddPet.config = {
  navigationBarTitleText: '添加宠物'
}

export default AddPet