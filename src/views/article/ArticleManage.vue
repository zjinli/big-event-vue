<script setup>
import { ref } from 'vue'
import PageContainer from '../../components/PageContainer.vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { artGetListService } from '@/api/article.js'
import { formatTime } from '@/utils/format.js'
import ArticleEdit from './components/ArticleEdit.vue'
const rowStyle = {
  height: '73px'
}
const headerRowStyle = {
  height: '64px'
}
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
const loading = ref(false)
const articleList = ref([])
const total = ref(0)
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
const articleEditRef = ref(null)
//
const onEditArticel = (row) => {
  articleEditRef.value.open(row)
}
// const onSub = () => {
//   articleEditRef.value.open({})
// }
const onDeleteArticle = (id) => {
  console.log(id)
}

const formRef = ref(null)
const resetFrom = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onSizeChange = (size) => {
  params.value.pageSize = size
  params.value.pagenum = 1
  getArticleList()
}
const onCurrentChange = (pagenum) => {
  params.value.pagenum = pagenum
  getArticleList()
}
const onSuccess = (id) => {
  if (id) {
    getArticleList()
  } else {
    params.value.pagenum = Math.ceil(total.value + 1 / params.value.pagesize)
    getArticleList()
  }
}
</script>
<template>
  <PageContainer :title="'文章管理'">
    <template #extra>
      <el-button class="button" type="primary" @click="onEditArticel({})"
        >发布文章</el-button
      ></template
    >
    <!-- 表单区域 -->
    <el-form inline ref="formRef">
      <el-form-item label="文章分类 : " label-width="82px">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态: ">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="resetFrom">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :row-style="rowStyle"
      :header-row-style="headerRowStyle"
      min-height="100%"
      :data="articleList"
      v-loading="loading"
    >
      <el-table-column prop="title" label="文章标题" width="400">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{
            row.title
          }}</el-link></template
        >
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" />
      <el-table-column prop="pub_date" label="发布时间">
        <template #default="{ row }">{{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column prop="state" label="状态" />
      <el-table-column prop="" label="操作" width="100">
        <!-- 利用作用域插槽row提供id -->
        <template #default="{ row }">
          <el-button
            type="primary"
            @click="onEditArticel(row)"
            plain
            circle
            :icon="Edit"
          ></el-button>
          <el-button
            type="danger"
            @click="onDeleteArticle(row.id)"
            plain
            circle
            :icon="Delete"
          >
          </el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty :image-size="160" description="没有数据"
      /></template>
    </el-table>
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      background
      layout="->,jumper,total, sizes,prev, pager, next "
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px"
    />
    <!-- 表格区域 -->
  </PageContainer>
  <article-edit @success="onSuccess" ref="articleEditRef"></article-edit>
</template>
<style lang="scss">
.el-form {
  justify-content: flex-start;
  width: 100%;
  .el-form-item {
    width: 296px;
  }
}
</style>
