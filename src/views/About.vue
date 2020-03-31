<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="info">信息按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="info">信息按钮</van-button>
  </div>
</template>
<script>
import { Button } from 'vant'
export default {
  name: 'About',
  components: {
    [Button.name]: Button
  },
  created () {
    console.log(process.env.NODE_ENV)
  }
}
</script>
