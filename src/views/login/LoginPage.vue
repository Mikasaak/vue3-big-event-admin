<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, watch } from 'vue'
import { ref } from 'vue'
import { userLoginService, userRegisterService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
//form 表单数据
const formData = reactive({
  isRegister: false,
  username: '',
  password: '',
  repassword: ''
})
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    { pattern: /^\S{6,15}$/, message: '密码格式不正确', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value === formData.password) {
          callback()
        } else {
          callback(new Error('两次输入密码不一致'))
        }
      },
      trigger: ['blur', 'change']
    }
  ]
}
const form = ref(null)
const userStore = useUserStore()

const router = useRouter()

const handleLogin = async () => {
  console.log('登录')
  await form.value.validate()
  console.log('验证成功')
  const res = await userLoginService(formData)
  ElMessage({
    message: '登录成功',
    type: 'success'
  })
  console.log(res)
  userStore.setToken(res.token)
  router.push('/')
}

const handleRegister = async () => {
  console.log('注册')
  await form.value.validate()
  console.log('验证成功')
  await userRegisterService(formData)
  ElMessage({
    message: '注册成功',
    type: 'success'
  })
}

const handleReset = () => {
  console.log('重置')
  form.value.resetFields()
}

watch(
  () => formData.isRegister,
  () => {
    handleReset()
  }
)
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!--      注册-->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="formData"
        :rules="rules"
        v-if="formData.isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formData.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formData.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="handleRegister"
          >
            注册
          </el-button>

          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="handleReset"
          >
            重置
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            @click="formData.isRegister = false"
          >
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!--      登录-->
      <el-form
        ref="form"
        size="large"
        autocomplete="off"
        :model="formData"
        :rules="rules"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            :prefix-icon="User"
            placeholder="请输入用户名"
            v-model="formData.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formData.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="button"
            type="primary"
            auto-insert-space
            @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link
            type="info"
            :underline="false"
            @click="formData.isRegister = true"
          >
            去注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
