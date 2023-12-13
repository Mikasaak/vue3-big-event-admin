<script setup>
import { ref } from 'vue'
import { articleGetChannelListService } from '@/api/article'
const channelList = ref([])
import { defineModel } from 'vue'
const getChannelList = async () => {
  const res = await articleGetChannelListService()
  channelList.value = res.data
  console.log(channelList.value)
}
getChannelList()

const selectID = defineModel()

const handleChange = (val) => {
  console.log(val)
}
</script>

<template>
  <el-select v-model="selectID" @click="handleChange($event)">
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>

<style scoped></style>
