<template>
  <div class="container">
    <!-- 左侧组件 -->
    <div class="left-panel">
      <DataList :dataList="dataList" :currentData="selectedData" @selectData="selectData" />
    </div>
    
    <!-- 右侧组件 -->
    <div class="right-panel">
      <ItemEditor v-if="selectedData" :data="selectedData" @updateData="updateData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataList from '../components/DataList.vue';
import type { MappedData } from '../components/DataList';
import ItemEditor from '../components/ItemEditor.vue';
import { getParamHistory } from '../services/apiService.ts'

const dataList = ref<MappedData[]>();
const selectedData = ref(null);

onMounted(async () => {
  var dataResponse = await getParamHistory('item_info')

  dataList.value = dataResponse.map((d: any): MappedData => ({
    DisplayText: d.create_at,
    Data: d,
  }));
});

const selectData = (data) => {
  selectedData.value = data;
};

const updateData = (newData) => {
  selectedData.value = newData;
};

</script>

<style scoped>
  .container {
    display: flex;
  }

  .left-panel {
    width: 200px;
    padding: 2px;
    background-color: #f3f4f6;
    margin-right: 10px;
  }

  .right-panel {
    flex: 1;
    padding: 20px;
    background-color: #f3f4f6;
  }
</style>
