<script setup>
// import { useRouter, useRoute } from 'vue-router'
// import { useUserStore, useCountStore } from '@/stores'

// const router = useRouter()
// const route = useRoute()
// const userStore = useUserStore()
// const countStore = useCountStore()
// console.log(route, router, userStore, countStore)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped></style>
