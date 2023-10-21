<script setup>
// import { ref } from 'vue'
import {
  Promotion,
  User,
  Crop,
  EditPen,
  UserFilled,
  Management,
  CaretBottom,
  SwitchButton
} from '@element-plus/icons-vue'

import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
userStore.getUserInfo()
// const activeIndex2 = ref('1')

// import { ref } from 'vue'
// console.log('111:' + userStore.userInfo.value)
const circleUrl =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm('您确认要进行退出吗', '提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })

    userStore.removeToken()
    userStore.setUserInfo({})
    router.push('/login')
    return
  } else {
    router.push('/user/' + key)
  }
}
</script>
<template>
  <div class="common-layout">
    <el-container class="layout">
      <el-aside width="200px" class="left">
        <!-- <el-row class="tac"> -->
        <div class="el-aside__logo"></div>
        <el-menu
          active-text-color="#ffd04b"
          background-color="rgb(35, 35, 35)"
          class="el-menu-vertical-demo"
          :default-active="$route.path"
          text-color="#fff"
          router
        >
          <el-menu-item index="/article/channel">
            <el-icon><Management /></el-icon>
            <span>文章分类 </span>
          </el-menu-item>

          <el-menu-item index="/article/manage">
            <el-icon><Promotion /></el-icon>
            <span>文章管理</span>
          </el-menu-item>

          <el-sub-menu index="/user">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>个人中心</span>
            </template>
            <el-menu-item index="/user/profile"
              ><el-icon><User /></el-icon>基本资料</el-menu-item
            >
            <el-menu-item index="/user/avatar"
              ><el-icon><Crop /></el-icon>更换头像</el-menu-item
            >
            <el-menu-item index="/user/password"
              ><el-icon><EditPen /></el-icon>重置密码</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
        <!-- </el-row> -->
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="info-name">
            黑马程序员 :
            <span>{{
              userStore.userInfo.nickname || userStore.userInfo.username
            }}</span>
          </div>
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar
                class="avatar"
                :src="userStore.userInfo.user_pic || circleUrl"
              />

              <el-icon class="el-icon--right"><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile"
                  ><el-icon><User /></el-icon>基本资料</el-dropdown-item
                >
                <el-dropdown-item command="avatar"
                  ><el-icon><Crop /></el-icon>更换头像</el-dropdown-item
                >
                <el-dropdown-item command="password"
                  ><el-icon><EditPen /></el-icon>重置密码</el-dropdown-item
                >
                <el-dropdown-item command="logout"
                  ><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-header>
        <el-main class="main"><router-view></router-view></el-main>
        <el-footer class="footer"
          >大事件 ©2023 Created by 黑马程序员</el-footer
        >
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss" scoped>
.layout {
  height: 100vh;
  background-color: rgb(245, 245, 245);
  .left {
    background-color: rgb(35, 35, 35);
    .el-aside__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }
    .el-menu {
      border-right: none;
    }
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    // .dropdown {
    //   outline: none;
    // }
    .info-name {
      color: black;
      span {
        margin-left: 4px;
        font-weight: 800;
      }
    }
    .el-dropdown-link {
      outline: none;
      cursor: pointer;
      color: var(--el-color-info);
      display: flex;
      // justify-content: space-between;
      align-items: center;
      .avatar {
        margin-right: 5px;
      }
    }
  }
  .footer {
    display: flex;
    // background-color: pink;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
