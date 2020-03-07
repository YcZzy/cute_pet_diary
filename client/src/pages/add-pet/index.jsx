import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import {
  AtButton,
  AtForm,
  AtImagePicker,
  AtTextarea,
  AtInput,
  AtIcon,
  AtMessage
} from 'taro-ui'
import { pet_avatar } from '@config'
import { debounce, navigateBack, getYMD } from '@utils/common'
import MySwitch from '@components/switch'
import { cloudAdapter, upload } from '@utils/adapter'
import { connect } from '@tarojs/redux'
import * as createActions from '@actions/pet'
import { initVariety } from '@actions/config'
import './index.scss'

@connect(({ config }) => ({
  selector: config.variety
}), (dispatch) => ({
  getPets() {
    dispatch(createActions.getPets())
  },
  getSelector() {
    dispatch(initVariety())
  }
}))
class AddPet extends Component {
  state = {
    nickname: '',
    variety: '',
    gender: 0,
    sterilization: 1,
    birthday: '',
    arrival_date: '',
    avatarUrl: '',
    files: [],
    lifestyle: ''
  }
  componentDidMount() {
    this.props.getSelector() // 获取品种配置
  }
  onChange = debounce((attr, value) => {
    this.setState({
      [attr]: value
    })
  })
  onSubmit = async () => {
    const { nickname, variety, birthday, gender, sterilization, arrival_date, files, lifestyle } = this.state
    if (!nickname || !variety || !birthday || !arrival_date || !files.length || !lifestyle) {
      Taro.atMessage({ 
        message: '请填写完整信息',
        type: 'warning'
      })
      return;
    }
    const avatarUrl = await upload(pet_avatar, files)
    if (!avatarUrl.length) {
      Taro.atMessage({
        message: '头像上传失败',
        type: 'error',
      })
      return;
    }
    let pet = { nickname, variety, gender, sterilization, birthday, arrival_date, avatarUrl: avatarUrl[0], lifestyle }
    const res = await cloudAdapter('pet', 'addPets', pet)
    if (res.code === 0) {
      // 直接返回并不会再次触发pet获取pets
      this.props.getPets()
      navigateBack('添加成功')
    }
  }
  render() {
    const { nickname, variety, birthday, arrival_date, files, lifestyle } = this.state
    const { selector } = this.props

    return (
      <AtForm onSubmit={this.onSubmit}>
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
                this.onChange('nickname', value)
              }}
            />
          </View>
          <View className="variety">
            <text>品种</text>
            <Picker
              mode='selector'
              rangeKey="value"
              range={selector}
              onChange={(e) => {
                this.onChange('variety', selector[e.detail.value].value)
              }}
            >
              <View className="variety-select">
                {
                  variety ? <Text className="active">{variety}</Text>
                    : <Text>请选择品种</Text>
                }
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
              leftIconValue="close"
              rightIconValue="check"
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
              end={getYMD()} // 限制最大能取得日期
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
              end={getYMD()}
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
              showAddBtn={!files.length}
              onChange={(files) => {
                this.onChange('files', files)
              }}
            />
        </View>
        <View className="part5 part-common">
          <Text>生活方式</Text>
          <AtTextarea
            value={lifestyle}
            onChange={(e) => {
              this.onChange('lifestyle', e.detail.value)
            }}
            maxLength={200}
            placeholder='您爱宠的生活方式是...'
          />
        </View>
        <AtButton formType='submit' type="primary" circle>提交</AtButton>
        <AtMessage />
      </AtForm>
    )
  }
}

AddPet.config = {
  navigationBarTitleText: '添加宠物'
}

export default AddPet