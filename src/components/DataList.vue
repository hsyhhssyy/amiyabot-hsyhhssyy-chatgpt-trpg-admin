<template>
  <div class="list-box">
    <div 
      v-for="item in sortedDataList" 
      :key="item.DisplayText"
      :class="{ 'is-selected': item === localCurrentData }"
      @click="selectData(item)"
    >
      {{ item.DisplayText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { MappedData } from '../components/DataList';

const emit = defineEmits();
const props = defineProps<{
  dataList: MappedData[] | null;
  currentData: MappedData | null;
}>();

const localCurrentData = ref<MappedData | null>(null);

// 从大到小排序
const sortedDataList = computed(() => {
  if (props.dataList) {
    const sortedList = [...props.dataList].sort((a, b) => b.DisplayText.localeCompare(a.DisplayText));
    // 更新 localCurrentData 为排序后的第一项
    localCurrentData.value = sortedList[0] || null;
    emit('selectData', localCurrentData.value);
    return sortedList;
  } else {
    localCurrentData.value = null;
    return null;
  }
});

watch(() => props.currentData, (newData) => {
  localCurrentData.value = newData;
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
