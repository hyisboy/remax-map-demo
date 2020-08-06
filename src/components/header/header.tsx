import React, { useState } from 'react'
import { View, Text, Image } from 'remax/wechat'
import './header.scss'
import { getPageHeaderHeight, getStatusBarHeight, getStatusBarOffset } from '@/utils/utils'
export interface HeaderProps {
  title: string
  head?: string //头像
  type: 'default' | 'head' | 'nav' // default： 什么都没有， head： 头像， nav: 导航
}
interface HeaderState {
  height: string
  statusBarHeight: string
  offset: number
}
const Header = (props: HeaderProps) => {
  const [{ height, statusBarHeight, offset }, setState] = useState<HeaderState>({ height: getPageHeaderHeight(), statusBarHeight: getStatusBarHeight(), offset: getStatusBarOffset() })

  // 获取侧边导航
  const getNav = () => {
    return (
      <View className='page-header_nav'>
        <Image className='_back-icon' src='/assets/img/back.png'></Image>
        <View className='_split-line'></View>
        <Image className='_home-icon' src='/assets/img/home.png'></Image>
      </View>
    )
  }
  const getHead = () => {
    return (
      <View className='page-header_head' style={{ top: offset + 'rpx' }}>
        <Image className='_head-icon' src='/assets/img/icon.png'></Image>
      </View>
    )
  }
  const sideView = () => {
    let content: any = ''
    switch (props.type) {
      case 'head':
        content = getHead()
        break
      case 'nav':
        content = getNav()
        break
    }
    return content
  }

  return (
    <View className='page-header'>
      <View className='page-header_status' style={{ height: statusBarHeight }}></View>
      <View className='page-header_content' style={{ height: height, lineHeight: height }}>
        {sideView()}
        <Text>{props.title}</Text>
      </View>
    </View>
  )
}
Header.defaultProps = {
  type: 'head'
}
export default Header
