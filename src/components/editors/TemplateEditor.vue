<template>
    <div class="template-edit-container">
        <!-- 使用一个文本编辑器展示dataInData的值-->
        <div class="text-area-item">
            <el-input class="template-input" v-model="dataInData" type="textarea"  resize="none" />
        </div>
        <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';

const props = defineProps<{ data: any }>();
const emit = defineEmits();

// 初始化一个可观察的数据对象
const dataInData = ref<string>("");

const refreshData = (newData: any) => {
    try {
        dataInData.value = newData.Data.param_value;
    } catch (error) {
        dataInData.value = "";
    }
};

refreshData(props.data);

watch(() => props.data, (newData) => {
    refreshData(newData);
});

const handleSave = () => {
    try {
        emit('updateParamValue', dataInData.value);
    } catch (error: any) {
        ElMessage.error(error);
    }
};
</script>
  
<style scoped>
.template-edit-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.text-area-item {
  flex: 1;
    display: flex;
    flex-direction: column;
}

.template-input {
  height: 100%;
  margin-bottom: 10px;
}

</style>

<style>

.el-textarea__inner {
  height: 100%; /* 使文本域占满父元素的高度 */
  resize: none; /* 如果您不希望用户能够调整大小 */
}

</style>