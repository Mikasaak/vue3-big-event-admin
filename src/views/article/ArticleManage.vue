<script setup>
import { useUserStore } from '@/stores'
import { ref } from 'vue'
import router from '@/router'
import PageContainer from '@/components/PageContainer.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import {
  articleDeleteArticleService,
  articleGetListService
} from '@/api/article'
import { formatTime } from '@/utils/fomat'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'

const userStore = useUserStore()
if (!userStore.token) {
  router.push('/login')
  console.log('未登录')
}

const defaultParams = {
  pagenum: 1,
  pagesize: 10,
  cate_id: null,
  state: null
}

const params = ref({
  ...defaultParams
})

const resetForm = () => {
  params.value = {
    ...defaultParams
  }
  getArticleList()
}
const data = ref([])
const total = ref(0)
const loading = ref(true)
const getArticleList = async () => {
  loading.value = true
  const res = await articleGetListService(params.value)
  data.value = res.data
  total.value = res.total
  loading.value = false
  console.log(res)
}
getArticleList()

const onCurrentChange = (val) => {
  console.log(val)
  getArticleList()
}
const onSizeChange = (val) => {
  console.log(val)
  params.value.pagesize = val
  params.value.pagenum = 1
  getArticleList()
}
const articleRef = ref()

const onAddArticle = () => {
  console.log('添加文章')
  articleRef.value.open()
}

const onEditArticle = (row) => {
  console.log('编辑文章')
  console.log(row)
  articleRef.value.open(row)
}

const onDeleteArticle = async (row) => {
  console.log('删除文章', row)
  await articleDeleteArticleService(row.id)
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
  getArticleList()
}

const onSuccess = (type) => {
  if (type === 'add') {
    params.value.pagenum = Math.ceil((total.value + 1) / params.value.pagesize)
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理" class="page-container">
    <template #extra>
      <el-button type="primary" @click="onAddArticle"> 发布文章 </el-button>
    </template>

    <el-form inline ref="formRef">
      <el-form-item>
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item>
        <el-select placeholder="发布状态" v-model="params.state">
          <el-option :label="'已发布'" :value="'已发布'" />
          <el-option :label="'草稿'" :value="'草稿'" />
          <el-option :label="'全部'" :value="''" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getArticleList"> 搜索 </el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="data" style="width: 100%" v-loading="loading">
      <el-table-column prop="title" label="文章标题">
        <template #default="{ row }">
          <el-link :underline="false" type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间" width="300">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            type="primary"
            circle
            plain
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            type="danger"
            circle
            plain
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="params.pagenum"
        v-model:page-size="params.pagesize"
        :page-sizes="[2, 3, 5, 10]"
        layout="jumper,total, sizes, prev, pager, next "
        :total="total"
        @current-change="onCurrentChange"
        @size-change="onSizeChange"
        :style="{
          'justify-content': 'end',
          width: '-webkit-fill-available',
          position: 'absolute',
          bottom: '10%'
        }"
      />
    </div>
    <article-edit ref="articleRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style scoped>
.page-container {
  position: relative;
}
</style>
