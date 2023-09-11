<template>
  <div class="list-box">
    <div 
      v-for="item in sortedDataList" 
      :key="item.DisplayText"
      :class="{ 'is-selected': item === currentData }"
      @click="selectData(item)"
    >
      {{ item.DisplayText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type {MappedData} from '../components/DataList';

const emit = defineEmits();
const props = defineProps<{
  dataList: MappedData[]|null;
  currentData: MappedData|null;
}>();

// 从大到小排序
const sortedDataList = computed(() => {
  if(props.dataList){
    return [...props.dataList].sort((a, b) => b.DisplayText.localeCompare(a.DisplayText));
  }else{
    return props.dataList
  }
});

const selectData = (data: MappedData) => {
  emit('selectData', data);
};
</script>

<style>
.list-box{
  padding: 10px;
}
.is-selected {
  background-color: #8a8a8ad3;
  text-align: center;
}
</style>
