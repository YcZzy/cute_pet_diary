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
import { cloudAdapter, upload, deleteFiles } from '@utils/adapter'
import MyPicker from '@components/picker'
import { connect } from '@tarojs/redux'
import { getRecords } from '@actions/rar'
import { debounce, navigateBack, switchTime } from '@utils/common'
import { record_default_img, record_picture } from '@config'
import './index.scss'

@connect(({ config }) => ({
  selector: config.record
}), (dispatch) => ({
  getRecords(petId) {
    dispatch(getRecords(petId))
  }
}))
class EditRecord extends Component {
  config = {
    navigationBarTitleText: '修改成长记录'
  }
  state = {
    _id: '',
    petId: '',
    name: '',
    img: '',
    time: '',
    note: '',
    files: [],
    pictures: []
  }
  componentWillMount() {
    let { _id } = this.$router.params
    this.setState({ _id })
  }
  componentDidMount() {
    this.getRecord()
  }
  getRecord = async () => {
    const { _id } = this.state
    const res = await cloudAdapter('rar', 'getRecord', { _id })
    if (!res.code) {
      this.setState({
        ...res.data
      },() => {
        let files = this.state.pictures.map(item => ({
          url: item
        }))
        this.setState({ files })
      })
    }
  }
  onChange = debounce((attr, value) => {
    this.setState({
      [attr]: value
    })
  })
  handleRecordChange = ({ value, index }) => {
    if (index === -1) {
      this.setState({ img: record_default_img})
      this.onChange('name', value)
    }else {
      this.setState({ img: this.props.selector[index].img })
      this.onChange('name', this.props.selector[index].value)
    }
  }
  onSubmit = async () => {
    const { _id, petId, name, img, time, note, files, pictures } = this.state

    let savePics = [] // 保留的图片
    let needUploadFiles = files.filter(item => !!item.file) // 来自非pictures
    if (files.length - needUploadFiles.length !== pictures.length) { // 有需要删除的图片
      let delePics = []
      // 找出需要删除的图片
      for(let i = 0; i < pictures.length; i++) {
        let j = 0
        for(; j < files.length; j++) {
          if (files[j].url === pictures[i]) {
            savePics.push(pictures[i])
            break;
          }
        }
        if (j === files.length) delePics.push(pictures[i])
      }
      const res = await deleteFiles(delePics)
      if (res[0].status !== 0) {
        Taro.atMessage({
          message: '图片删除失败',
          type: 'error',
        })
        return;
      }
    }else { // pictures没动
      savePics = pictures
    }

    let newPics = []
    if (needUploadFiles.length) {
      newPics = await upload(record_picture, needUploadFiles)
      if (!newPics.length) {
        Taro.atMessage({
          message: '图片上传失败',
          type: 'error',
        })
        return;
      }
    }
    if (files.length !== needUploadFiles.length) {
      newPics = newPics.concat(savePics)
    }
    let record = { _id, petId, name, img, time, note, pictures: newPics }
    if (typeof time === 'string') {
      record.time = switchTime(time)
    }
    const res = await cloudAdapter('rar', 'updateRecord', record)
    // console.log(res)
    if (res.code === 0) {
      this.props.getRecords(petId)
      navigateBack('修改成功')
    }
  }
  render() {
    const { selector } = this.props
    const { name, time, note, files, pictures } = this.state

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
                  time ? (
                    <Text className="active">
                      {typeof time === 'string' ? time : switchTime(time)}
                    </Text>
                  ) : <Text>选择具体时间</Text>
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
            count={4 - files.length}
            length={4}
            showAddBtn={files.length < 4}
            onChange={(files) => this.onChange('files', files)}
          />
        </View>
        <AtButton formType='submit' type="primary" circle>提交</AtButton>
        <AtMessage />
      </AtForm>
    )
  }
}

export default EditRecord