import React, { useState, Component } from 'react'
import { View, Text, Image, Map, MapProps, getSetting, getLocation, createMapContext, CoverView, nextTick } from 'remax/wechat'
import './index.scss'
import Header from '@/components/header/header'
import { MainApi } from '@/request/api/main'
import { copy, getPaddingTop } from '@/utils/utils'

// marker
interface MarkerData {
  id: string
  iconPath: string
  width: string
  height: string
  latitude: number
  longitude: number
}
// state
interface IndexMapState {
  mapConfig: MapProps
  markersData: MarkerData[]
  mapContext: WechatMiniprogram.MapContext | null
  currentMarker: MarkerData | null
  currentCenter?: {
    lng: number
    lat: number
  }
  init: boolean
  initMarker: boolean // 首次点击marker 初始化marker数据
}
// props
interface IndexMapProps {
  pdTop: string
  setCurrentMarker: (marker: MarkerData) => void
  marker: MarkerData | null
}
let _currentMarker: MarkerData | null = null
class MapContent extends Component<IndexMapProps, IndexMapState> {
  constructor(props: IndexMapProps) {
    super(props)
    this.state = {
      mapConfig: {
        id: 'map',
        latitude: 0,
        scale: 14,
        longitude: 0,
        showLocation: true,
        showCompass: true,
        showScale: true,
        setting: {},
        markers: [],
        onMarkerClick: this.onClickMarker
      },
      markersData: [],
      mapContext: null,
      currentMarker: null,
      init: false, // 是否地图完全加载完成
      initMarker: false
    }
    this.initMap()
  }
  // 获取当前更改的地图配置项
  getMapConfig = (params: Partial<MapProps>): MapProps => {
    return Object.assign({}, this.state.mapConfig, params)
  }
  componentDidMount() {
    const mapContext: WechatMiniprogram.MapContext = createMapContext(this.state.mapConfig.id as string)
    this.setState({
      mapContext: mapContext
    })
    this.getMarker()
  }
  // 点击marker
  onClickMarker = (e: any) => {
    const markers = (this.state.mapConfig.markers || []).concat()
    let currentMarker: MarkerData | null = null
    // 修改 大小
    markers.forEach((marker, index) => {
      // 选中
      if (e.markerId == index) {
        marker.width = '30px'
        marker.height = '30px'
        currentMarker = marker
      } else {
        marker.width = '20px'
        marker.height = '20px'
      }
    })
    // 设置进入 state
    const config = this.getMapConfig({ markers: markers })
    this.setState({
      mapConfig: config
    })
    if (currentMarker) {
      this.props.setCurrentMarker(currentMarker)
    }
  }
  // 初始化地图完成
  initMapComplate = (lng?: number, lat?: number) => {
    if (!this.state.init && this.state.mapContext && lng && lat) {
      this.state.mapContext.moveToLocation({ longitude: lng, latitude: lat })
      this.setState({
        init: true
      })
    }
  }
  // 初始化  地图位置
  initMap = () => {
    getLocation({ type: 'gcj02' }).then((res) => {
      const _config: MapProps = this.getMapConfig({ latitude: res.latitude, longitude: res.longitude })
      this.setState({
        mapConfig: _config,
        currentCenter: {
          lng: res.longitude,
          lat: res.latitude
        }
      })
    })
  }
  getMarker = () => {
    MainApi.getMarkers()
      .then((res) => {
        const markers = res.map((_marker, _index) => {
          return this.createMarker(_marker, _index)
        })
        const _config: MapProps = Object.assign({}, this.state.mapConfig, { markers })
        this.setState({
          mapConfig: _config,
          markersData: res
        })
      })
      .catch((err) => {
        const res = [
          { type: 'officeHouses', point: '113.943452,22.774649' },
          { type: 'livingHouses', point: '113.941735,22.770613' },
          { type: 'livingHouses', point: '113.941735,22.765389' },
          { type: 'livingHouses', point: '113.948602,22.764202' },
          { type: 'livingHouses', point: '113.944654,22.76903' },
          { type: 'officeHouses', point: '113.950061,22.769979' },
          { type: 'rentHouses', point: '113.954009,22.765389' },
          { type: 'officeHouses', point: '113.949289,22.761115' },
          { type: 'livingHouses', point: '113.948945,22.756841' },
          { type: 'rentHouses', point: '113.943624,22.754942' },
          { type: 'livingHouses', point: '113.944139,22.751855' },
          { type: 'officeHouses', point: '113.949632,22.750509' },
          { type: 'livingHouses', point: '113.956327,22.752488' },
          { type: 'rentHouses', point: '113.964223,22.754942' },
          { type: 'rentHouses', point: '113.96388,22.762777' },
          { type: 'officeHouses', point: '113.958902,22.772591' },
          { type: 'rentHouses', point: '113.955211,22.774807' },
          { type: 'livingHouses', point: '113.958472,22.763648' },
          { type: 'officeHouses', point: '113.960618,22.759453' },
          { type: 'rentHouses', point: '113.93444,22.774174' },
          { type: 'officeHouses', point: '113.927316,22.780188' },
          { type: 'livingHouses', point: '113.926028,22.777181' },
          { type: 'livingHouses', point: '113.92517,22.766418' },
          { type: 'livingHouses', point: '113.918218,22.759453' },
          { type: 'rentHouses', point: '113.912381,22.766497' },
          { type: 'livingHouses', point: '113.917875,22.771325' },
          { type: 'livingHouses', point: '113.912811,22.775598' },
          { type: 'officeHouses', point: '113.92414,22.778526' },
          { type: 'livingHouses', point: '113.922252,22.772037' }
        ]
        const markers = res.map((_marker, _index) => {
          return this.createMarker(_marker, _index)
        })
        const _config: MapProps = Object.assign({}, this.state.mapConfig, { markers })
        this.setState({
          mapConfig: _config,
          markersData: markers
        })
      })
  }
  // 创建 marker
  createMarker = (markerData: any, index: number): MarkerData => {
    const [longitude, latitude] = markerData.point.split(',')
    return {
      id: index + '',
      iconPath: '/assets/img/site.png',
      width: '20px',
      height: '20px',
      latitude: +latitude,
      longitude: +longitude
    }
  }
  // 计算两点之间的距离 ，返回单位： 米
  distance = (la1: number, lo1: number, la2: number, lo2: number) => {
    var La1 = (la1 * Math.PI) / 180.0
    var La2 = (la2 * Math.PI) / 180.0
    var La3 = La1 - La2
    var Lb3 = (lo1 * Math.PI) / 180.0 - (lo2 * Math.PI) / 180.0
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)))
    s = s * 6378.137
    s = Math.round(s * 10000) / 10
    const offset = s.toFixed(2)
    return offset
  }
  // 详细信息
  details = () => {
    if (this.props.marker && this.state.currentCenter) {
      const offset = this.distance(this.state.currentCenter.lng, this.state.currentCenter.lat, this.props.marker.longitude, this.props.marker.latitude)
      return (
        <CoverView className='marker-details'>
          <View>距离{offset + 'm'}</View>
        </CoverView>
      )
    }
    return ''
  }

  render() {
    return (
      <View className='index-content' style={{ paddingTop: this.props.pdTop }}>
        <Map className='index-map' {...this.state.mapConfig}></Map>
        {this.details()}
      </View>
    )
  }
}
interface IndexProps {
  title: string
  pdTop: string
  currentMarker: MarkerData | null
}
export default () => {
  const [{ title, pdTop, currentMarker }, setState] = useState<IndexProps>({ title: '充电桩', pdTop: getPaddingTop(), currentMarker: null })

  const setCurrentMarker = (marker: MarkerData) => {
    setState(Object.assign({}, { title, pdTop, currentMarker }, { currentMarker: marker }))
  }
  return (
    <View className='container-box'>
      <Header title={title} />
      <MapContent pdTop={pdTop} setCurrentMarker={setCurrentMarker} marker={currentMarker}></MapContent>
    </View>
  )
}
