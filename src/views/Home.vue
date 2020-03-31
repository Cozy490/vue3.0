<template>
  <div class="home">
    <van-button type="info" @touchstart.stop="show = true">信息按钮</van-button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <van-number-keyboard
      :show="show"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Button, NumberKeyboard } from 'vant'
export default {
  name: 'Home',
  data () {
    return {
      show: true
    }
  },
  components: {
    HelloWorld,
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard
  },
  created () {
    console.log(process.env.NODE_ENV)
  },
  methods: {
    onInput (value) {
      this.$toast(value)
    },
    onDelete () {
      this.$toast('删除')
    }
  }
}
</script>
