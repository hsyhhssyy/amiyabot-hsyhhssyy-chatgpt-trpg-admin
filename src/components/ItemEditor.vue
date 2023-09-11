<template>
  <div>
    <el-card v-for="(item, index) in dataInData" :key="index" class="box-card">
      <el-form :model="item" label-width="60px">
        <el-form-item label="名称：">
          <div style="display: flex; width: 100%;">
            <el-input v-model="item.名称" style="flex: 1;"></el-input>
            <el-button @click="removeItem(index)" type="danger" style="margin-left: 20px;">删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="数量：">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-input-number v-model="item.数量"></el-input-number>
            </el-col>
            <el-col :span="12">
              <el-input v-model="item.单位"></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="情报：">
          <div>
            <el-tag style="margin: 2px;" v-for="(info, infoIndex) in item.情报" :key="infoIndex" closable @close="removeInfo(index, infoIndex)">
              {{ info }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-row :gutter="20">
            <el-col :span="18">
              <el-input v-model="newInfo[index]" @keyup.enter="addInfo(index)"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button @click="addInfo(index)">添加</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
    <el-button @click="addNewItem">添加新项</el-button>
    <el-button type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps<{ data: any }>();
const emit = defineEmits();

const newInfo = ref<string[]>([]);

// 初始化一个可观察的数据对象
const dataInData = ref<any[]>([]);

const refreshData = (newData: any) => {
  try {
    dataInData.value = JSON.parse(newData.Data.param_value);
  } catch (error) {
    ElMessage.error('无效的 JSON 数据');
  }
};

refreshData(props.data);

watch(() => props.data, (newData) => {
  refreshData(newData);
});

const addNewItem = () => {
  dataInData.value.push({ "名称": "", "数量": 0, "单位": "", "情报": [] });
};

const removeItem = (index: number) => {
  dataInData.value.splice(index, 1);
};

const addInfo = (index: number) => {
  if (newInfo.value[index]) {
    dataInData.value[index].情报.push(newInfo.value[index]);
    newInfo.value[index] = '';
  }
};

const removeInfo = (index: number, infoIndex: number) => {
  dataInData.value[index].情报.splice(infoIndex, 1);
};

const handleSave = () => {
  try {
    emit('updateParamValue', JSON.stringify(dataInData.value));
  } catch (error) {
    ElMessage.error('无效的 JSON 数据');
  }
};
</script>

<style>
.box-card {
  margin-bottom: 20px;
}
</style>
