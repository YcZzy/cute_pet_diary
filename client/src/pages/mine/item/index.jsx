import { navigateTo } from '@utils/common'
import { AtListItem } from "taro-ui"

function Item(props) {
  const { title, extraText, icon, user, auth, url } = props
  let attrs = {
    onClick:() => {
      if (auth && !user) {
        navigateTo('/pages/auth/index')
      }else {
        navigateTo(url)
      }
    }
  }
  extraText ? attrs.extraText = extraText : null
  return (
    <AtListItem
      {...attrs}
      title={title}
      arrow='right'
      extraText={extraText}
      iconInfo={{
        size: 20,
        color: '#333',
        prefixClass: "icon",
        value: icon,
      }}
      hasBorder={false}
    />
  )
}

export default Item