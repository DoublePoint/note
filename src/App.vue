<template>
  <div id="app">
    <div @click="appMouseDown">
      <router-view />
      <theme-picker />
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'

export default {
  name: 'App',
  components: { ThemePicker },
  metaInfo() {
    return {
      title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
      titleTemplate: (title) => {
        return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
      },
    }
  },
  methods: {
    appMouseDown() {
      this.$store.commit('changeShowRightMenu', false)
      // this.$store.commit("changeShowRightMenu", false)
    },
  },
}
</script>
<style scoped>
#app .theme-picker {
  display: none;
}
</style>
