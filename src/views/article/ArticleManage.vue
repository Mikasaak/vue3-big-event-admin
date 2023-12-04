<script setup>
import { useUserStore } from '@/stores'
import router from '@/router'
import PageContainer from '@/components/PageContainer.vue'

const userStore = useUserStore()
if (!userStore.token) {
  router.push('/login')
  console.log('未登录')
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary"> 添加分类 </el-button>
    </template>

    主体部分
  </page-container>
</template>

<style scoped></style>
