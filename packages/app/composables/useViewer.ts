import { ImageryLayer, OpenStreetMapImageryProvider, Viewer } from 'cesium'

export function useViewer(container: HTMLDivElement) {
  return new Viewer(container, {
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
}
