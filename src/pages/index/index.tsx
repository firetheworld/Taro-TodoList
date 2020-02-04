import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state = {
    name: '复旦',
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello {this.state.name}!</Text>
      </View>
    )
  }
}
