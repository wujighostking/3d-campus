import { GeoJsonDataSource } from 'cesium'
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
