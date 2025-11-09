<script setup lang="ts">
import { Cartesian3, Viewer } from 'cesium'

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

  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(113.347037, 23.157565, 400),
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
