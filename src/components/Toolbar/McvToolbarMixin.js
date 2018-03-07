export default {
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
    containerElemId: {
      type: String,
      default: ''
    }
  }
}
