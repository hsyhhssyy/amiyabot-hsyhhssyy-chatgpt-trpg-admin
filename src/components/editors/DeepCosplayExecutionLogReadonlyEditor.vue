<template>
    <el-row class="component-container">
        <el-col class="data-table-container" :span="6">
            <el-table :data="tableData" style="width: 100%; height: 100%;">
                <el-table-column property="key" label="替换索引" width="180px"></el-table-column>
                <el-table-column property="value" label="替换值">
                    <template v-slot="slotProps">
                        <div v-for="(item, index) in preprocessData(slotProps.row.value)" :key="index" class="ellipsis">
                        {{ item }}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="9" class="text-area-container">
            <el-form label-position="top" class="text-area-form">
                <el-form-item label="原始Prompt" class="text-area-item">
                    <el-input class="text-input" type="textarea" v-model="textAreaOne" readonly></el-input>
                </el-form-item>
                <el-form-item label="返回结果" class="text-area-item">
                    <el-input class="text-input" type="textarea" v-model="textAreaTwo" readonly></el-input>
                </el-form-item>

            </el-form>
        </el-col>
        <el-col class="data-table-container" :span="9">
            <el-form label-position="top" class="text-area-form">
                <el-form-item label="编辑模板" class="text-area-item">
                    <el-input class="text-input" type="textarea" v-model="textAreaTemplate"></el-input>
                </el-form-item>             
                <el-form-item class="form-button-item">
                    <el-button class="form-button" :type="isExecuting?'secondary':'primary'" @click="handleExecute" :disabled="isExecuting">重新执行</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { insertExecutionLog } from '@src/services/apiService'
import emitter from '@src/eventBus/mitt';
import { ElMessage } from 'element-plus';

const props = defineProps<{ data: any }>();

const tableData = ref([
    { key: 'Key1', value: 'Value1' },
    { key: 'Key2', value: 'Value2' },
    // ... more data
]);

const textAreaOne = ref('');
const textAreaTwo = ref('');
const textAreaTemplate = ref('');
const isExecuting= ref(false);

const refreshData = async (newData: any) => {
    try {
        const dataJson = JSON.parse(newData.Data.data)

        tableData.value = Object.keys(dataJson).map((key: string) => {
            return { key: key, value: dataJson[key] }
        })
        textAreaOne.value = newData.Data.raw_request
        textAreaTwo.value = newData.Data.raw_response
        
        textAreaTemplate.value = newData.Data.template_value

    } catch (error) {
    }
};

refreshData(props.data);

watch(() => props.data, (newData) => {
    refreshData(newData);
});

const preprocessData = (value: string) => {
    const maxLines = 10;
    const lines = value.split(/\n/);
    if (lines.length > maxLines) {
        return lines.slice(0, maxLines).concat('...');
    }
    return lines;
}

const handleExecute = async () => {
    try {
        isExecuting.value = true

        const dataJson = props.data.Data.data
        const template = textAreaTemplate.value
        
        console.log("handleExecute")
        await insertExecutionLog(dataJson, props.data.Data.template_name, template, props.data.Data.model,"deep-cosplay")

        emitter.emit('execution-log-updated');
        ElMessage.success("执行成功")
    } catch (error: any) {
        console.log(error)
    }finally{
        isExecuting.value = false
        console.log("handleExecute finally")
    }
};

</script>
  
<style scoped>
.component-container {
    height: 100%;
}

.data-table-container {
    height: 100%;
}

.text-area-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.text-area-form {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    height: 100%;
}

.text-area-item {
    flex: 1;
    /* This makes each text area grow equally */
    display: flex;
    flex-direction: column;
}

.text-input {
    height: 100%;
    margin-bottom: 10px;
}

.form-button-item {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
}

.form-button {
    width: 100%;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>

<style>
.el-textarea__inner {
    height: 100%;
    /* 使文本域占满父元素的高度 */
    resize: none;
    /* 如果您不希望用户能够调整大小 */
}
</style>