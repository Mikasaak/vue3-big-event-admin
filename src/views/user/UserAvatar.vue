<script setup>
import { ref, nextTick } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import PageContainer from '@/components/PageContainer.vue'
import { userUpdateAvatarService } from '@/api/user'

const userStore = useUserStore()
let imgBase64 = ''
const imgUrl = ref('')
imgUrl.value = userStore.userInfo.user_pic
const onUploadFile = async (file) => {
  const imgFile = file.raw
  imgBase64 = await fileToBase64(imgFile)
  console.log(imgBase64)
  imgUrl.value = imgBase64
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('未提供文件')
      return
    }

    // 创建 FileReader 对象
    const reader = new FileReader()

    // 监听 FileReader 加载完成事件
    reader.onload = function (e) {
      // 在 onload 事件中获取 Base64 格式的图片数据
      const base64Data = e.target.result

      // 使用 resolve 将 Base64 数据传递给 Promise 的 then 方法
      resolve(base64Data)
    }

    // 监听 FileReader 错误事件
    reader.onerror = function (error) {
      // 使用 reject 将错误信息传递给 Promise 的 catch 方法
      reject(error)
    }

    // 读取文件为 DataURL，即 Base64 格式
    reader.readAsDataURL(file)
  })
}
const uploadRef = ref()
const onUpdateAvatar = async () => {
  try {
    await userUpdateAvatarService(imgBase64)
    ElMessage.success('修改成功')
    await userStore.getUserInfo()
  } catch (error) {
    ElMessage.error(error.message)
  }
}
</script>

<template>
  <page-container title="更换头像">
    <template #extra>
      <div></div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-upload
          ref="uploadRef"
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <img v-else src="@/assets/avatar.jpg" width="278" />
        </el-upload>
        <br />
        <el-button
          type="primary"
          :icon="Plus"
          size="large"
          @click="uploadRef.$el.querySelector('input').click()"
        >
          选择图片
        </el-button>
        <el-button
          type="success"
          :icon="Upload"
          size="large"
          @click="onUpdateAvatar"
        >
          上传头像
        </el-button>
      </el-col>
    </el-row>
  </page-container>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
