<script>
export default {
  name: 'McvToolbarRow',
  props: {
    long: {
      type: String,
      default: '',
      validator: function (value) {
        return value === '' ? true : value.match(/^(start|center|end)$/)
      }
    }
  },
  render (h) {
    if (this.$slots['start-icon']) {
      this.$slots['start-icon'].forEach(node => {
        if (!node.data.staticClass) {
          node.data.staticClass = 'mdc-toolbar__menu-icon'
        } else if (!node.data.staticClass.includes('mdc-toolbar__menu-icon')) {
          node.data.staticClass += ' mdc-toolbar__menu-icon'
        }
      })
    }
    if (this.$slots['end-icon']) {
      this.$slots['end-icon'].forEach(node => {
        if (!node.data.staticClass) {
          node.data.staticClass = 'mdc-toolbar__menu-icon'
        } else if (!node.data.staticClass.includes('mdc-toolbar__menu-icon')) {
          node.data.staticClass += ' mdc-toolbar__menu-icon'
        }
      })
    }
    const startSlots = [...(this.$slots['start-icon'] ? this.$slots['start-icon'] : []), ...(this.$slots['start'] ? this.$slots['start'] : [])]
    const endSlots = [...(this.$slots['end-icon'] ? this.$slots['end-icon'] : []), ...(this.$slots['end'] ? this.$slots['end'] : [])]
    return h(
      'div', {
        class: ['mdc-toolbar__row']
      },
      [
        h(
          'section', {
            class: ['mdc-toolbar__section', 'mdc-toolbar__section--align-start',
              {'mdc-toolbar__section--shrink-to-fit': (this.long !== '' && this.long !== 'start')}
            ]
          }, startSlots
        ),
        h(
          'section', {
            class: ['mdc-toolbar__section',
              {'mdc-toolbar__section--shrink-to-fit': (this.long !== '' && this.long !== 'center')}
            ]
          }, this.$slots.default
        ),
        h(
          'section', {
            class: ['mdc-toolbar__section', 'mdc-toolbar__section--align-end',
              {'mdc-toolbar__section--shrink-to-fit': (this.long !== '' && this.long !== 'end')}
            ]
          }, endSlots
        )
      ]
    )
  }
}
</script>
