/*
 * @Descripttion:
 * @version:
 * @Author: david
 * @Date: 2020-08-05 10:04:27
 * @LastEditors: david
 * @LastEditTime: 2020-08-05 17:40:01
 */
import { AppConfig } from 'remax/wechat'
const config: AppConfig = {
  pages: ['pages/index/index'],
  window: {
    navigationBarBackgroundColor: '#fff',
    navigationStyle: 'custom',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  }
}
export default config
