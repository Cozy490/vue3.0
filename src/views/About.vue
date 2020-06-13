<template>
  <div class="about">
    <h1>This is an about page</h1>
    <van-button type="info">信息按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show"   closeable position="bottom" :style="{ height: '70%' }">
      <div style="height: 200px;overflow: scroll;margin-top: 40px;border:1px solid #eee;">
         <div style="height: 40px;">1</div>
         <div style="height: 40px;">2</div>
         <div style="height: 40px;">3</div>
         <div style="height: 40px;">4</div>
         <div style="height: 40px;">5</div>
         <div style="height: 40px;">6</div>
         <div style="height: 40px;">7</div>
         <div style="height: 40px;">8</div>
         <div style="height: 40px;">9</div>
         <div style="height: 40px;">10</div><div style="height: 40px;">11</div>
         <div style="height: 40px;">12</div><div style="height: 40px;">13</div>
         <div style="height: 40px;">14</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import {
  Button,
  Cell,
  Popup
} from 'vant'
export default {
  name: 'About',
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Popup.name]: Popup
  },
  data () {
    return {
      show: false
    }
  },
  created () {
    console.log(process.env.NODE_ENV)
  },
  methods: {
    showPopup () {
      this.show = true
    }
  }
}
</script>
