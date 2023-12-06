<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import {
  articleDeleteChannelService,
  articleGetChannelListService
} from '@/api/article'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'

const loading = ref(true)
const channelList = ref([])
const getChannelList = async () => {
  const res = await articleGetChannelListService()
  loading.value = false
  channelList.value = res.data
  console.log(res)
}
getChannelList()
const dialog = ref()
const onEditChannel = (row) => {
  dialog.value.open(row)
  console.log(row)
}

const onDelChannel = async (row) => {
  await ElMessageBox.confirm('此操作将永久删除该分类, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await articleDeleteChannelService(row.id)
  ElMessage({
    message: '删除成功',
    type: 'success'
  })
  getChannelList()
}

const onAddChannel = () => {
  dialog.value.open()
}
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <channel-edit ref="dialog" @success="onSuccess"></channel-edit>

  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" width="100" type="index"> </el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </page-container>
</template>

<style scoped></style>
