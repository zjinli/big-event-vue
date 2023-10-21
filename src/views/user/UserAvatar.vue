<script setup>
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { updateAvatarService } from '@/api/user.js'
// import { ElMessage } from 'element-plus'
// import axios from 'axios'
// import { baseURL } from '@/utils/request.js'
const userStore = useUserStore()
const imageUrl = ref(userStore.userInfo.user_pic)
const avatar = ref(null)
const uploadRef = ref(null)
const getBase64Image = (src) => {
  return new Promise((resolve) => {
    let xhr = new XMLHttpRequest()
    xhr.open('get', src, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (this.status == 200) {
        let blob = this.response
        let oFileReader = new FileReader()
        oFileReader.onloadend = function (e) {
          const base64 = e.target.result
          resolve(base64)
        }
        oFileReader.readAsDataURL(blob)
      }
    }
    xhr.send()
  })
}
const onSelect = async (uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw)
  // console.log('www' + imageUrl.value)
  avatar.value = await getBase64Image(imageUrl.value)
  // console.log(avatar.value)
}

const onUpdateAvatar = async () => {
  if (!avatar.value) {
    ElMessage.error('头像不能为空')
    return
  }
  // const file = imageUrlToFile(imageUrl, userStore.userInfo.avatar)
  // console.log(avatar.value)
  const res = await updateAvatarService(avatar.value)
  ElMessage.success(res.data.message)
  userStore.updateAvatar(avatar.value)
}
</script>

<template>
  <page-container :title="'更换头像'">
    <template #default>
      <el-upload
        ref="uploadRef"
        class="avatar-uploader"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="onSelect"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>

        <div class="btnStyle">
          <el-button type="primary" size="large">
            <el-icon style="margin-right: 8px"><Plus /></el-icon
            >选择图片</el-button
          >
        </div>
        <template #tip>
          <el-button
            class="btnSubStyle"
            type="success"
            size="large"
            @click="onUpdateAvatar"
          >
            <el-icon style="margin-right: 8px"><Upload /></el-icon
            >上传头像</el-button
          ></template
        >
      </el-upload>
    </template>
  </page-container>
</template>
<style scoped>
.avatar-uploader {
  position: relative;
}
.avatar-uploader .avatar {
  width: 278px;
  height: 278px;
  display: block;
}
.btnStyle {
  position: absolute;
  left: 0;
  top: 303px;
}
.btnSubStyle {
  position: absolute;
  left: 130px;
  top: 303px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  /* overflow: hidden; */
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 278px;
  text-align: center;
}
</style>
