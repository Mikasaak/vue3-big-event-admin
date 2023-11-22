<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
const router = useRouter()
const route = useRoute() //放在setup里面才能拿到route
const toHome = () => {
  router.push({ path: 'home' })
  console.log(route)
}
const userStore = useUserStore()
const { setToken, removeToken } = userStore
</script>

<template>
  <div>App</div>
  <el-button @click="$router.push('list')">to list</el-button>
  <el-button @click="toHome">to home</el-button>
  <h3>{{ userStore.token }}</h3>
  <button @click="setToken('ssssasadsdaadasdasd')">set Token</button>
  <button @click="removeToken">remove Token</button>
  <router-view></router-view>
</template>

<style scoped></style>
