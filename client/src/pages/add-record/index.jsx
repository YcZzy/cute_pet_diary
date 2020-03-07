import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { 
  AtButton, 
  AtForm, 
  AtTextarea, 
  AtMessage, 
  AtIcon, 
  AtImagePicker 
} from 'taro-ui'
import { cloudAdapter, upload } from '@utils/adapter'
import MyPicker from '@components/picker'
import { connect } from '@tarojs/redux'
import { getRecords } from '@actions/rar'
import { debounce, navigateBack } from '@utils/common'
import { record_default_img, record_picture } from '@config'
import './index.scss'

@connect(({ config }) => ({
  selector: config.record
}), (dispatch) => ({
  getRecords(petId) {
    dispatch(getRecords(petId))
  }
}))
class AddRecord extends Component {
  config = {
    navigationBarTitleText: '添加成长记录'
  }
  state = {
    petId: '',
    name: '',
    img: '',
    time: '',
    note: '',
    files: []
  }
  componentWillMount() {
    let { petId } = this.$router.params
    this.setState({ petId })
  }
  onChange = debounce((attr, value) => {
    this.setState({
      [attr]: value
    })
  })
  handleRecordChange = ({ value, index }) => {
    if (index === -1) {
      this.setState({ img: reminder_default_img})
      this.onChange('name', value)
    }else {
      this.setState({ img: this.props.selector[index].img })
      this.onChange('name', this.props.selector[index].value)
    }
  }
  onSubmit = async () => {
    const { petId, name, img, time, note, files } = this.state
    if (!name) {
      Taro.atMessage({
        message: '请选择记录名称',
        type: 'error',
      })
      return;
    }
    if (!time) {
      Taro.atMessage({
        message: '请选择具体',
        type: 'error',
      })
      return;
    }
    let pictures = []
    if (files.length) {
      pictures = await upload(record_picture, files)
      if (!pictures.length) {
        Taro.atMessage({
          message: '图片上传失败',
          type: 'error',
        })
        return;
      }
    }
    let record = { petId, name, img, time, note, pictures }
    const res = await cloudAdapter('rar', 'addRecord', record)
    // console.log(res)
    if (res.code === 0) {
      this.props.getRecords(petId)
      navigateBack('添加成功')
    }
  }
  render() {
    const { selector } = this.props
    const { name, time, note, files } = this.state
    return (
      <AtForm onSubmit={this.onSubmit}>
        <View className="part1 part-common">
          <text>记录名称</text>
          <MyPicker
            title="成长记录"
            mode="rar"
            selector={selector}
            onChange={this.handleRecordChange}
          >
            <View className="part1-select">
              {
                name ? (
                  <View>
                    <Image src={img} />
                    <Text className="active">{name}</Text>
                  </View>
                ) : <Text>选择记录名称</Text>
              }
              <AtIcon value="chevron-right" size="20" color="#ccc" />
            </View>
          </MyPicker>
        </View>
        <View className="part2 part-common">
          <View className="next-time">
            <text>具体时间</text>
            <MyPicker
              title="具体时间"
              mode='date'
              onChange={(value) => {
                this.onChange('time', value)
              }}
            >
              <View className="next-time-select">
                {
                  time ? <Text className="active">{time}</Text>
                    : <Text>选择具体时间</Text>
                }
                <AtIcon value="chevron-right" size="20" color="#ccc" />
              </View>
            </MyPicker>
          </View>
        </View>
        <View className="part3 part-common">
          <Text>备注</Text>
          <AtTextarea
            value={note}
            onChange={(e) => {
              this.onChange('note', e.detail.value)
            }}
            maxLength={200}
            placeholder='填写备注...'
          />
        </View>
        <View className="part4 part-common">
          <Text>照片</Text>
          <AtImagePicker
            multiple
            files={files}
            count={4}
            length={4}
            showAddBtn={files.length < 4}
            onChange={(files) => {
              this.onChange('files', files)
            }}
          />
        </View>
        <AtButton formType='submit' type="primary" circle>提交</AtButton>
        <AtMessage />
      </AtForm>
    )
  }
}

export default AddRecord