/*
 * @Descripttion:
 * @version:
 * @Author: david
 * @Date: 2020-08-05 14:56:01
 * @LastEditors: david
 * @LastEditTime: 2020-08-05 15:28:26
 */
import { BASE_URL, SERVICE } from '../vari'
import { get } from '../request'

const TEST_PRE_URL = BASE_URL.test

const TEST_SUFFIX_URL = {
  getMarker: '/getMarker'
}

function getMarkers(): Promise<any[]> {
  return get(TEST_PRE_URL + TEST_SUFFIX_URL.getMarker)
}
export const MainApi = {
  getMarkers
}
