import 'cesium/Build/Cesium/Widgets/widgets.css'

export default defineNuxtPlugin({
  name: 'nuxt-plugin-cesium',
  enforce: 'pre',
  hooks: {
    'app:beforeMount': function () {
      ;(window as any).CESIUM_BASE_URL = '/cesium/'
    },

  },
  env: {
    // 如果不希望插件在渲染仅服务端或岛式组件时运行，将此值设置为 `false`
    islands: false,
  },
})
