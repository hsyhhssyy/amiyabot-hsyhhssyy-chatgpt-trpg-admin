<template>
  <ul>
    <li 
      v-for="item in dataList" 
      :key="item.DisplayText"
      :class="{ 'is-selected': item === currentData }"
      @click="selectData(item)"
    >
      {{ item.DisplayText }}
    </li>
  </ul>
</template>

<script setup lang="ts">

const emit = defineEmits();
defineProps<{
  dataList: { DisplayText: string, Data: any }[]
  currentData: any;
}>();

const selectData = (data: { DisplayText: string, Data: any }) => {
  emit('selectData', data);
};
</script>

<style>
  .is-selected {
    background-color: #f0f0f0;
  }
</style>