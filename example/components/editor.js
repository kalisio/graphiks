import { graphiks } from '../../src/graphiks.js'
import ShapeRenderer from './shape-renderer.js'
import ColorPicker from './color-picker.js'

export default {
  template: `
    <div class="column full-width">
      <div class="row justify-between items-center">
        <div class="q-pa-md relative-position col-7">
          <ShapeRenderer class="text-center" :shape="shape"></ShapeRenderer>
          <q-btn
            flat
            dense
            rounded
            icon="image"
            color="primary"
            class="absolute-top-right"
            @click="downloadAsPNG"
          >
        </div>
        <div class="q-pa-sm col-4">
          <q-select class="q-pa-sm" v-model="shape.shape" :options="types" label="Type" />
          <ColorPicker v-model="shape.color" label="Color" />
        </div>
      </div>
      <div class="q-pa-md relative-position bg-amber-2 text-subtitle2" style="white-space: pre-wrap;">
        {{ code }}
        <q-btn
          flat
          dense
          icon="content_copy"
          color="primary"
          class="absolute-top-right q-ma-sm"
          @click="copyToClipboard"
        >
      </div>
    </div>
  `,

  components: {
    ShapeRenderer,
    ColorPicker
  },

  setup () {
    const { ref, computed, watch } = Vue
    const { useQuasar, copyToClipboard: qCopyToClipboard, exportFile } = Quasar
    const $q = useQuasar()
    const Graphiks = graphiks({ loglevel: 'debug' })

    const shape = ref({
      shape: 'circle',
      size: [150, 150],
      color: 'red',
      stroke: { color: 'black', width: 2 }
    })
    const types = Graphiks.listShapeTypes()

    const type = computed(() => {
      return shape.value?.shape
    })
    const code = computed(() => {
      return JSON.stringify(shape.value, null, 2)
    })

    watch(type, (value) => {
      if (value === 'pie' || value === 'donut') {
        shape.value.slices = [
          { value: 25, label: 'slice A', color: 'red' },
          { value: 25, label: 'slice B', color: 'orange' },
          { value: 25, label: 'slice C', color: 'lime' },
          { value: 25, label: 'slice D', color: 'green' }
        ]
      } else delete shape.value.slices
    })

    function copyToClipboard () {
      qCopyToClipboard(code.value)
        .then(() => {
          $q.notify({
            message: 'Code copied',
            color: 'positive',
            icon: 'check',
            position: 'bottom',
            timeout: 1000
          })
        })
        .catch(() => {
          $q.notify({
            message: 'Error while copying code',
            color: 'negative',
            icon: 'error',
            position: 'bottom'
          })
        })
    }

    async function downloadAsPNG () {
      const graphic = Graphiks.renderShape(shape.value)
      const pngDataUrl = await graphic.toPNG()
      const response = await fetch(pngDataUrl)
      const blob = await response.blob()
      const status = exportFile('shape.png', blob, 'image/png')
      if (!status) {
        $q.notify({
          message: 'Error while exporting image',
          color: 'negative',
          icon: 'error',
          position: 'bottom'
        })
      }
    }

    return {
      shape,
      types,
      code,
      downloadAsPNG,
      copyToClipboard
    }
  }
}
