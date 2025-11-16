import { ImageryLayer, OpenStreetMapImageryProvider, Viewer } from 'cesium'

// eslint-disable-next-line import/no-mutable-exports
export let viewer: Viewer

export function useViewer(container?: HTMLDivElement) {
  if (viewer) {
    return viewer
  }
  viewer = new Viewer(container!, {
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,

    animation: false,
    timeline: false,
    creditContainer: document.createElement('div'),
    fullscreenButton: false,

    infoBox: false,

    baseLayer: new ImageryLayer(new OpenStreetMapImageryProvider({
      url: 'https://tile.openstreetmap.org/',
    })),
    // terrain: Terrain.fromWorldTerrain(),
  })

  const cameraController = viewer.scene.screenSpaceCameraController
  cameraController.minimumZoomDistance = 3
  cameraController.maximumZoomDistance = 600

  // 摄像机不能进入地下
  viewer.scene.globe.depthTestAgainstTerrain = true

  return viewer
}
