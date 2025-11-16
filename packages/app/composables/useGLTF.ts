import type { Cartesian3 } from 'cesium'
import { useViewer } from '~/composables/useViewer'

export function useGLTF(uri: string, options: { position: Cartesian3 }) {
  const { position } = options
  const viewer = useViewer()

  viewer.entities.add({
    position,
    model: {
      uri,

      // minimumPixelSize: 64,
      // maximumScale: 10,
      // scale: 1.0,
    },
  })
}
