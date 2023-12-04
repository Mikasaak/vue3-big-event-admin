import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref('')
    const userInfo = ref({})
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const getUserInfo = async () => {
      const res = await userGetInfoService()
      userInfo.value = res.data
      console.log(res)
    }

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUserInfo
    }
  },
  { persist: true }
)
