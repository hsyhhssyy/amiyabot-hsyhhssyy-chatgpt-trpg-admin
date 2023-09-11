<template>
  <div>
    <el-card v-for="(item, index) in envData" :key="index" class="box-card">
      <el-form label-width="60px">
        <el-form-item label="条目：">
          <div style="display: flex; width: 100%;">
            <el-input :value="item" @input="updateItem(index, $event)" style="flex: 1;"></el-input>
            <el-button @click="removeItem(index)" type="danger" style="margin-left: 20px;">删除</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
    <el-form label-width="60px">
      <el-form-item label="添加：">
        <el-row :gutter="20">
          <el-col :span="18">
            <el-input v-model="newItem" @keyup.enter="addItem"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button @click="addItem">添加</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="handleSave">保存</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps<{ data: any }>();
const emit = defineEmits();

const newItem = ref<string>('');

const envData = ref<string[]>([]);

const refreshData = (newData: any) => {
  try {
    envData.value = JSON.parse(newData.Data.param_value);
  } catch (error) {
    ElMessage.error('无效的 JSON 数据');
  }
};

refreshData(props.data);

watch(() => props.data, (newData) => {
  refreshData(newData);
});

const addItem = () => {
  if (newItem.value) {
    envData.value.push(newItem.value);
    newItem.value = '';
  }
};

const removeItem = (index: number) => {
  envData.value.splice(index, 1);
};

const updateItem = (index: number, event: Event) => {
  const inputElement = event.target as HTMLInputElement;
  envData.value[index] = inputElement.value;
};

const handleSave = () => {
  try {
    emit('updateParamValue', JSON.stringify(envData.value));
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
