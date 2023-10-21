<script setup>
import PageContainer from '../../components/PageContainer.vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import {
  artGetChannelService,
  artDeleteChannelService
  // artAddChannelService
} from '@/api/article.js'
const rowStyle = {
  height: '73px'
}
const tableHeaderStyle = {
  height: '64px'
}
// const tableData = ref([])
// artGetChannelService()
const channelList = ref([])
const loading = ref(false)
const setArticleList = async () => {
  loading.value = true
  const res = await artGetChannelService()
  // console.log(res.data.data)
  channelList.value = res.data.data
  loading.value = false
}
setArticleList()
const handleDelete = async (id) => {
  await ElMessageBox.confirm('您确认删除本条数据吗', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  console.log(id)
  await artDeleteChannelService(id)
  setArticleList()
}
const dialog = ref(null)

// const form = ref()
// const formData = ref({
//   cate_name: '',
//   cate_alias: ''
// })

// const addChannel = async () => {
//   await artAddChannelService(formData.value)

//   await setArticleList()
//   isShow.value = false
//   ElMessage.success('添加分类成功')
// }

const editChannel = (row) => {
  dialog.value.open(row)
  // console.log(id)
}
const addChannel = () => {
  dialog.value.open()
}
const successEdit = () => {
  setArticleList()
}
</script>
<template>
  <PageContainer :title="'文章分类'">
    <template #extra>
      <el-button class="button" @click="addChannel" type="primary"
        >添加分类</el-button
      >
    </template>

    <el-table
      :data="channelList"
      :row-style="rowStyle"
      :header-row-style="tableHeaderStyle"
      style="width: 100%"
      type="index"
      v-loading="loading"
    >
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="100">
        <template #default="scope" v-if="channelList.length > 0">
          <el-button
            type="primary"
            @click="editChannel(scope.row)"
            plain
            :icon="Edit"
            circle
          />
          <el-button
            type="danger"
            @click="handleDelete(scope.row.id)"
            plain
            :icon="Delete"
            circle
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <ChannelEdit ref="dialog" @onSuccess="successEdit"></ChannelEdit>
  </PageContainer>
</template>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.el-input {
  width: 410px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
