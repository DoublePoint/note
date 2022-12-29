<template>
  <div style="position: inherit">
    <svg-icon v-if="icon" :icon-class="icon" />
    <span v-if="title && title.length > 5" slot="title" :title="title"> {{ title }} </span>
    <span v-else slot="title">{{ title }}</span>
    <i
      class="el-icon-plus menu-setting menu-setting-active"
      @click.stop="showCreateDir"
      style="width: 22px; margin-top: 16px; height: 22px; float: right; position: relative; right: 10px; padding: 2px"
    ></i>
    <i
      class="el-icon-more menu-setting menu-setting-active"
      @click.stop="showContextMenu"
      style="width: 22px; margin-top: 16px; height: 22px; float: right; position: relative; right: 10px; padding: 2px"
    ></i>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  // functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    menuMeta: {
      type: Object,
    },
  },
  methods: {
    showContextMenu(e) {
      this.$store.commit('changeShowRightMenu', true)
      this.$store.commit('changeMouseTopNumber', e.pageY + 12)
      this.$store.commit('changeMouseLeftNumber', e.pageX + 12)
      this.$store.commit('changeMenuMeta', this.menuMeta)
    },
    showCreateDir(e) {
      this.$store.commit('changeShowCreateDirDialog', true)
    },
  },
  rrender(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />)
    }
    if (title) {
      if (title.length > 5) {
        vnodes.push(
          <span slot="title" title={title}>
            {title}
          </span>
        )
      } else {
        vnodes.push(<span slot="title">{title}</span>)
      }
      vnodes.push(<svg-icon icon-class={icon} style="float:right;position:relative;top:50%;margin-top:-7px;right:-20px;" />)
      vnodes.push(
        <i
          class="el-icon-more menu-setting menu-setting-active"
          onClick={(event) => {
            console.log(event, that)
          }}
          style="width:22px;height:22px;float:right;position:relative;top:50%;margin-top:-11px;right:-20px;padding:2px;"
        ></i>
      )

      // vnodes.push(<svg-icon icon-class="setting" style="float:right;position:relative;top:50%;margin-top:-7px;right:-20px;padding:2px;border-radius:2px;background-color:white;" />)
    }

    return vnodes
  },
}
</script>

<style lang="scss" scoped>
.el-submenu__title:hover .menu-setting-active,
.el-menu-item:hover .menu-setting-active {
  display: block;
}
.menu-setting {
  display: none;
  &:hover {
    border-radius: 2px;
    background-color: white;
  }
}
.el-submenu .el-menu-item {
  padding-right: 20px;
}
</style>
