<script setup lang="ts">
import type { Viewer } from 'cesium'
import { useGLTF } from '#imports'
import { Cartesian3, Color, HeightReference, Math, PolygonHierarchy } from 'cesium'

const cesiumContainerRef = useTemplateRef('cesiumContainer')

let viewer: Viewer

onMounted(() => {
  if (!cesiumContainerRef.value)
    return

  viewer = useViewer(cesiumContainerRef.value)

  // 加载泰山区宿舍的GeoJSON数据
  const data = loadGeoJson('/data/泰山区宿舍.geojson', {
    stroke: Color.fromCssColorString('#aaaa9d'),
    fill: Color.fromCssColorString('#aaaa9d').withAlpha(0.5),
    strokeWidth: 3,
    clampToGround: true,
  })
  viewer.dataSources.add(data)

  geoJsonToBuildingModel('/data/泰山区宿舍1-4.geojson').then((positions) => {
    positions.forEach((position) => {
      viewer.entities.add({
        polygon: {
          hierarchy: new PolygonHierarchy(position), // 底面形状
          height: 0, // 底部高度（从地面0开始）
          heightReference: HeightReference.CLAMP_TO_TERRAIN,
          extrudedHeight: 30, // 顶部高度（总高度100米，可调整）
          material: Color.WHITE, // 填充材质（半透明红色）
          outline: true, // 显示轮廓
          outlineColor: Color.BLACK, // 轮廓颜色
          outlineWidth: 2, // 轮廓宽度
        },
      })
    })
  })

  useGLTF('/data/Air.glb', { position: Cartesian3.fromDegrees(113.36629986763, 23.15732289356693, 3) })

  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(113.36629986763, 23.15732289356693, 70),
    orientation: {
      heading: Math.toRadians(-90),
      pitch: 0,
    },
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
