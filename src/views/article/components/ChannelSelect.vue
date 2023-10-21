<script setup>
import { ref } from 'vue'
import { artGetChannelService } from '@/api/article.js'
const channelList = ref([{}])
const getChaneelList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
  // console.log(res.data.data)
}
getChaneelList()
defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="item in channelList"
      :label="item.cate_name"
      :value="item.id"
      :key="item.id"
    ></el-option>
  </el-select>
</template>
