<script>
export default {
  name: 'McvTopAppBar',
  props: {
    short: {
      type: Boolean,
      default: false
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'toolbar',
      validator: function (value) {
        return value.match(/^(toolbar|top-app-bar)$/)
      }
    }
  },
  render (h) {
    const short = this.short || this.collapsed
    if (this.$slots['nav'].length > 1) {
      console.warn('There should not be more than one icon in the start section of a Top App Bar')
    }
    this.$slots['nav'].forEach(node => {
      if (!node.data.staticClass) {
        node.data.staticClass = 'mdc-top-app-bar__navigation-icon'
      } else if (!node.data.staticClass.includes('mdc-top-app-bar__navigation-icon')) {
        node.data.staticClass += ' mdc-top-app-bar__navigation-icon'
      }
    })

    if (this.$slots['action'].length > 1 && short) {
      console.warn('There should not be more than one icon in the action section of a Top App Bar if it is set to short or collapsed')
    }
    this.$slots['action'].forEach(node => {
      if (!node.data.staticClass) {
        node.data.staticClass = 'mdc-top-app-bar__action-item'
      } else if (!node.data.staticClass.includes('mdc-top-app-bar__action-item')) {
        node.data.staticClass += ' mdc-top-app-bar__action-item'
      }
    })

    return h('header',
      {
        staticClass: 'mdc-top-app-bar',
        class: {
          'mdc-top-app-bar--short': short,
          'mdc-top-app-bar--short-collapsed': this.collapsed
        }
      },
      h('div',
        {
          staticClass: 'mdc-top-app-bar__row'
        },
        [
          h('section',
            {
              staticClass: 'mdc-top-app-bar__section mdc-top-app-bar__section--align-start'
            },
            [...(this.$slots['nav'] ? this.$slots['nav'] : []), h('span',
              {
                staticClass: 'mdc-top-app-bar__title'
              },
              this.$slots.default
            )]
          ),
          h('section',
            {
              staticClass: 'mdc-top-app-bar__section mdc-top-app-bar__section--align-end',
              role: this.role
            },
            this.$slots.action
          )
        ]
      )
    )
  }
}
</script>

<style lang="scss">
@import "@material/top-app-bar/mdc-top-app-bar.scss";
</style>
