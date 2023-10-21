<script setup>
// import { ref } from 'vue'
// import { Edit, Delete } from '@element-plus/icons-vue'
// const tableData = ref([
//   // {
//   //   number: 1,
//   //   name: '111',
//   //   nikename: '1111'
//   // }
// ])
// const rowStyle = {
//   height: '73px'
// }
// const tableHeaderStyle = {
//   height: '64px'
// }
defineProps({
  title: {
    requied: true
  }
})
</script>
<template>
  <el-card class="box-card" :fill="true" shadow="never">
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
        <slot name="extra"></slot>
      </div>
    </template>
    <slot></slot>
    <!-- <el-table
      :data="tableData"
      :row-style="rowStyle"
      :header-row-style="tableHeaderStyle"
      style="width: 100%"
    >
      <el-table-column label="序号" width="100">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类名称">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="分类别名">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.nikename }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="" v-if="tableData.length > 1">
          <el-button type="primary" plain :icon="Edit" circle />
          <el-button type="danger" plain :icon="Delete" circle />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table> -->
  </el-card>
</template>
<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  /* width: 100%; */
  min-height: 100%;
  box-sizing: border-box;
  /* height: 100%; */
}
</style>
