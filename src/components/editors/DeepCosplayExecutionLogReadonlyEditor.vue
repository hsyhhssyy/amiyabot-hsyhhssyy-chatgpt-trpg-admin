<template>
    <el-row class="component-container">
        <el-col class="data-table-container" :span="6">
            <el-table :data="tableData" style="width: 100%; height: 100%;">
                <el-table-column property="key" label="替换索引" width="180px"></el-table-column>
                <el-table-column property="value" label="替换值">
                    <template v-slot="slotProps">
                        <div v-html="formatNewLine(slotProps.row.value)"></div>
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
                <el-form-item label="选择模板" class="form-select-item">
                    <el-select v-model="selectedOptionTwo" placeholder="选择模板" class="form-select">
                        <el-option v-for="item in options" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="编辑模板" class="text-area-item">
                    <el-input class="text-input" type="textarea" v-model="textAreaTemplate"></el-input>
                </el-form-item>             
                <el-form-item class="form-button-item">
                    <el-button class="form-button" type="primary">重新执行</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { getParamHistory, insertParamHistory } from '@src/services/apiService'

const props = defineProps<{ data: any }>();
const emit = defineEmits();

const tableData = ref([
    { key: 'Key1', value: 'Value1' },
    { key: 'Key2', value: 'Value2' },
    // ... more data
]);

const textAreaOne = ref('');
const textAreaTwo = ref('');
const textAreaTemplate = ref('');
const selectedOptionTwo = ref();
const options = ref([
    { value: 'amiya-template-v4', label: 'amiya-template-v4' },
]);


const refreshData = async (newData: any) => {
    try {
        const dataJson = JSON.parse(newData.Data.data)
        // remove TEMPLATE
        delete dataJson["TEMPLATE"]
        tableData.value = Object.keys(dataJson).map((key: string) => {
            return { key: key, value: dataJson[key] }
        })
        textAreaOne.value = newData.Data.raw_request
        textAreaTwo.value = newData.Data.raw_response
        
        var template_list = await getParamHistory("TEMPLATE-"+newData.Data.template_name, "deep-cosplay")
        template_list = [...template_list].sort((a, b) => b.create_at.localeCompare(a.create_at));
        options.value = template_list.map((d: any) => {
            return { value: d, label: d.create_at }
        })
        selectedOptionTwo.value = options.value[0].value
        textAreaTemplate.value = selectedOptionTwo.value.param_value

    } catch (error) {
    }
};

refreshData(props.data);

watch(() => props.data, (newData) => {
    refreshData(newData);
});

const formatNewLine = (value: string) => {
    return value.replace(/\n/g, '<br>');
}

const handleExecute = () => {
    try {
        emit('updateParamValue', props.data);
    } catch (error: any) {
        ElMessage.error(error);
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

.form-select-item {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    width: 100%;
}

.form-select {
    width: 100%;
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