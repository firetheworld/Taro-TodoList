import React from 'react';
import { View, Text } from '@tarojs/components';
import './index.less';

export default class Index extends React.Component {
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
