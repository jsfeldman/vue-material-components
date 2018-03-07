<template>
  <component
    :is="tag"
    class="material-icons" >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'McvIcon',
  props: {
    tag: {
      type: String,
      default: 'i',
      validator: function (value) {
        return value === '' ? true : value.match(/^(a|span|button)$/)
      }
    }
  }
}
</script>
