<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ChannelSelect from './ChannelSelect.vue'
import { baseURL } from '@/utils/request.js'
import {
  artGetArticleService,
  artPublishArticleService,
  artUpdateArticleService
} from '@/api/article.js'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { ElMessage } from 'element-plus'
import axios from 'axios'
const visibeDrawer = ref(false)
const info = ref({})
const formRef = ref(null)
const formModel = ref({
  id: '',
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
})
// 将网络图片地址转换为File对象
async function imageUrlToFile(url, fileName) {
  try {
    // 第一步：使用axios获取网络图片数据
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    const imageData = response.data

    // 第二步：将图片数据转换为Blob对象
    const blob = new Blob([imageData], {
      type: response.headers['content-type']
    })

    // 第三步：创建一个新的File对象
    const file = new File([blob], fileName, { type: blob.type })

    return file
  } catch (error) {
    console.error('将图片转换为File对象时发生错误:', error)
    throw error
  }
}
const imageUrl = ref('')
const editRef = ref(null)
const open = async (row) => {
  visibeDrawer.value = true
  info.value = row
  if (row.id) {
    const res = await artGetArticleService(row.id)
    console.log(res.data.data)
    formModel.value = res.data.data
    imageUrl.value = baseURL + formModel.value.cover_img
    const file = await imageUrlToFile(imageUrl.value, formModel.value.cover_img)
    formModel.value.cover_img = file
  } else {
    console.log('回显' + row.id)
    formModel.value = {
      id: '',
      title: '',
      cate_id: '',
      cover_img: '',
      content: null,
      state: ''
    }
    imageUrl.value = ''
    editRef.value.setHTML('')
  }
}

const onSelectFile = (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
const emit = defineEmits('success')
const onPublish = async (state) => {
  formRef.value.validate()
  formModel.value.state = state
  const fd = new FormData()
  for (let key in formModel.value) {
    fd.append(key, formModel.value[key])
  }
  if (formModel.value.id) {
    await artUpdateArticleService(fd)
    ElMessage.success('修改成功')
  } else {
    await artPublishArticleService(fd)
    ElMessage.success('添加成功')
  }
  visibeDrawer.value = false
  emit('success', formModel.value.id)
}
const rules = ref({
  title: {
    required: true,
    message: '请输入文章标题',
    trigger: 'blur'
  },
  cate_id: {
    required: true,
    message: '请选择文章分类',
    trigger: 'blur'
  },
  cover_img: {
    required: true,
    message: '请选择封面',
    trigger: 'blur'
  },
  content: {
    required: true,
    message: '请输入内容',
    trigger: 'blur'
  }
})
defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="visibeDrawer" :direction="direction" :size="'50%'">
    <template #header>
      <div>{{ info.id ? '编辑文章' : '添加文章' }}</div>
    </template>
    <template #default>
      <el-form
        class="flex"
        style="margin: 0 auto"
        :model="formModel"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item prop="title" label="文章标题" style="width: 100%">
          <el-input
            v-model="formModel.title"
            label="请输入标题"
            placeholader="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item prop="cate_id" label="文章分类" style="width: 100%">
          <channel-select
            v-model="formModel.cate_id"
            style="width: 100%"
          ></channel-select>
        </el-form-item>
        <el-form-item prop="cover_img" label="文章封面">
          <el-upload
            class="avatar-uploader"
            :auto-upload="false"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-change="onSelectFile"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
        <el-form-item prop="content" label="文章内容" style="width: 100%">
          <div class="editor">
            <quill-editor
              ref="editRef"
              v-model:content="formModel.content"
              content-type="html"
              theme="snow"
            ></quill-editor>
          </div>
        </el-form-item>
        <el-form-item style="margin-left: 80px">
          <el-button type="primary" label="发布" @click="onPublish('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="onPublish('草稿')" label="草稿"
            >草稿</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>
<style lang="scss" scoped>
.flex {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
  align-items: flex-start;
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .editor {
    width: 100%;
    :deep(.ql-editor) {
      min-height: 200px;
    }
  }
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
