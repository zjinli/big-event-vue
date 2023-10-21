<script setup>
import { ref } from 'vue'
import PageContainer from '../../components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { updateUserInfoService } from '@/api/user.js'

const rules = ref({
  nickname: [
    {
      required: true,
      message: '请输入用户昵称',
      trigger: 'blur'
    },
    {
      min: 2,
      max: 10,
      message: '请输入2-10位的用户名',
      trigger: 'blur'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '请输入正确的邮箱',
      trigger: ['blur', 'change']
    }
  ]
})
const formRef = ref(null)
const userStore = useUserStore()
const form = ref({
  id: userStore.userInfo.id,
  username: userStore.userInfo.username,
  nickname: userStore.userInfo.nickname,
  email: userStore.userInfo.email
})

const onSubmit = async () => {
  // console.log(form.value)
  const res = await updateUserInfoService(form.value)
  await userStore.getUserInfo()
  // form.value = userStore.userInfo
  ElMessage.success(res.data.message)
  // console.log(res.data)
}
</script>

<template>
  <page-container :title="'基本资料'">
    <template #default>
      <el-row>
        <el-col :span="12">
          <el-form
            ref="formRef"
            :rules="rules"
            :model="form"
            label-width="100px"
            size="large"
          >
            <el-form-item label="登录名称">
              <el-input disabled v-model="form.username" />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname"
              ><el-input v-model="form.nickname"
            /></el-form-item>
            <el-form-item label="用户邮箱" prop="email"
              ><el-input v-model="form.email"
            /></el-form-item>
            <el-form-item class="button">
              <el-button type="primary" @click="onSubmit">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </template></page-container
  >
</template>
<style scoped></style>
