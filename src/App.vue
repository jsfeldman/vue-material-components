<template>
  <div id="app">
    <!--
    <mcv-toolbar
      :flexible-extend-ratio="3"
      waterfall
      flexible >
      <mcv-toolbar-row>
        <mcv-icon
          slot="start-icon"
          tag="a" >menu</mcv-icon>
        <mcv-toolbar-title slot="start">Title</mcv-toolbar-title>
        <mcv-icon
          slot="end-icon"
          tag="a" >file_download</mcv-icon>
        <mcv-icon
          slot="end-icon"
          tag="a"
          aria-label="Print this page"
          href="#"
          alt="Print this page">print</mcv-icon>
        <mcv-icon
          slot="end-icon"
          tag="a"
          href="#"
          aria-label="Bookmark this page"
          alt="Bookmark this page">bookmark</mcv-icon>
      </mcv-toolbar-row>
    </mcv-toolbar>
    -->
    <mcv-top-app-bar />
    <router-view/>
  </div>
</template>

<script>
import McvToolbar from './components/Toolbar/McvToolbar'
import McvToolbarRow from './components/Toolbar/McvToolbarRow'
import McvToolbarTitle from './components/Toolbar/McvToolbarTitle'
import McvTopAppBar from './components/TopAppBar/McvTopAppBar'

import McvIcon from './components/Icon/McvIcon'

export default {
  components: {
    McvToolbar,
    McvToolbarRow,
    McvToolbarTitle,
    McvIcon,
    McvTopAppBar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
