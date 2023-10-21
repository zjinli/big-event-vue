import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoService } from '@/api/user'
// import request from '@/utils/request'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref(null)
    const userInfo = ref({})
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const getUserInfo = async () => {
      const res = await getUserInfoService()
      // console.log(res)
      userInfo.value = res.data.data
    }
    const setUserInfo = (obj) => {
      userInfo.value = obj
    }
    const updateAvatar = (img) => {
      userInfo.value.user_pic = img
    }
    return {
      token,
      userInfo,
      setToken,
      removeToken,
      getUserInfo,
      setUserInfo,
      updateAvatar
    }
  },
  {
    persist: true
  }
)
