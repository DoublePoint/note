<!-- 菜单项组件 RightMenuItemComponet.vue -->

<template>
  <div class="flex right-menu-item align-item-center pointer" @click.stop="handleClick">
    <i :class="icon"></i>
    <span class="text-overflow-hidden margin-left-small"> {{ name }}</span>
  </div>
</template>

<script>
import variables from '@/assets/styles/variables.scss'
export default {
  name: 'RightMenuItemComponent',
  data() {
    return {
      bdColor: 'white',
      colorStr: 'var(--color-main-font)',
    }
  },
  props: ['icon', 'name', 'meta'],

  computed: {
    variables() {
      return variables
    },
  },
  methods: {
    handleClick() {
      this.$emit('selected')
      //隐藏弹窗
      this.$store.commit('changeShowRightMenu', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.right-menu-item {
  padding: 3px;
  width: calc(100%-17);
  height: 30px;
  text-align: start;
  // background-color: white;
  // border: 1px solid black;
  // margin: 3px 10px;
  line-height: 24px;
  box-sizing: border-box;
  &:hover {
    background-color: rgb(70, 80, 100);
  }
}

i {
  font-size: 16px;
  margin-left: 10px;
  margin-right: 4px;
}
.text-overflow-hidden {
  flex: 1 1 auto;
  width: calc(100%-40);
  height: 30px;
  display: inline-block;
  box-sizing: border-box;
  color: white;
  margin-left: 10px;
  font-size: 14px;
}
</style>
