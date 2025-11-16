<script setup lang="ts">
import { Cartesian3, Color, Viewer } from 'cesium'

const cesiumContainerRef = useTemplateRef('cesiumContainer')

let viewer: Viewer

onMounted(() => {
  if (!cesiumContainerRef.value)
    return

  viewer = new Viewer(cesiumContainerRef.value, {
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    navigationHelpButton: false,

    animation: false,
    timeline: false,
    creditContainer: document.createElement('div'),
    fullscreenButton: false,
  })

  // 加载泰山区宿舍的GeoJSON数据
  const data = loadGeoJson('/data/泰山区宿舍.geojson', {
    stroke: Color.fromCssColorString('#aaaa9d'),
    fill: Color.fromCssColorString('#aaaa9d').withAlpha(0.5),
    strokeWidth: 3,
    markerSymbol: '?',
  })
  viewer.dataSources.add(data)
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(113.36629986763, 23.15732289356693, 400),
  })
})

onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
  }
})
</script>

<template>
  <div>
    <div ref="cesiumContainer" style="width: 100%;height: 100vh;" />
  </div>
</template>

<style scoped>

</style>
