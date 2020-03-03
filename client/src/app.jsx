import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'
import { Provider } from '@tarojs/redux'
import configStore from './store'
import './app.scss'
import '@assets/styles/custom-variables.scss'
import '@assets/styles/iconfont.scss'

const store = configStore()
class App extends Component {
  config = {
    pages: [
      'pages/add-pet/index',
      'pages/pet/index',
      'pages/mine/index',
      'pages/index/index',
      'pages/explore/index',
      'pages/auth/index',
      'pages/thumb/index',
      'pages/comment/index',
      'pages/fans/index',
      'pages/focus/index',
      'pages/rar/index',
      
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '萌宠日记',
      navigationBarTextStyle: 'black'
    },
    "tabBar": {
      "list": [
        {
          "pagePath": "pages/index/index",
          "iconPath": "./assets/images/index.png",
          "selectedIconPath": "./assets/images/index_active.png",
          "text": "首页"
        }, 
        {
          "pagePath": "pages/explore/index",
          "iconPath": "./assets/images/explore.png",
          "selectedIconPath": "./assets/images/explore_active.png",
          "text": "发现"
        },
        {
          "pagePath": "pages/pet/index",
          "iconPath": "./assets/images/pet.png",
          "selectedIconPath": "./assets/images/pet_active.png",
          "text": "宠物"
        },
        {
          "pagePath": "pages/mine/index",
          "iconPath": "./assets/images/mine.png",
          "selectedIconPath": "./assets/images/mine_active.png",
          "text": "我的"
        }
      ],
      "selectedColor": "#f4ea2a"
    },
  }

  componentDidMount () {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init({
        env: 'ldh-xinaa', // 获取环境ID：前往 云开发控制台-设置-环境ID
        traceUser: true // 是否要捕捉每个用户的访问记录。设置为true，用户可在管理端看到用户访问记录
      })
    }
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
