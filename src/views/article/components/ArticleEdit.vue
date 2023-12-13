<script setup>
import { ref, defineEmits } from 'vue'
import { defineExpose } from 'vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { QuillEditor } from '@vueup/vue-quill'
import {
  articleAddArticleService,
  articleGetArticleDetailService
} from '@/api/article'
import { baseURL } from '@/utils/request'
const isVisible = ref(false)
const emit = defineEmits(['success'])
const defaultForm = {
  id: '',
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}

const isEdit = ref(false)

const formModel = ref({
  ...defaultForm
})

const myQuillEditor = ref()

const open = async (row) => {
  console.log('row', row)
  isVisible.value = true
  isEdit.value = false
  if (row !== undefined && row.id !== undefined) {
    const { data } = await articleGetArticleDetailService(row.id)
    formModel.value = {
      ...data
    }
    imgUrl.value = baseURL + formModel.value.cover_img.substring(1) // 去掉第一个斜杠
    isEdit.value = true
    console.log('编辑')
  } else {
    formModel.value = {
      ...defaultForm
    }
    imgUrl.value = ''
    myQuillEditor.value.setContents('')
    isEdit.value = false
    console.log('发布')
  }
}

const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  console.log(uploadFile)
  formModel.value.cover_img = uploadFile.raw
}

const onPublish = async (state) => {
  console.log(formModel.value)
  formModel.value.state = state
  const formData = new FormData()
  Object.keys(formModel.value).forEach((key) => {
    formData.append(key, formModel.value[key])
  })
  await articleAddArticleService(formData)
  ElMessage({
    message: '发布成功',
    type: 'success'
  })
  isVisible.value = false
  emit('success', 'add')
}

defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="isVisible" :size="'50%'">
    <template #header>
      <h3>{{ isEdit ? '编辑文章' : '发布文章' }}</h3>
    </template>
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select
          v-model="formModel.cate_id"
          style="width: 100%"
        ></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <div class="editor">
            <quill-editor
              ref="myQuillEditor"
              theme="snow"
              v-model:content="formModel.content"
              contentType="html"
              :style="{
                'min-height': '200px'
              }"
            >
            </quill-editor>
          </div>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onPublish('已发布')">发布</el-button>
        <el-button type="info" @click="onPublish('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);

      :hover {
        border-color: var(--el-color-primary);
      }
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }

  .editor {
    width: 100%;

    :deep(.ql-editor) {
      min-height: 200px;
    }
  }
}
</style>
