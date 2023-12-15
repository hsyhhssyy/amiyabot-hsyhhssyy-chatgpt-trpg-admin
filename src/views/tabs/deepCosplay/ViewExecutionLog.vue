<template>
    <div class="container">
        <div class="left-panel">
            <DataList :dataList="dataList" :currentData="selectedData" @selectData="selectData" />
        </div>

        <!-- 右侧组件 -->
        <div class="right-panel">
            <DeepCosplayEditor :data="selectedData" @executed="executed" />
        </div>
    </div>
</template>
    
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DataList from '@src/components/DataList.vue';
import type { MappedData } from '@src/components/DataList';
import DeepCosplayEditor from '@src/components/editors/DeepCosplayExecutionLogReadonlyEditor.vue';
import { getExecutionLog } from '@src/services/apiService'
import { ElMessage } from 'element-plus';

const dataList = ref<MappedData[]>([]);
const selectedData = ref<MappedData | null>(null);

const refreshData = async () => {
    var dataResponse = await getExecutionLog("deep-cosplay")

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

const executed = async () => {
    console.log("executed")
    await refreshData();
    ElMessage({
        message: '执行完成',
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
    