<script>
import McvToolbarInternal from './McvToolbarInternal'
import McvFixedAdjustElement from './McvFixedAdjustElement'

import McvToolbarMixin from './McvToolbarMixin'

export default {
  name: 'McvToolbar',
  // McvToolbar has a wrapper functional component to get around restrictions
  // of rendering two root element (toolbar and fixed adjustable element)
  functional: true,
  mixins: [McvToolbarMixin],
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    fixedLastRowOnly: {
      type: Boolean,
      default: false
    },
    waterfall: {
      type: Boolean,
      default: false
    },
    flexible: {
      type: Boolean,
      default: false
    },
    flexibleExtendRatio: {
      type: Number,
      default: 4
    },
    flexibleBehavior: {
      type: [String, Function],
      default: 'default',
      validator: function (value) {
        return typeof value === 'function' || value === 'default'
      }
    },
    ink: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    },
    fillAccessible: {
      type: String,
      default: ''
    },
    containerElemId: {
      type: String,
      default: ''
    }
  },
  render (h, context) {
    const props = context.props
    return [
      h(McvToolbarInternal,
        {
          props
        },
        context.children),
      ...(props.fixed || props.fixedLastRowOnly || props.waterfall ? [h(McvFixedAdjustElement)] : [])
    ]
  }
}
</script>

<style lang="scss">
// Need to fix this so that it can import variables since right now the padding is off because
// it doesn't have access to mdc-toolbar-element-section-padding
@import "@material/toolbar/mdc-toolbar.scss";
</style>
