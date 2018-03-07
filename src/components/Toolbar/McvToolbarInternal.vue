<template>
  <header
    :style="[cssVariables, foundationStyles]"
    :class="toolbarClasses"
    class="mdc-toolbar" >
    <slot />
  </header>
</template>

<script>
import {MDCToolbarFoundation} from '@material/toolbar'
import * as util from '@material/toolbar/util'

import McvToolbarMixin from './McvToolbarMixin'

export default {
  name: 'McvToolbarInternal',
  mixins: [McvToolbarMixin],
  data () {
    const toolbarClasses = Object.entries({
      'mdc-toolbar--fixed': this.fixed || this.fixedLastRow || this.waterfall,
      'mdc-toolbar--fixed-lastrow-only': this.fixedLastRowOnly,
      'mdc-toolbar--waterfall': this.waterfall,
      'mdc-toolbar--flexible': this.flexible,
      'mdc-toolbar--flexible-default-behavior': this.flexibleBehavior === 'default'
    }).filter(([key, value]) => value).map(([key, value]) => key)
    return {
      toolbarClasses,
      foundationStyles: {},
      scrollMap: new Map(),
      resizeMap: new Map()
    }
  },
  computed: {
    // based on this discussion: https://github.com/vuejs/vue/issues/7346
    cssVariables () {
      return {
        '--mdc-toolbar-ratio-to-extend-flexible': this.flexibleExtendRatio
      }
    },
    isFixed () {
      return this.toolbarClasses.includes(MDCToolbarFoundation.cssClasses.FIXED)
    },
    containerElem () {
      if (this.containerElemId === '') {
        return window
      } else {
        return document.getElementById(this.containerElemId)
      }
    }
  },
  watch: {
    flexibleBehavior: {
      handler: function (newHandler, oldHandler) {
        // May replace with this.$on once I determine if it's reactive
        // Might not work without it
        // this.$el.addEventListener(MDCToolbarFoundation.strings.CHANGE_EVENT, newHandler)
        // this.$el.removeEventListener(MDCToolbarFoundation.strings.CHANGE_EVENT, oldHandler)
      },
      immediate: true
    }
  },
  mounted () {
    this.foundation_ = new MDCToolbarFoundation({
      hasClass: className => this.toolbarClasses.includes(className),
      addClass: className => this.toolbarClasses.push(className),
      removeClass: className => {
        const index = this.toolbarClasses.indexOf(className)
        if (index !== -1) {
          this.toolbarClasses.splice(index, 1)
        }
      },
      registerScrollHandler: (handler) => {
        this.containerElem.addEventListener('scroll', handler, util.applyPassive())
        this.scrollMap.set(handler, this.containerElem)
      },
      deregisterScrollHandler: (handler) => {
        const elem = this.scrollMap.get(handler)
        if (elem !== undefined) {
          elem.removeEventListener('scroll', handler, util.applyPassive())
          this.scrollMap.delete('handler')
        }
      },
      registerResizeHandler: (handler) => {
        this.containerElem.addEventListener('resize', handler)
        this.resizeMap.set(handler, this.containerElem)
      },
      deregisterResizeHandler: (handler) => (handler) => {
        const elem = this.resizeMap.get(handler)
        if (elem !== undefined) {
          elem.removeEventListener('resize', handler)
          this.resizeMap.delete('handler')
        }
      },
      getViewportWidth: () => (window.innerWidth),
      getViewportScrollY: () => (this.containerElem.scrollY),
      getOffsetHeight: () => (this.$el.offsetHeight),
      getFirstRowElementOffsetHeight: () => (this.getFirstRowElement().offsetHeight),
      notifyChange: (evtData) => (this.$emit(MDCToolbarFoundation.strings.CHANGE_EVENT, evtData)),
      setStyle: (property, value) => (this.$set(this.foundationStyles, property, value)),
      setStyleForTitleElement: (property, value) => {
        this.getTitleElement().style.setProperty(property, value)
      },
      setStyleForFlexibleRowElement: (property, value) => {
        this.getFirstRowElement().style.setProperty(property, value)
      },
      setStyleForFixedAdjustElement: (property, value) => {
        this.$root.$emit('MDCToolbar:FixedAdjustElementStyleChange', {property, value})
      }
    })
    this.foundation_.init()
  },
  beforeDestroy () {
    this.foundation_.destroy()
  },
  methods: {
    getFirstRowElement () {
      return this.$el.querySelector(MDCToolbarFoundation.strings.FIRST_ROW_SELECTOR)
    },
    getTitleElement () {
      return this.$el.querySelector(MDCToolbarFoundation.strings.TITLE_SELECTOR)
    }
  }
}
</script>
