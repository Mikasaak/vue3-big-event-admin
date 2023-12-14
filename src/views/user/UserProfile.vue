<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { userUpdateInfoService } from '@/api/user'

const userStore = useUserStore()
const { username, nickname, email, id } = userStore.userInfo

const userInfo = ref({ username, nickname, email, id })
const formRef = ref()
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入用户邮箱', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
  ]
}
const onUserUpdate = async () => {
  if (
    userInfo.value.nickname === userStore.userInfo.nickname &&
    userInfo.value.email === userStore.userInfo.email
  ) {
    return
  }
  await formRef.value.validate()
  try {
    await userUpdateInfoService(userInfo.value)
    ElMessage.success('修改成功')
    userStore.getUserInfo()
  } catch (error) {
    ElMessage.error(error.message)
  }
}
</script>

<template>
  <page-container title="基本资料">
    <template #extra>
      <div></div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userInfo"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="登录名称">
            <el-input v-model="userInfo.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickname">
            <el-input v-model="userInfo.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onUserUpdate">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>

<style scoped></style>
