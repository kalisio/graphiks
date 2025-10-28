import { graphiks } from '../../src/graphiks.js'

export default {
  template: `
    <div v-html="svg"></div>
  `,

  props: {
    shape: {
      type: Object,
      required: true
    }
  },

  setup (props) {
    // Data
    const { computed } = Vue
    const Graphiks = graphiks()

    const svg = computed(() => {
      const graphics = Graphiks.renderShape(props.shape)
      if (!graphics) return ''
      return graphics.toSVG()
    })

    return {
      svg
    }
  }
}