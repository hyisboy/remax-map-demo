/*
 * @Descripttion:
 * @version:
 * @Author: david
 * @Date: 2020-08-05 10:11:19
 * @LastEditors: david
 * @LastEditTime: 2020-08-05 18:54:05
 */
import { getSystemInfoSync, getMenuButtonBoundingClientRect } from 'remax/wechat'

/**
 * 获取设备系统信息
 */
export function getMySystemInfo() {
  const systemInfo: WechatMiniprogram.GetSystemInfoSyncResult = getSystemInfoSync()
  return systemInfo
}

/**
 * 获取页面顶部高度（不包含状态栏）
 */
export function getPageHeaderHeight() {
  const height = getStatusBarOffset() + getMenuButtonBoundingClientRect().height
  return height * 2 + 'rpx'
}
export function getStatusBarOffset() {
  const systemInfo = getMySystemInfo()
  const isIOS = systemInfo.system.indexOf('iOS') > -1
  const boundButtonInfo = getMenuButtonBoundingClientRect()
  let offset = isIOS ? 2 : -2
  offset = (boundButtonInfo.top - systemInfo.statusBarHeight + offset) * 2
  return offset
}
/**
 * 获取页面顶部状态栏高度
 */
export function getStatusBarHeight() {
  return getMySystemInfo().statusBarHeight * 2 + 'rpx'
}

export function copy(data: any) {
  if (!data) {
    return ''
  }
  return JSON.parse(JSON.stringify(data))
}
export function getPaddingTop() {
  let h = getPageHeaderHeight().replace('rpx', '')
  let s = getStatusBarHeight().replace('rpx', '')
  return +h + +s + 'rpx'
}
