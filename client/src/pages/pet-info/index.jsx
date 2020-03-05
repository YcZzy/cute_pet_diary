import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Picker, Image } from '@tarojs/components'
import {
  AtButton,
  AtForm,
  AtTextarea,
  AtInput,
  AtIcon,
  AtMessage
} from 'taro-ui'
import { debounce, navigateBack, getYMD } from '@utils/common'
import { cloudAdapter, upload, deleteFiles } from '@utils/adapter'
import MySwitch from '@components/switch'
import { selector, cloudPath } from './config'
import { connect } from '@tarojs/redux'
import * as createActions from '@actions/pet'
import './index.scss'

@connect(() => ({}), (dispatch) => ({
  getPets() {
    dispatch(createActions.getPets())
  }
}))
class PetInfo extends PureComponent {
  config = {
    navigationBarTitleText: '修改宠物信息'
  }
  state = {
    files: [],
    tempAvatar: ''
  }
  componentWillMount() {
    const pet = JSON.parse(this.$router.params.pet)
    this.setState({
      ...pet
    })
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
  chooseImage = async () => {
    const res = await Taro.chooseImage({  count: 1 })
    // console.log(res)
    this.setState({
      files: res.tempFiles,
      tempAvatar: res.tempFiles[0].path
    })
  }
  onSubmit = async () => {
    const { _id, nickname, variety, birthday, gender, sterilization, arrival_date, files, avatarUrl, lifestyle } = this.state
    if (!nickname || !variety || !birthday || !arrival_date || !lifestyle) {
      Taro.atMessage({
        message: '请填写完整信息',
        type: 'warning'
      })
      return;
    }
    let avatarID = null
    if (files.length !== 0) { // 需要修改头像
      const res = await deleteFiles([avatarUrl])
      // console.log(res)
      if (res[0].status !== 0) {
        Taro.atMessage({
          message: '头像修改失败',
          type: 'error',
        })
        return;
      }
      avatarID = await upload(cloudPath, files)
      if (!avatarID.length) {
        Taro.atMessage({
          message: '头像上传失败',
          type: 'error',
        })
        return;
      }
    }
    let avatar = avatarID ? avatarID[0] : avatarUrl
    let pet = { _id, nickname, variety, gender, sterilization, birthday, arrival_date, avatarUrl: avatar, lifestyle }
    const res = await cloudAdapter('pet', 'updatePets', pet)
    if (res.code === 0) {
      // 直接返回并不会再次触发pet获取pets
      this.props.getPets()
      navigateBack('修改成功')
    }
  }
  render() {
    const {
      avatarUrl,
      arrival_date,
      birthday,
      gender,
      nickname,
      sterilization,
      variety,
      lifestyle
    } = this.state

    return (
      <View className="pet-info">
        <AtForm onSubmit={this.onSubmit}>
          <View
            className="card"
            style={{
              background: `url(${
                gender ? require('../../assets/images/female.png')
                  : require('../../assets/images/male.png')
                }) no-repeat`,
              backgroundSize: '40% 120%',
              backgroundPosition: '100% -20rpx',
              backgroundColor: '#fff'
            }}
          >
            <View className="card-info">
              <View className="card-info-top">
                <View onClick={this.chooseImage}>
                  <Image src={tempAvatar || avatarUrl} />
                </View>
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
              </View>
            </View>
          </View>
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
                  console.log(value)
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
                value={gender}
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
                value={sterilization}
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
          <View className="part5 part-common">
            <Text>生活方式</Text>
            <AtTextarea
              value={lifestyle}
              onChange={(e) => {
                this.handleChange('lifestyle', e.detail.value)
              }}
              maxLength={200}
              placeholder='您爱宠的生活方式是...'
            />
          </View>
          <AtButton formType='submit' type="primary" circle>提交</AtButton>
          <AtMessage />
        </AtForm>
      </View>
    )
  }
}

export default PetInfo