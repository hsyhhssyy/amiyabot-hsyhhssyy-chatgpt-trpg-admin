<template>
  <div class="list-box">
    <div 
      v-for="item in dataList" 
      :key="item.DisplayText"
      :class="{ 'is-selected': item === currentData }"
      @click="selectData(item)"
    >
      {{ item.DisplayText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type {MappedData} from '../components/DataList';

const emit = defineEmits();
defineProps<{
  dataList: MappedData[]
  currentData: any;
}>();

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