<template>
  <div class="container">
    <!-- 左侧组件 -->
    <div class="left-panel">
      <DataList :dataList="dataList" :currentData="selectedData" @selectData="selectData" />
    </div>

    <!-- 右侧组件 -->
    <div class="right-panel">
      <EnvEditor v-if="selectedData" :data="selectedData" @updateParamValue="updateParamValue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataList from '../../components/DataList.vue';
import type { MappedData } from '../../components/DataList';
import EnvEditor from '../../components/editors/EnvEditor.vue';
import { getParamHistory,insertParamHistory } from '../../services/apiService'
import { ElMessage } from 'element-plus';

const dataList = ref<MappedData[]>([]);
const selectedData = ref<MappedData | null>(null);

const refreshData = async () => {
  var dataResponse = await getParamHistory('env_info')

  dataList.value = dataResponse.map((d: any): MappedData => ({
    DisplayText: d.create_at,
    Data: d,
  }));


}

onMounted(async () => {
  await refreshData();
});

const selectData = (data: any) => {
  selectedData.value = data;
};

const updateParamValue = async (newValue: string) => {
  await insertParamHistory("env_info",newValue)
  await refreshData();
  ElMessage({
    message: '保存完成',
    type: 'success',
  })
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
