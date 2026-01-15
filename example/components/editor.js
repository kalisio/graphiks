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
            @click="download"
          >
        </div>
        <div class="q-pa-sm col-4">
          <q-select class="q-pa-sm" v-model="type" :options="types" label="Type" />
          <ColorPicker v-model="color" label="Color" />
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
          @click="copy"
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
    const { useQuasar, copyToClipboard, exportFile } = Quasar
    const $q = useQuasar()
    const Graphiks = graphiks()

    const shape = ref({ shape: 'circle', color: 'red', stroke: { color: 'black', width: '2' } })
    const type = ref('circle')
    const color = ref('color')
    const types = Graphiks.listShapeTypes()

    const code = computed(() => {
      return JSON.stringify(shape.value, null, 2)
    })

    watch(type, (value) => {
      shape.value.shape = value
    })
    watch(color, (value) => {
      shape.value.color = value
    })

    function copy () {
      copyToClipboard(code.value)
        .then(() => {
          $q.notify({
            message: 'Code copied',
            color: 'positive',
            icon: 'check',
            position: 'top',
            timeout: 1000
          })
        })
        .catch(() => {
          $q.notify({
            message: 'Error while copying code',
            color: 'negative',
            icon: 'error',
            position: 'top'
          })
        })
    }

    async function download () {
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
          position: 'top'
        })
      }
    }

    return {
      shape,
      type,
      types,
      color,
      code,
      download,
      copy
    }
  }
}
