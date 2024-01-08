<template>
  <div class="container">
    <div class="left-panel">
      <!-- 添加下拉框 -->
      <el-select class="data-select" v-model="selectedTemplate" placeholder="请选择" @change="dataSelectChange">
        <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.value">
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
import MainTemplateEditor from '@src/components/editors/TemplateEditor.vue';
import { getParamHistory, insertParamHistory, listParam } from '@src/services/apiService'
import { ElMessage } from 'element-plus';

const options = ref<any[]>([]);

const selectedTemplate = ref("")
const dataList = ref<MappedData[]>([]);
const selectedData = ref<MappedData | null>(null);

const dataSelectChange = async () => {
  await refreshData();
}

const refreshData = async () => {

  var listResponse = await listParam()

  //创建Option
  //label: d.param_name 移除开头的 "TEMPLATE-" 再拼接 d.team_uuid,
  
  options.value = listResponse.map((d: any) => ({
    label: d.param_name.replace("TEMPLATE-", "") + " (" + d.team_uuid + ")",
    value: d.param_name,
    teamUuid: d.team_uuid,
  }));

  // 按名称排序
  options.value.sort((a: any, b: any) => {
    return a.label.localeCompare(b.label)
  })

  // find options 
  const selectedTemplateObj = options.value.find((d: any) => d.label == selectedTemplate.value)
  var dataResponse = await getParamHistory(selectedTemplateObj.value, selectedTemplateObj.teamUuid)

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
  