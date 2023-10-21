<script setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article.js'
const isShow = ref(false)
const formRef = ref(null)
const formData = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    {
      required: true,
      message: '请输入分类名称',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9\u4E00-\u9FA5\uf900-\ufa2d·s]{2,16}$/,
      message: '请输入2-16位的名称'
    }
  ],
  cate_alias: {
    required: true,
    message: '请输入分类别名',
    trigger: 'blur'
  }
}

const open = (row) => {
  formData.value = { ...row }
  console.log(formData.value)
  isShow.value = true
}
const emit = defineEmits(['onSuccess'])
const handleEdit = async () => {
  await formRef.value.validate()
  const isEdit = formData.value.id

  if (isEdit) {
    await artEditChannelService(formData.value)
    ElMessage.success('编辑分类成功')
  } else {
    await artAddChannelService(formData.value)
    ElMessage.success('添加分类成功')
  }
  isShow.value = false
  emit('onSuccess')
}
// watch(isShow, () => {
//   formData.value.cate_name = ''
//   formData.value.cate_alias = ''
// })
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="isShow"
    :title="formData.id ? '编辑分类' : '添加分类'"
    width="576"
  >
    <el-form
      class="center"
      ref="formRef"
      :model="formData"
      :rules="rules"
      width="'530px'"
      ><el-form-item prop="cate_name" label="分类名称">
        <el-input v-model="formData.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <el-form-item prop="cate_alias" label="分类别名">
        <el-input v-model="formData.cate_alias" placeholder="请输入分类别名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <!-- <span class="dialog-footer"> -->
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="handleEdit"> 确认</el-button>
      <!-- </span> -->
    </template>
  </el-dialog>
</template>
