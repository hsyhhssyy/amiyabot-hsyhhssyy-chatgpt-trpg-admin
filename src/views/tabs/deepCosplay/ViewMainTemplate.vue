<template>
  <div class="container">
    <div class="left-panel">
      <!-- 添加下拉框 -->
      <el-select class="data-select" v-model="selectedTemplate" placeholder="请选择" @change="dataSelectChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>

      <DataList :dataList="dataList" :currentData="selectedData" @selectData="selectData" />
    </div>

    <!-- 右侧组件 -->
    <div class="right-panel">
      <MainTemplateEditor :data="selectedData" @updateParamValue="updateParamValue" />
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataList from '@src/components/DataList.vue';
import type { MappedData } from '@src/components/DataList';
import MainTemplateEditor from '@src/components/editors/DeepCosplayMainTemplateEditor.vue';
import { getParamHistory, insertParamHistory } from '@src/services/apiService'
import { ElMessage } from 'element-plus';

const options = [
  {
    value: 'TEMPLATE-amiya-template-v4',
    label: 'amiya-template-v4',
  },
  {
    value: 'TEMPLATE-amiya-template-v5',
    label: 'amiya-template-v5',
  },
  {
    value: 'TEMPLATE-topic-template-v1',
    label: 'topic-template-v1',
  }
];
const selectedTemplate = ref("")
const dataList = ref<MappedData[]>([]);
const selectedData = ref<MappedData | null>(null);

const dataSelectChange = async () => {
  await refreshData();
}

const refreshData = async () => {
  var dataResponse = await getParamHistory(selectedTemplate.value, "deep-cosplay")

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
  await insertParamHistory(selectedTemplate.value, newValue, "deep-cosplay")
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
  flex-direction: row;
  height: 90%;
}

.left-panel {
  width: 200px;
  padding: 2px;
  background-color: #f3f4f6;
  margin-right: 10px;
}

.data-select {
  margin-bottom: 10px;
}

.right-panel {
  flex: 1;
  padding: 20px;
  background-color: #f3f4f6;
}
</style>
  