<script setup>
import { ref } from 'vue'
import PageContainer from '../../components/PageContainer.vue'
import { updatePasswordService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
const rules = ref({
  old_pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[\S\w]{6,15}$/,
      message: '请输入6-15位非空非数字或字母',
      trigger: 'blur'
    }
  ],
  new_pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[\S\w]{6,15}$/,
      message: '请输入6-15位非空非数字或字母',
      trigger: 'blur'
    }
  ],
  re_pwd: [
    {
      required: true,
      message: '请输入密码1',
      trigger: 'blur'
    },
    {
      validator: (rules, value, callback) => {
        if (value === form.value.new_pwd) {
          callback()
        } else {
          callback(new Error('两次密码输入不一致'))
        }
      },
      trigger: 'blur'
    }
  ]
})
const form = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const updateInfo = async () => {
  const res = await updatePasswordService(form.value)
  form.value = {
    old_pwd: '',
    new_pwd: '',
    re_pwd: ''
  }
  ElMessage.success(res.data.message)
}
</script>

<template>
  <PageContainer :title="'重置密码'">
    <template #default>
      <el-row>
        <el-col :span="12">
          <el-form
            :model="form"
            label-width="100px"
            size="large"
            :rules="rules"
            autocomplete="off"
          >
            <el-form-item prop="old_pwd" label="原密码">
              <el-input v-model="form.old_pwd" placeholder="请输入原密码" />
            </el-form-item>
            <el-form-item prop="new_pwd" label="新密码">
              <el-input v-model="form.new_pwd" placeholder="请输入新密码" />
            </el-form-item>
            <el-form-item prop="re_pwd" label="确认密码">
              <el-input v-model="form.re_pwd" placeholder="请再次输入新密码" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateInfo">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row></template
    ></PageContainer
  >
</template>
