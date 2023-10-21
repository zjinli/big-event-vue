<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores'
// import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const isRegister = ref(true)
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
const form = ref()
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      min: 5,
      max: 10,
      message: '请输入5-10位字符',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[\S\w]{6,15}$/,
      message: '请输入6-15位非空非数字或字母',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      validator: (rules, value, callback) => {
        if (value === formModel.value.password) {
          callback()
        } else {
          callback(new Error('两次密码输入不一致'))
        }
      },
      trigger: 'blur'
    }
  ]
}
const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value = true
}
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  ElMessage.success('登录成功')
  userStore.setToken(res.data.token)
  console.log(res.data.token)

  router.push('/')
}
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="from">
      <el-form
        size="large"
        ref="form"
        :model="formModel"
        :rules="rules"
        v-if="isRegister"
        autocomplete="off"
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            v-model="formModel.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="button"
            auto-insert-space
            @click="login"
          >
            登录
          </el-button></el-form-item
        >
        <el-link
          type="info"
          :underline="false"
          auto-insert-space
          @click="isRegister = false"
          >注册 →
        </el-link>
      </el-form>
      <!-- 注册 -->
      <el-form
        size="large"
        class="form"
        v-else
        :model="formModel"
        :rules="rules"
        autocomplete="off"
        ref="form"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            v-model="formModel.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            show-password
            :prefix-icon="Lock"
            v-model="formModel.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            type="password"
            show-password
            :prefix-icon="Lock"
            v-model="formModel.repassword"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="button"
            auto-insert-space
            @click="register"
            >注册</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="isRegister = true">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .from {
    display: flex;
    // justify-content: center;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    user-select: none;
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .button {
      width: 100%;
    }
  }
}
</style>
