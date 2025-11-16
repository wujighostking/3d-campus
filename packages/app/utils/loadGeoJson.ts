import { Cartesian3, GeoJsonDataSource } from 'cesium'
import { EMPTY_OBJ, isFunction } from '~~/packages/shared/utils'

interface Options extends GeoJsonDataSource.LoadOptions {
  beforeLoad?: () => void
  afterLoaded?: (data: any) => void
}

export function loadGeoJson(url: string, options?: Options) {
  const { beforeLoad, afterLoaded } = options ?? EMPTY_OBJ

  if (isFunction(beforeLoad)) {
    beforeLoad()
  }

  const geoJsonPending = GeoJsonDataSource.load(url, options)

  return geoJsonPending.then((data) => {
    if (isFunction(afterLoaded)) {
      afterLoaded(data)
    }

    return data
  })
}

export async function geoJsonToBuildingModel(url: string) {
  const geojsonData = await (await fetch(url)).json()

  let positions: Cartesian3[][] = []

  // 解析GeoJSON并生成多面体（棱柱）
  geojsonData?.features?.forEach?.((feature: any) => {
    const geometry = feature.geometry
    if (geometry.type === 'Polygon') {
      positions = geometry.coordinates.map((coordinates: [number, number][]) => {
        return coordinates.map((coord: [number, number]) => {
          const longitude = coord[0] // 经度
          const latitude = coord[1] // 纬度
          return Cartesian3.fromDegrees(longitude, latitude)
        })
      })
    }
  })

  return positions
}
