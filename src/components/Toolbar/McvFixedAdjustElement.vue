<template>
  <div
    :style="styleObj"
    class="mdc-toolbar-fixed-adjust" />
</template>

<script>
export default {
  name: 'McvFixedAdjustElement',
  data () {
    return {
      styleObj: {}
    }
  },
  created () {
    this.$root.$on('MDCToolbar:FixedAdjustElementStyleChange', ({property, value}) => {
      this.$set(this.styleObj, property, value)
    })
  }
}
</script>
