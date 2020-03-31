<template>
  <div class="about">
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import { Form, Field, Button } from 'vant'
export default {
  name: 'About',
  components: {
    [Form.name]: Form,
    [Button.name]: Button,
    [Field.name]: Field
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    console.log(process.env.NODE_ENV)
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>
